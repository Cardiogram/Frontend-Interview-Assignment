import React from 'react';
import _ from 'underscore'
import './chart.css';
import Cardiogram from '../../models/cardiogram';
import * as d3 from 'd3';
import Chart from './chart';
import BaseLens from './base-lens';
import SleepLens from './sleep-lens';
import RestingHeartRateLens from './resting-heart-rate-lens';
import moment from 'moment';

export function colorForData(d) {
  return colorForValue(d.value);
}

export function colorForValue(value) {
  if (value > 100) {
    return '#ff543b';
  }
  if (value > 60) {
    return '#f58f29';
  }
  return '#00C0EF';
}

// x_to_density
// [t0, t1]: pixels per 5 minutes
// [t1, t2]: pixels per 5 seconds
// 

const ONE_HOUR_MS = 10 * 60 * 1000;

export default class LensChart extends React.Component {
  static propTypes() {
    return {
      isActive: React.PropTypes.bool,
      cardiogram: React.PropTypes.instanceOf(Cardiogram).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.svgWidthPx = 500;
    this.svgHeightPx = 200;
    this.axisHeightPx = 20;
    this.chartHeightPx = this.svgHeightPx - this.axisHeightPx;
    this.minTimestamp = _.min(_.pluck(this.props.cardiogram.data, 'start'));
    this.maxTimestamp = _.max(_.pluck(this.props.cardiogram.data, 'start'));

    this.lenses = [
      new BaseLens(props.cardiogram),
      new SleepLens(props.cardiogram),
      new RestingHeartRateLens(props.cardiogram)
    ];
    this.state = {
      curLens: 0
    }
  }

  componentDidMount() {
    //if (this.container) {
    //  this.chart.addEvents();
    //}
  }

  timestampToX(timestamp) {
    return this.svgWidthPx * this.lenses[this.state.curLens].timestampToX(timestamp);
  }

  heartRateToY(heartRate) {
    const fraction = this.lenses[this.state.curLens].heartRateToY(heartRate);
    return this.chartHeightPx * fraction;
  }

  heartRateToColor(heartRate) {
    return colorForValue(heartRate);
  }

  timestampToOpacity(timestamp) {
    return this.lenses[this.state.curLens].timestampToOpacity(timestamp);
  }

  switchToPrevLens() {
    this.setState({curLens: Math.max(0, this.state.curLens - 1)})
  }

  switchToNextLens() {
    this.setState({curLens: Math.min(this.lenses.length - 1, this.state.curLens + 1)})
  }  

  renderAxes() {
    return <g>
      {
        _.map(_.range(this.minTimestamp, this.maxTimestamp, ONE_HOUR_MS), (t) => {
          const x = this.timestampToX(t);
          const transform = 'translate(' + Math.round(x) + ', ' + this.svgHeightPx + ')';
          return <g className='lens-chart-transition' x={x} transform={transform}>
            <rect key={'axis-tick-' + t} y={10} height={4} width={1} x={0} fill={'#333'}/>
            <text key={'axis-label-' + t} x={0} y={0} className='axis' fill="#777" >
              {moment(t).format('h:mm')}
            </text>
          </g>;
        })
      }
    </g>;
  }

  render() {
    return (
      <div
        ref={(c) => (this.container = c)}
        className="chart"
      >

        <svg height={this.svgHeightPx} width={this.svgWidthPx}>
          {
            _.map(this.props.cardiogram.data, (b) => {
              const height = this.heartRateToY(b.value);
              return <rect
                  className='graph-heart-rate-rect lens-chart-transition'
                  key={b.start}
                  x={this.timestampToX(b.start)}
                  y={this.svgHeightPx - height - this.axisHeightPx}
                  opacity={this.timestampToOpacity(b.start)}
                  width={"1px"}
                  height={height}
                  fill={this.heartRateToColor(b.value)} />;
            })
          }
          {this.renderAxes()}
        </svg>
        <div>
          <div style={{float: 'left'}}>
            <a className='button' href='#' onClick={this.switchToPrevLens.bind(this)}>Prev</a>
          </div>
          <div style={{float: 'left', width: '80%'}} className='center'>
            {this.state.curLens + 1} / {this.lenses.length}
          </div>
          <div style={{float: 'left'}}>
            <a className='button' href='#' onClick={this.switchToNextLens.bind(this)}>Next</a>
          </div>
        </div>        
      </div>
    );
  }
}

import React from 'react';
import _ from 'underscore'
import './chart.css';
import Cardiogram from '../../models/cardiogram';

const REFRESH_INTERVAL_MS = 30 * 1000;  // refresh every 30 seconds

export default class BasicChart extends React.Component {
  static propTypes() {
    return {
      cardiogram: React.PropTypes.instanceOf(Cardiogram).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.svgWidthPx = 300;
    this.svgHeightPx = 200;
    this.minTimestamp = _.min(_.pluck(this.props.cardiogram.data, 'start'));
    this.maxTimestamp = _.max(_.pluck(this.props.cardiogram.data, 'start'));
  }

  componentDidMount() {
    setInterval(this.refreshCardiogramData, REFRESH_INTERVAL_MS);
  }

  timestampToX(timestamp) {
    return this.svgWidthPx * (timestamp - this.minTimestamp) / (this.maxTimestamp - this.minTimestamp);
  }

  heartRateToY(heartRate) {
    const maxHeartRate = 200;
    const minHeartRate = 40;
    const fraction = (heartRate - minHeartRate) / (maxHeartRate - minHeartRate);
    return this.svgHeightPx * fraction;
  }

  refreshCardiogramData(event) {
    console.log('svgWidthPx=' + this.svgWidthPx);
    console.log(event);
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
              const y = this.heartRateToY(b.value);
              return <rect
                  className='graph-heart-rate-rect lens-chart-transition'
                  key={b.start}
                  x={this.timestampToX(b.start)}
                  y={this.svgHeightPx - y}
                  width={'1px'}
                  height={y}
                  fill={'#ff0000'} />;
            })
          }
        </svg>
      </div>
    );
  }
}

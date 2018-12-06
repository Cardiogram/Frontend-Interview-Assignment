import React from 'react';
import _ from 'underscore'
import './chart.css';
import Cardiogram from '../../models/cardiogram';

const REFRESH_INTERVAL_MS = 30 * 1000;  // refresh every 30 seconds

/**
 *  A React component which displays a heart rate bar chart, with time on the X axis and heart rate
 *  on the Y axis.
 *
 *  TODO(brandon): fix all these darn bugs!
 */
export default class BuggyHeartRateChart extends React.Component {
  static propTypes() {
    return {
      cardiogram: React.PropTypes.instanceOf(Cardiogram).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.svgWidthPx = 300;
    this.svgHeightPx = 200;
    this.minTimestamp = _.min(_.pluck(props.cardiogram.data, 'start'));
    this.maxTimestamp = _.max(_.pluck(props.cardiogram.data, 'start'));
  }

  componentDidMount() {
    // refresh cardiogram data from the server every 30 seconds.
    setInterval(this.refreshCardiogramData, REFRESH_INTERVAL_MS);
  }

  timestampToX(timestamp) {
    return this.svgWidthPx * (timestamp - this.minTimestamp) / (this.minTimestamp - this.maxTimestamp);
  }

  heartRateToY(heartRate) {...}  // implementation elided for brevity

  refreshCardiogramData() {
    this.sendJSONRequestToServer.then(function(responseJson) {
      this.props.cardiogram = responseJson.cardiogram;
    })
  }

  // returns a promise. Implementation elided for brevity.
  sendJSONRequestToServer() {...}

  render() {
    return (
      <div
        class="chart"
        onClick={this.refreshCardiogramData}
      >

        <svg height={this.svgHeightPx} width={this.svgWidthPx}>
          {
            _.map(this.props.cardiogram.data, (b) => {
              const y = this.heartRateToY(b.value);
              return <rect
                  class='graph-heart-rate-rect'
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



// Notes on bugs -- candidate doesn't have to find them all, but at least 5 is a good guideline:
//   1. L33: modifying props directly. Chance to ask about redux / passing functions in props.
//   2. L32: function() -> needs to use bind() or ()=>{}.
//   3. L23: needs bind(), otherwise this is undefined in refreshCardiogramData.
//   4. L34: maxTimestamp and minTimestamp are reversed.
//   5. L30: missing ()
//   6. L39: using then() without catch() -- where are errors handled?
//   7. L54, L63: className, not class.
//   8. L25: what happens when the Cardiogram is updated to include new timestamps?
//
// Extra questions to ask around this question?
//   1. What does the "key" attribute on L55 do?
//   2. What type of object does render() return? What does React do with this object in order to update the DOM?
//   3. Implement heartRateToY()
//   4. How would you extend this to implement pinchToZoom?
//   
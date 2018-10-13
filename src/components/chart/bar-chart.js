import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './chart.css';
import Cardiogram from '../../models/cardiogram';
import Chart from './chart';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.chart = new Chart({
      element: null,
      margin: {
        top: 30,
        bot: 20,
        left: 30,
        right: 10,
      },
      width: null,
      height: null,
    });
  }

  componentDidMount() {
    const { container, chart } = this;
    const { cardiogram } = this.props;
    if (container) {
      chart.initiate(container).setupChart(cardiogram);
      this.barList = this.renderChart();
      this.transitionChart(true);
    }
  }

  transitionChart(transitionIn) {
    const { scale, height } = this.chart;
    const { barList } = this;
    const t = d3
      .transition()
      .ease(d3.easeQuadInOut)
      .delay(100)
      .duration(600);

    if (transitionIn) {
      barList
        .transition(t)
        .attr('y', (d) => scale.yScale(d.value))
        .attr('height', (d) => Math.max(0, height - scale.yScale(d.value)));
    } else {
      barList
        .transition(t)
        .attr('y', height)
        .attr('height', 0);
    }
  }

  renderChart() {
    const { svg, scale, width, height } = this.chart;
    const { cardiogram } = this.props;
    const bars = svg.selectAll('bars').data(cardiogram.data);
    const bar = bars.enter();

    return bar
      .append('rect')
      .attr('x', (d) => scale.xScale(d.start))
      .attr('y', height)
      .attr('height', 0)
      .attr('width', width / cardiogram.data.length)
      .attr('class', (d) => {
        if (d.value > 100) {
          return 'bar red';
        }
        if (d.value > 60) {
          return 'bar orange';
        }
        return 'bar blue';
      });
  }

  render() {
    return <div ref={(c) => (this.container = c)} className="chart" />;
  }
}

BarChart.propTypes = {
  cardiogram: PropTypes.instanceOf(Cardiogram).isRequired,
};

export default BarChart;

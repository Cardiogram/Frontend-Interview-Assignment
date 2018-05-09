import React from 'react';
import _ from 'underscore'
import './chart.css';
import Cardiogram from '../../models/cardiogram';
import Chart from './chart';

export default class BaseLen {
  constructor(cardiogram) {
    this.minTimestamp = _.min(_.pluck(cardiogram.data, 'start'));
    this.maxTimestamp = _.max(_.pluck(cardiogram.data, 'start'));
  }

  componentDidMount() {
    //if (this.container) {
    //  this.chart.addEvents();
    //}
  }

  timestampToX(timestamp) {
    return 1.0 * (timestamp - this.minTimestamp) / (this.maxTimestamp - this.minTimestamp);
  }

  heartRateToY(heartRate) {
    const maxHeartRate = 200;
    const minHeartRate = 40;
    return (heartRate - minHeartRate) / (maxHeartRate - minHeartRate);
  }

  timestampToOpacity(timestamp, heartRate) {
    return 1.0;
  }

  heartRateToColor(heartRate) {
    return '#f00';
  }

  title() {
    return "Heart rate on Monday";
  }

  renderOverlaySvg() {
    return null;
  }

  bgColor() {
    return '#fff';
  }
}

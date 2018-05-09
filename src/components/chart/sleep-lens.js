import Cardiogram from '../../models/cardiogram';
import BaseLens from './base-lens';

export default class SleepLens extends BaseLens {
  constructor(cardiogram) {
    super(cardiogram);
  }

  timestampToX(timestamp) {
    const fraction = (timestamp - this.minTimestamp) / (this.maxTimestamp - this.minTimestamp);
    if (fraction < 0.25) {
      return fraction / 0.25 * 0.90;
    } else {
      return 0.90 + 0.10 * fraction;
    }
  }

  timestampToOpacity(timestamp) {
    const fraction = (timestamp - this.minTimestamp) / (this.maxTimestamp - this.minTimestamp);
    return (fraction < 0.25) ? 1.0 : 0.05;
  }

  heartRateToColor(heartRate) {
    return '#f00';
  }

  title() {
    return "[Sleep lens]";
  }

  renderOverlaySvg() {
    return null;
  }

  bgColor() {
    return '#00f';
  }
}

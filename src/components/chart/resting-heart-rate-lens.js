import Cardiogram from '../../models/cardiogram';
import BaseLens from './base-lens';

export default class RestingHeartRateLens extends BaseLens {
  constructor(cardiogram) {
    super(cardiogram);
  }

  timestampToX(timestamp) {
    const fraction = (timestamp - this.minTimestamp) / (this.maxTimestamp - this.minTimestamp);
    if (fraction > 0.20 && fraction < 0.40) {
      return 0.10 + 0.80 / 0.20 * (fraction - 0.20);
    } else if (fraction < 0.20) {
      return 0.10 / 0.20 * fraction;
    } else if (fraction > 0.40) {
      return 0.90 + 0.10 * fraction / 0.60;
    }
  }

  timestampToOpacity(timestamp) {
    const fraction = (timestamp - this.minTimestamp) / (this.maxTimestamp - this.minTimestamp);
    return (fraction < 0.20) ? 0.05 : (fraction > 0.4 ? 0.05 : 1.0);
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

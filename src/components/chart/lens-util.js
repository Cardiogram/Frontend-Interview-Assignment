import Cardiogram from '../../models/cardiogram';
import BaseLens from './base-lens';

const ONE_MINUTE_MS = 60 * 1000;

function sum(list) {
	return _.reduce(list, (x, y) => x + y, 0);
}

export class ChartInterval {
	constructor(startMs, endMs, densityPxPerMin) {
		this.startMs = startMs;
		this.endMs = endMs;
		this.densityPxPerMin = densityPxPerMin;
	}
}

export class VariableDensityAxesImperative {
  constructor(intervals) {
  	this.intervals = intervals;
  }

  timestampToX(timestampMillis) {
  	var x = 0;
  	for (var i = 0; i < intervals.length; i++) {
  		if (timestampMillis > this.intervals[i].end) {
  			return 0;
  		}
  	}
  }
}

/**
 * Example implementation 1:
 */
export class VariableDensityAxesIdiomatic {
  constructor(intervals) {
  	// Total PX
  	this.widthPx = sum(intervals.map((i) => (i.end - i.start) * densityPixelsPerMinute));
  }

  timestampToX(timestampMillis) {
  	// TODO
  }
}

/**
 * Implementation 3.
 */
export class VariableDensityAxesEfficient {
  constructor(intervals) {
  	this.intervals = intervals.
  	this.offsetsPx = [];
  	_.each(intervals, (interval, i) => {
  		const intervalWidthMin = (interval.endMs - interval.startMs) / ONE_MINUTE_MS;
  		const intervalWidthPx = intervalWidthMin * interval.densityPixelsPerMinute;
  		this.offsetsPx.push(this.offsets[i] + intervalWidthPx);
  	});
  }

  timestampToX(timestampMs) {
  	const i = this._findIntervalIndex(timestamp);
  	const interval = this.intervals[i];
  	return this.offsetsPx[i] + interval.densityPxPerMin * (timestampMs - interval.startMs) / ONE_MINUTE_MS;
  }

  _findIntervalIndex(timestamp) {
  	const lo = 0;
  	const hi = this.intervals.length - 1;

  	while (hi > lo) {
  		const mid = int((hi + lo) / 2);
  		if (timestampMs >= this.intervals[mid].start && timestampMs < this.intervals[mid].end) {
  			return mid;
  		} else if (timestampMs > this.intervals[mid.end]) {
  			lo = mid + 1;
  		} else {
  			hi = mid - 1;
  		}
  	}
  }
}
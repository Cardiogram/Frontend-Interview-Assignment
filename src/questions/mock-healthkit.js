/**
 * A fake Javascript interface which simulates some of the ideas behind Apple's native
 * HealthKit APIs (https://developer.apple.com/healthkit/). Our native app programs those
 * in Swift, but for the purpose of this interview question, we simulate the same
 */
class MockHealthKit {
  constructor() {
    // Maps each sensor type (steps, heartRate, ...) to 
    this.sensorTypeToObservers = {};
    // maps each sensor type to a list of data points {start: ..., end: ..., value: ...}.
    this.sensorTypeToDataPoints = {};
  }

  /**
   * Register an observer function, which will be called whenever new data becomes available for
   * this sensorType.
   *
   * @param {string} sensorType
   * @param {function} observer - a parameterless function.
   */ 
  registerObserver(sensorType, observerFunction) {
    if (!this.sensorTypeToObservers[sensorType]) {
      this.sensorTypeToObservers[sensorType] = [];
    }
    this.sensorTypeToObservers[sensorType].push(observerFunction);
  }

  queryForData(sensorType, start, end, cb) {
    console.log(`queryForData(${start}, ${end})`);
    const data = this.sensorTypeToDataPoints[sensorType].filter((d) => {
      return d.start >= start && d.end < end;
    });
    console.log(`Returning ${data.length}/${this.sensorTypeToDataPoints[sensorType].length} measurements`);
    setTimeout(() => cb(null, data), 2);
  }

  /**
   * Test cases should call this when they want to simulate what happens when HealthKit receives
   * new data from a sensor (e.g., heart rate sensor or accelerometer for step counts).
   */
  injectFakeSensorMeasurements(sensorType, listOfDataPoints) {
    if (!this.sensorTypeToDataPoints[sensorType]) {
      this.sensorTypeToDataPoints[sensorType] = [];
    }

    const oldData = this.sensorTypeToDataPoints[sensorType]
    const combinedData = oldData.concat(listOfDataPoints).sort((a, b) => a.start - b.start);
    this.sensorTypeToDataPoints[sensorType] = combinedData;
    if (this.sensorTypeToObservers[sensorType]) {
      this.sensorTypeToObservers[sensorType].forEach((observer) => {
        observer();
      });
    }
  }

  reset() {
    // don't reset observers
    this.sensorTypeToDataPoints = {};
  }
}

module.exports = MockHealthKit;
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
   * Register.
   * @param {string} sensorType
   * @param {function} healthObserver - a function(sensorType) which is called whenever new data
   *   becomes available.
   */ 
  registerObserver(sensorType, healthObserver) {
    if (!this.sensorTypeToObservers[sensorType]) {
      this.sensorTypeToObservers[sensorType] = [];
    }
    this.sensorTypeToObservers[sensorType].push(healthObserver);
  }

  /**
   * Test cases should call this when they want to simulate what happens when HealthKit receives
   * new data from a sensor (e.g., heart rate sensor or accelerometer for step counts).
   */
  mockNewSensorMeasurements(sensorType, listOfDataPoints) {
    if (!this.sensorTypeToDataPoints[sensorType]) {
      this.sensorTypeToDataPoints[sensorType] = [];
    }
    const combinedData = this.sensorTypeToDataPoints.concat(listOfDataPoints);
    const sortedData = combinedData.sort((a, b) => a.start - b.start);
    this.sensorTypeToDataPoints[sensorType]= sortedData;
    if (this.sensorTypeToObservers) {
      this.sensorTypeToObservers[sensorType].each((observer) => {
        // DO SOMETHING
      });
    };
  }
};
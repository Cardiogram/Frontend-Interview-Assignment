//
// healthKit.getData(sensorType, start, end)
//
// What to do:
//   Identify bugs:
//     a. not initialized case (?)
//     b. sync bug called twice.
//     c. ??
//
//   Add test case.
//   Fix concurrency bug.
//   

class BuggyHealthSyncer {
  constructor(httpClient, healthKit) {
    this.sensorTypeToLastSynced = {};
  }

  onNewSensorData(sensorType) {
    // CHECK
  }

  reset() {
    this.sensorTypeToLastSynced.each((st) => {
      this.sensorTypeToLastSynced[st] = -1;
    }
  }
}
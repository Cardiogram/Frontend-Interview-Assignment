/**
 * Syncs heart rate and step count data to the cardiogram.com API.
 *
 * TODO(brandon): fix all these darm bugs!
 */
class BuggyHealthSyncer {
  constructor(httpClient, healthKit) {
    // Maps each sensor type to the unix timestamp of the last measurement we synced.
    this.sensorTypeToLastSynced = {};
    this.httpClient = httpClient;
    this.healthKit = healthKit;
    this.healthKit.registerObserver('heartRate', this.onNewSensorData.bind('heartRate'));
  }

  onNewSensorData(sensorType) {
    const start = this.sensorTypeToLastSynced[sensorType];
    this.healthKit.queryForData(sensorType, start, Date.now(), (err, data) => {
      this.httpClient.post(`cardiogram.com/api/${sensorType}/new`, data, (err, statusCode, responseBody) => {
        this.sensorTypeToLastSynced[sensorType] = data[data.length - 1].start;
      });
    });
  }

  reset() {
    this.sensorTypeToLastSynced.each((sensorType) => {
      this.sensorTypeToLastSynced[sensorType] = -1;
    });
  }
}

module.exports = BuggyHealthSyncer;
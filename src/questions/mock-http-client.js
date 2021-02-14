/**
 * Mocks out an HTTP client that posts content to a URL.
 */
class MockHTTPClient {
  constructor() {
  	this.reset();
  }

  /**
   * Mocks out posting a JSON blob to a URL.
   * @param {string} url
   * @param {Object} jsonBody
   * @callback function(error, httpStatus, responseBody)
   */
  post(url, jsonBody, cb) {
  	console.log(`POST ${url} ${jsonBody.length}`);
    setTimeout(() => {
      this.numPosts += 1;
      this.numSensorMeasurements += jsonBody.length;
      return cb(null, 200, {})
    }, 1);
  }

  reset() {
  	console.log(' ====== RESET =======');
  	this.numPosts = 0;  // total number of HTTP posts we've received
  	this.numSensorMeasurements = 0;  // total number of sensor measurements
  }
};

module.exports = MockHTTPClient;
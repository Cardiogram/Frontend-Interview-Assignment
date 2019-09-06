/**
 * Mocks out an HTTP client that posts content to a URL.
 */
class MockHTTPClient {
  /**
   * Mocks out posting a JSON blob to a URL.
   * @param {string} url
   * @param {Object} jsonBody
   * @callback function(error, httpStatus, responseBody)
   */
  post(url, jsonBody, cb) {
    setTimeout(25, cb(null, 200, {}));
  }
};
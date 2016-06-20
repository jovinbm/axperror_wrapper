module.exports = function (Axperror_wrapper) {
  
  var Promise = require('bluebird');
  
  /**
   *
   * @param {object} req - a request object
   * @param {object} res - a response object
   * @param {axpError|object} error
   * @returns {*}
   */
  Axperror_wrapper.prototype.catchErrors = function (req, res, error) {
    var self = this;
    var e    = error;
    
    if (!(e instanceof Error)) {
      e = new self.axpError();
    }
    
    if (!e.isCustomError) {
      e = new self.axpError({
        err  : e,
        code : 500,
        print: true
      });
    }
    
    // add request details
    e.request = req.originalUrl;
    
    // print
    self.printError(e);
    
    return Promise.resolve()
      .then(function () {
        if (req.xhr) {
          return self.catchXhrErrors(req, res, e);
        }
        else {
          return self.catchNonXhrErrors(req, res, e);
        }
      })
      .catch(function (e) {
        self.printError(e);
      })
      .then(function () {
        return true;
      })
      .finally(function () {
        self.errorActionCompleted(error);
        return true;
      });
  };
};
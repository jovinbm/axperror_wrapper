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
    var wrapper = new Axperror_wrapper();
    var e       = error;
    
    if (!(e instanceof Error)) {
      e = new wrapper.axpError();
    }
    
    if (!e.isCustomError) {
      e = new wrapper.axpError({
        err  : e,
        code : 500,
        print: true
      });
    }
    
    // add request details
    e.request = req.originalUrl;
    
    // print
    wrapper.printError(e);
    
    return Promise.resolve()
      .then(function () {
        if (req.xhr) {
          return wrapper.catchXhrErrors(req, res, e);
        }
        else {
          return wrapper.catchNonXhrErrors(req, res, e);
        }
      })
      .catch(function (e) {
        wrapper.printError(e);
      })
      .then(function () {
        return true;
      });
  };
};
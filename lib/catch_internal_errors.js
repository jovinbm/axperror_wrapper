module.exports = function (Axperror_wrapper) {
  
  var Promise = require('bluebird');
  
  /**
   * catches errors that are just internal, e.g event emitters cleaning up, errors that are
   * not necessarily tied to a request
   * @param {axpError|Error} error
   * @returns {*}
   */
  Axperror_wrapper.prototype.catchInternalErrors = function (error) {
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
    
    return Promise.resolve()
      .then(function () {
        return self.printInternalError(e);
      })
      .finally(function () {
        self.errorActionCompleted(error);
        return true;
      });
  };
};
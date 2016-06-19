module.exports = function (Axperror_wrapper) {
  
  var Promise = require('bluebird');
  
  /**
   *
   * @param {object[]} arrOfArguments
   * @returns {*}
   */
  Axperror_wrapper.prototype.catchEmptyArgs = function (arrOfArguments) {
    var wrapper     = new Axperror_wrapper();
    var errors      = 0;
    var missingArgs = [];
    
    return Promise.resolve()
      .then(function () {
        if (typeof arrOfArguments === 'object') {
          var len = arrOfArguments.length;
          for (var i = 0; i < len; i++) {
            if (!arrOfArguments[i]) {
              missingArgs.push(i);
              errors++;
            }
          }
        }
        else {
          throw new wrapper.axpError({
            message: "arrOfArguments should be an array",
            msg    : 'The request was incorrect or some data was missing or incorrect. Please check and try again',
            code   : 400,
            print  : true
          });
        }
      })
      .then(function () {
        if (errors > 0) {
          throw new wrapper.axpError({
            message: errors + ' important arguments are missing: ' + missingArgs,
            msg    : 'The request was incorrect or some data was missing or incorrect. Please check and try again',
            code   : 400,
            print  : true
          });
        }
        return true;
      });
  };
};
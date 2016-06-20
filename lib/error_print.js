var colors = require('colors');

module.exports = function (Axperror_wrapper) {

  /**
   *
   * @param {axpError} e
   */
  Axperror_wrapper.prototype.printError = function (e) {
    
    if (e.print) {
      console.log(colors.yellow(e));
      console.log(colors.yellow(JSON.stringify(e, null, 4)));
    }
    else {
      // withour stack
      console.log(colors.yellow(JSON.stringify(e, null, 4)));
    }
  };
  
  /**
   *
   * @param {axpError} e
   */
  Axperror_wrapper.prototype.printInternalError = function (e) {
    
    if (e.print) {
      console.log(colors.yellow(e));
      console.log(colors.yellow(JSON.stringify(e, null, 4)));
    }
    else {
      // withour stack
      console.log(colors.yellow(JSON.stringify(e, null, 4)));
    }
  };
};
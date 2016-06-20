var colors = require('colors');

module.exports = function (Axperror_wrapper) {

  /**
   *
   * @param {axpError} e
   */
  Axperror_wrapper.prototype.printError = function (e) {
    
    if (e.print) {
      console.error(e.stack);
      console.error(colors.yellow(JSON.stringify(e, null, 4)));
    }
    else {
      // without stack
      console.warn(colors.yellow(JSON.stringify(e, null, 4)));
    }
  };
  
  /**
   *
   * @param {axpError} e
   */
  Axperror_wrapper.prototype.printInternalError = function (e) {
    
    if (e.print) {
      console.error(e.stack);
      console.error(colors.yellow(JSON.stringify(e, null, 4)));
    }
    else {
      // without stack
      console.warn(colors.yellow(JSON.stringify(e, null, 4)));
    }
  };
};
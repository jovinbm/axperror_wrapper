module.exports = function (Axperror_wrapper) {
  
  /**
   *
   * @param {axpError} e
   */
  Axperror_wrapper.prototype.printError = function (e) {
    
    if (e.print) {
      gLogger.error(e);
      gLogger.error(JSON.stringify(e, null, 4));
    }
    else {
      // withour stack
      gLogger.error(JSON.stringify(e, null, 4));
    }
  };
  
  /**
   *
   * @param {axpError} e
   */
  Axperror_wrapper.prototype.printInternalError = function (e) {
    
    if (e.print) {
      gLogger.error(JSON.stringify(e, null, 4));
      gLogger.error(e);
    }
    else {
      // withour stack
      gLogger.error(JSON.stringify(e, null, 4));
    }
  };
};
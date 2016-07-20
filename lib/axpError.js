module.exports = function (Axperror_wrapper) {
  
  /**
   *
   * @param {number} code
   * @returns {*}
   */
  function getMsg(code) {
    switch (code) {
      case 301:
        return 'You are being redirected..';
      case 302:
        return 'You are being redirected..';
      case 400:
        return 'There was a problem with your request. Please check and try again';
      case 401:
        return 'We were unable to authenticate your request. Please make sure you are signed in.';
      case 403:
        return "You don't have the permissions to access this page or feature.";
      case 404:
        return 'The page or resource you requested cannot be displayed right now. It may be temporarily unavailable, broken or expired.';
      case 500:
        return 'Something went wrong while processing your request. Please try again in a bit. Our developers have been notified of this error.';
      default:
        return 'Something went wrong...';
    }
  }
  
  /**
   * @class axpError
   * @param {object}      opts
   * @param {boolean}     opts.print - whether to actually print the error
   * @param {boolean}     opts.notify - whether to notify user if error trickles down
   * @param {boolean}     opts.type - type of notification: ['warning', 'error','info']
   * @param {boolean}     [opts.isHandled=false] - mark an error as handled
   * @param {boolean}     [opts.isCustomError] - whether this error is a custom one
   * @param {boolean}     [opts.reload=false] - whether to reload page
   * @param {object}      [opts.request=null] - the request
   * @param {Error}       [opts.err=New Error]
   * @param {string}      [opts.name=Name of Created Error]
   * @param {number}      opts.code
   * @param {number}      [opts.c_code=null] - custom code for module communication
   * @param {boolean}     [opts.isPartial=false] - for rendering partial html
   * @param {string}      [opts.message=Message of new Error] - geeky reason for error
   * @param {string}      opts.msg='' - user friendly error, sent to user
   * @param {boolean}     [opts.redirect=false]
   * @param {string}      [opts.redirectPath=''] - path starting with / - automatically makes redirect to be true
   * @param {string}      [opts.redirectUrl=''] - full url - takes precedence - automatically makes redirect true
   * @param {logout}      [opts.logout=false]
   * @param {protocol}    [opts.protocol=null] - http or htpps
   */
  var axpError = function (opts) {
    
    var self          = this;
    var allProperties = ['print', 'notify', 'type', 'isHandled', 'isCustomError', 'reload', 'err', 'name', 'c_code', 'code', 'isPartial', 'message', 'msg', 'redirect', 'redirectPath', 'redirectUrl', 'logout', 'request', 'protocol'];
    var options       = opts ? opts : {};
    
    /*
     * IF WE ARE GIVEN AN ERROR CONTEXT
     * */
    var err = options.err ? options.err : null;
    
    if (err instanceof Error) {
      
      //if the error was already created, i.e. isCustomError, just update the details and return it
      if (err.isCustomError) {
        self.isCustomError = true;
        self.isHandled     = "isHandled" in options ? !!options.isHandled : !!err.isHandled;
        self.reload        = "reload" in options ? !!options.reload : !!err.reload;
        self.redirectPath  = ("redirectPath" in options && !!options.redirectPath) ? options.redirectPath : err.redirectPath;
        self.redirectUrl   = ("redirectUrl" in options && !!options.redirectUrl) ? options.redirectUrl : err.redirectUrl;
        self.redirect      = (self.redirectPath || self.redirectUrl) ? true : !!err.redirect;
        self.request       = !!options.request ? options.request : null;
        self.protocol      = !!options.protocol ? options.protocol : null;
        self.logout        = "logout" in options ? !!options.logout : err.logout;
        self.name          = !!options.name ? options.name : err.name;
        self.message       = !!options.message ? options.message : err.message;
        self.stack         = err.stack;
        self.code          = parseInt(options.code) ? parseInt(options.code) : err.code;
        self.print         = self.code === 500 ? true : !!err.print;
        self.c_code        = !!options.c_code ? options.c_code : err.c_code;
        self.msg           = !!options.msg ? options.msg : err.msg;
      }
      else {
        // else use the error context to create a new error
        self.isCustomError = true;
        self.isHandled     = options.isHandled ? true : false;
        self.reload        = !!options.reload;
        self.redirectPath  = !!options.redirectPath ? options.redirectPath : null;
        self.redirectUrl   = !!options.redirectUrl ? options.redirectUrl : null;
        self.redirect      = (self.redirectPath || self.redirectUrl) ? true : false;
        self.request       = !!options.request ? options.request : null;
        self.protocol      = !!options.protocol ? options.protocol : null;
        self.logout        = !!options.logout;
        self.name          = !!options.name ? (options.name + ': ' + err.name) : err.name;
        self.message       = !!options.message ? (err.message + ': ' + options.message) : err.message;
        self.stack         = err.stack;
        self.code          = parseInt(options.code) ? parseInt(options.code) : 500;
        self.print         = self.code === 500 ? true : !!options.print;
        self.c_code        = !!options.c_code ? options.c_code : null;
        self.msg           = !!options.msg ? options.msg : getMsg(self.code);
        
        // copy all properties of the given error to new error
        // override current if possible
        // don't override code, msg, c_code
        for (var errProperty in err) {
          if (err.hasOwnProperty(errProperty)) {
            if (errProperty !== 'code' && errProperty !== 'msg' && errProperty !== 'c_code') {
              self[errProperty] = err[errProperty];
            }
          }
        }
      }
    }
    else {
      // we make our own error object
      
      self.isCustomError = true;
      self.isHandled     = options.isHandled ? true : false;
      self.isPartial     = !!options.isPartial;
      self.reload        = !!options.reload;
      self.redirectPath  = !!options.redirectPath ? options.redirectPath : null;
      self.redirectUrl   = !!options.redirectUrl ? options.redirectUrl : null;
      self.redirect      = (self.redirectPath || self.redirectUrl) ? true : false;
      self.request       = !!options.request ? options.request : null;
      self.protocol      = !!options.protocol ? options.protocol : null;
      self.logout        = !!options.logout;
      self.name          = !!options.name ? options.name : 'axpError';
      self.message       = !!options.message ? options.message : '';
      self.code          = parseInt(options.code) ? parseInt(options.code) : 500;
      self.print         = self.code === 500 ? true : !!options.print;
      self.c_code        = !!options.c_code ? options.c_code : null;
      self.msg           = !!options.msg ? options.msg : getMsg(self.code);
    }
    
    //add the fatal Identifier for fatal errors
    if (self.code === 500 || self.print) {
      self.name += ': FATAL_AXP_ERROR';
    }
    
    // other properties that might have been attached, mainly for inter-module communication
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        if (allProperties.indexOf(prop) === -1) {
          this[prop] = options[prop];
        }
      }
    }
  };
  
  axpError.prototype = Error.prototype;
  
  Axperror_wrapper.prototype.axpError = axpError;
};
/**
 *
 * @constructor
 */
var Axperror_wrapper = function (config) {
  var self = this;

  if (typeof config.html_error_friendly !== 'function') {
    throw new Error('config.html_error_friendly should be function');
  }

  self.name                = 'Axperror_wrapper';
  self.html_error_friendly = config.html_error_friendly;
};

require('./lib/index')(Axperror_wrapper);

exports.Axperror_wrapper = Axperror_wrapper;
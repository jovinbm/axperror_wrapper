/**
 *
 * @constructor
 */
var Axperror_wrapper = function (config) {
  this.name                = 'Axperror_wrapper';
  this.html_error_friendly = config.html_error_friendly;
};

require('./lib/index')(Axperror_wrapper);

exports.Axperror_wrapper = function (config) {

  if (typeof config.html_error_friendly !== 'function') {
    throw new Error('config.html_error_friendly should be function');
  }

  return new Axperror_wrapper(config);
};
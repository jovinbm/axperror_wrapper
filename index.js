/**
 *
 * @constructor
 */
var Axperror_wrapper = function () {
  this.name = 'Axperror_wrapper';
};

require('./lib/index')(Axperror_wrapper);

exports.Axperror_wrapper = new Axperror_wrapper();
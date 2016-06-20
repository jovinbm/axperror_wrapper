var colors = require('colors');
var ajv    = require("ajv")({
  removeAdditional: false
});

/**
 *
 * @constructor
 * @param {object} config
 * @param {function} config.render_error_friendly - function to render the error page
 * @param {boolean} [config.stop_on_error=false] - whether to stop process on error - useful when debugging
 */
var Axperror_wrapper = function (config) {
  var self = this;

  var schema = {
    type                : 'object',
    additionalProperties: false,
    required            : ['render_error_friendly'],
    properties          : {
      render_error_friendly: {},
      stop_on_error        : {
        type: 'boolean'
      }
    }
  };

  var valid = ajv.validate(schema, config);

  if (!valid) {
    var e = new Error(ajv.errorsText());
    e.ajv = ajv.errors;
    throw e;
  }

  if (typeof config.render_error_friendly !== 'function') {
    throw new Error('config.render_error_friendly should be function');
  }

  self.name                  = 'Axperror_wrapper';
  self.render_error_friendly = config.render_error_friendly;
  self.stop_on_error         = !!config.stop_on_error;

  if (self.stop_on_error) {
    console.log(colors.red.underline('Axperror_wrapper: Stopping on error'));
  }
};

require('./lib/index')(Axperror_wrapper);

exports.Axperror_wrapper = Axperror_wrapper;
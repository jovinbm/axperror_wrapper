module.exports = function (Axperror_wrapper) {
  
  var Promise = require('bluebird');
  
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {axpError} e
   * @returns {*}
   */
  Axperror_wrapper.prototype.catchNonXhrErrors = function (req, res, e) {
    var self = this;

    return Promise.resolve()
      .then(function () {
        throw e;
      })
      .catch(function (e) {
        if (e.logout) {
          return new Promise(function (resolve, reject) {
            req.logout();
            req.session.destroy(function () {
              reject(e);
            });
          });
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 301 && (e.redirectPath || e.redirectUrl)) {
          return res.redirect(301, e.redirectPath || e.redirectUrl);
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 302 && (e.redirectPath || e.redirectUrl)) {
          return res.redirect(302, e.redirectPath || e.redirectUrl);
        }
        else {
          throw e;
        }
      })
      .catch(function () {
        // if there is a redirect, redirect here
        if (e.redirectPath || e.redirectUrl) {
          return res.redirect(e.redirectPath || e.redirectUrl);
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 400 || e.code === 600) { //600s are just normal errors that occur, most of them deserve a 200 response
          return self.render_error_friendly(req, res, e);
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 401) {
          return self.render_error_friendly(req, res, e);
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 403) {
          return self.render_error_friendly(req, res, e);
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 404) {
          return self.render_error_friendly(req, res, e);
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        return self.render_error_friendly(req, res, e);
      });
  };
};
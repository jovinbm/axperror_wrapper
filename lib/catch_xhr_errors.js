module.exports = function (Axperror_wrapper) {
  
  var Promise = require('bluebird');
  
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {axpError} e
   * @returns {*}
   */
  Axperror_wrapper.prototype.catchXhrErrors = function (req, res, e) {
    
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
          return res.status(200).send({
            code        : 301,
            notify      : true,
            type        : 'warning',
            msg         : e.msg || '',
            redirect    : !!(e.redirectPath || e.redirectUrl),
            redirectPath: e.redirectPath,
            redirectUrl : e.redirectUrl,
            reload      : !!e.reload
          });
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 302 && (e.redirectPath || e.redirectUrl)) {
          return res.status(200).send({
            code        : 301,
            notify      : true,
            type        : 'warning',
            msg         : e.msg || '',
            redirect    : !!(e.redirectPath || e.redirectUrl),
            redirectPath: e.redirectPath,
            redirectUrl : e.redirectUrl,
            reload      : !!e.reload
          });
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 400 || e.code === 600) { //600s are just normal errors that occur, most of them deserve a 200 response
          return res.status(400).send({
            code        : 400,
            notify      : true,
            type        : 'warning',
            msg         : e.msg,
            redirect    : !!(e.redirectPath || e.redirectUrl),
            redirectPath: e.redirectPath,
            redirectUrl : e.redirectUrl,
            reload      : !!e.reload
          });
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 401) {
          return res.status(401).send({
            code        : 401,
            notify      : true,
            type        : 'warning',
            msg         : e.msg,
            redirect    : !!(e.redirectPath || e.redirectUrl),
            redirectPath: e.redirectPath,
            redirectUrl : e.redirectUrl,
            reload      : !!e.reload
          });
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 403) {
          return res.status(403).send({
            code        : 403,
            notify      : true,
            type        : 'warning',
            msg         : e.msg,
            redirect    : !!(e.redirectPath || e.redirectUrl),
            redirectPath: e.redirectPath,
            redirectUrl : e.redirectUrl,
            reload      : !!e.reload
          });
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        if (e.code === 404) {
          return res.status(404).send({
            code        : 404,
            notify      : true,
            type        : 'warning',
            msg         : e.msg,
            redirect    : !!(e.redirectPath || e.redirectUrl),
            redirectPath: e.redirectPath,
            redirectUrl : e.redirectUrl,
            reload      : !!e.reload
          });
        }
        else {
          throw e;
        }
      })
      .catch(function (e) {
        return res.status(500).send({
          code        : 500,
          notify      : true,
          type        : 'warning',
          msg         : e.msg,
          redirect    : !!(e.redirectPath || e.redirectUrl),
          redirectPath: e.redirectPath,
          redirectUrl : e.redirectUrl,
          reload      : !!e.reload
        });
      });
  };
};
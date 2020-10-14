'use strict'

const { STATUS_CODES } = require('http')

/**
 * HttpError
 *
 * @class HttpError
 * @extends Error
 * @param {Number|String} code
 * @param {String} message
 * @param {Object} origin
 * @param {Boolean} expose
 * @api public
 */

module.exports = class HttpError extends Error {
  constructor (code = 500, message = '', origin = null, expose = false) {
    super()

    let status

    if (origin) status = origin.status || origin.statusCode

    if (!status) status = 'ENOENT' === code ? 404 : code

    this.code = code
    this.status = status in STATUS_CODES ? status : 500
    this.message = message || STATUS_CODES[status] || 'unknown'
    this.origin = origin
    this.expose = expose
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

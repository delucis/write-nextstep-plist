'use strict'
const UTIL = require('util')
const PATH = require('path')
const FS = require('graceful-fs')
const WRITE_ATOMIC = require('write-file-atomic')
const MAKE_DIR = require('make-dir')
const STRINGIFY = require('nextstep-plist').stringify

const PIFY = UTIL.promisify

const INIT = (fn, fp, data, opts) => {
  if (!fp) {
    throw new TypeError('Expected a filepath')
  }

  if (data === undefined) {
    throw new TypeError('Expected data to stringify')
  }

  opts = Object.assign({}, opts)

  return fn(fp, data, opts)
}

const MAIN = (fp, data, opts) => {
  const PLIST = STRINGIFY(data)

  return PIFY(WRITE_ATOMIC)(fp, `${PLIST}\n`, { mode: opts.mode })
}

const MAIN_SYNC = (fp, data, opts) => {
  const PLIST = STRINGIFY(data)

  return WRITE_ATOMIC.sync(fp, `${PLIST}\n`, { mode: opts.mode })
}

module.exports = (fp, data, opts) => {
  return MAKE_DIR(PATH.dirname(fp), { fs: FS })
    .then(() => INIT(MAIN, fp, data, opts))
}

module.exports.sync = (fp, data, opts) => {
  MAKE_DIR.sync(PATH.dirname(fp), { fs: FS })
  INIT(MAIN_SYNC, fp, data, opts)
}

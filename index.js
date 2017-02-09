'use strict'

module.exports = function resTimeout(ms, cb = () => {}) {
  if (!ms) {
    throw new TypeError('You are missing the millisecond length of your response timeout')
  }
  if (!Number(ms)) {
    throw new TypeError('The response timeout must be a number')
  }
  return (req, res, next) => {
    res.setTimeout(ms, () => {
      res.timedout = true
      cb()
      res.sendStatus(408)
    })
    next()
  }
}

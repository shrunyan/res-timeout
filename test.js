'use strict'

var test = require('ava')
var resTimeout = require('./index')

const req = {}
const next = () => {}

test('throws a TypeError if timeout length not defined', (t) => {
  try {
    resTimeout()
  } catch(err) {
    t.is(err.name, 'TypeError')
    t.is(err.message, 'You are missing the millisecond length of your response timeout')
  }
})

test('throws a TypeError if not a Number', (t) => {
  try {
    resTimeout('test')
  } catch(err) {
    t.is(err.name, 'TypeError')
    t.is(err.message, 'The response timeout must be a number')
  }
})

test('Returns a middleware function', (t) => {
  const middleware = resTimeout(5000)
  const isFunc = {}.toString.call(middleware)
  t.is(isFunc, '[object Function]')
})

test.cb('res.timedout gets set to true', (t) => {
  var resMock = {
    setTimeout: (time, cb) => {
      setTimeout(cb, time)
    },
    sendStatus: () => {},
    timedout: null
  }
  const middleware = resTimeout(10, () => {
    t.truthy(resMock.timedout)
    t.end()
  })

  middleware(req, resMock, next)
})

import test from 'ava'
import HttpError from '..'

test('should have error stack and status', t => {
  const error = new HttpError(404)
  t.throws(() => {
    t.not(error.stack, undefined)
    t.is(error.name, 'HttpError')
    t.is(error.status, 404)
    throw error
  }, 'Not Found')
})

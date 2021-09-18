import set from 'lodash/set'
import { onValidationError, onSystemError, onNonRetryError } from '@freshinup/core-ui/src/http/errorHandlers'

describe('HTTP Error Handler', () => {
  describe('onValidationError()', () => {
    test('when $store is available then the error data is dispatched generalErrorMessages/setErrors', () => {
      const context = {}
      set(context, '$store.dispatch', jest.fn())
      onValidationError(context, set({}, 'response.data', 'Unauthenticated user'))
      expect(context.$store.dispatch).toHaveBeenCalledWith('generalErrorMessages/setErrors', 'Unauthenticated user')
    })
    test('when $store is available then the error data is dispatched generalErrorMessages/setErrors even when response.data is unavailable', () => {
      const context = {}
      set(context, '$store.dispatch', jest.fn())
      onValidationError(context, {})
      expect(context.$store.dispatch).toHaveBeenCalledWith('generalErrorMessages/setErrors', null)
    })
    test('when $store is NOT available there is NOT an error thrown', () => {
      expect(() => onValidationError({}, {})).not.toThrow(Error)
    })
  })

  describe('onSystemError()', () => {
    test('when $store is available then store dispatches generalErrorMessages/setErrors with set message', () => {
      const context = {}
      set(context, '$store.dispatch', jest.fn())
      onSystemError(context)
      expect(context.$store.dispatch).toHaveBeenCalledWith('generalErrorMessages/setErrors', ['System Errors'])
    })
    test('when $store is NOT available there is NOT an error thrown', () => {
      expect(() => onSystemError({}, {})).not.toThrow(Error)
    })
  })

  describe('onNonRetryError()', () => {
    let context
    beforeEach(() => {
      context = {}
      set(context, '$store.dispatch', jest.fn())
    })
    describe('status 400', () => {
      test('dispatches generalErrorMessages/setErrors', () => {
        const error = {
          response: {
            data: 'Bad Request',
            status: 400
          }
        }
        set(context, '$store.dispatch', jest.fn())
        onNonRetryError(context, error)
        expect(context.$store.dispatch).toHaveBeenCalledWith('generalErrorMessages/setErrors', 'Bad Request')
      })

      test('invokes options.onValidationError', () => {
        const error = {
          response: {
            data: 'Bad Request',
            status: 400
          }
        }
        const onValidationErrorMocked = jest.fn()
        onNonRetryError(context, error, { onValidationError: onValidationErrorMocked })
        expect(context.$store.dispatch).not.toHaveBeenCalled()
        expect(onValidationErrorMocked).toHaveBeenCalledWith(context, error)
      })
    })

    describe('status 422', () => {
      test('dispatches generalErrorMessages/setErrors for status 422', () => {
        const error = {
          response: {
            data: 'Validation Error',
            status: 422
          }
        }
        onNonRetryError(context, error)
        expect(context.$store.dispatch).toHaveBeenCalledWith('generalErrorMessages/setErrors', 'Validation Error')
      })

      test('invokes options.onValidationError', () => {
        const error = {
          response: {
            data: 'Bad Request',
            status: 422
          }
        }
        const onValidationErrorMocked = jest.fn()
        onNonRetryError(context, error, { onValidationError: onValidationErrorMocked })
        expect(context.$store.dispatch).not.toHaveBeenCalled()
        expect(onValidationErrorMocked).toHaveBeenCalledWith(context, error)
      })
    })

    describe('status 500 and above', () => {
      test('dispatches generalErrorMessages/setErrors for status 500 +', () => {
        const error = {
          response: {
            data: 'System Error',
            status: 500
          }
        }
        set(context, '$store.dispatch', jest.fn())
        onNonRetryError(context, error)
        expect(context.$store.dispatch).toHaveBeenCalledWith('generalErrorMessages/setErrors', ['System Errors'])

        error.response.status = 503
        onNonRetryError(context, error)
        expect(context.$store.dispatch).toHaveBeenCalledWith('generalErrorMessages/setErrors', ['System Errors'])
      })

      test('invokes options.onValidationError', () => {
        const error = {
          response: {
            status: 500
          }
        }
        const onSystemErrorMocked = jest.fn()
        onNonRetryError(context, error, { onSystemError: onSystemErrorMocked })
        expect(context.$store.dispatch).not.toHaveBeenCalled()
        expect(onSystemErrorMocked).toHaveBeenCalledWith(context, error)
      })
    })

    test('ignores when request is retry', () => {
      const error = {
        response: {},
        config: {
          __isRetryRequest: true
        }
      }
      const onSystemErrorMocked = jest.fn()
      const onValidationErrorMocked = jest.fn()
      const statuses = [400, 422, 500]
      statuses.forEach((status) => {
        error.response.status = status
        onNonRetryError(context, error, {
          onSystemError: onSystemErrorMocked,
          onValidationError: onValidationErrorMocked
        })
        expect(context.$store.dispatch).not.toHaveBeenCalled()
        expect(onSystemErrorMocked).not.toHaveBeenCalled()
        expect(onValidationErrorMocked).not.toHaveBeenCalled()
      })
    })
  })
})

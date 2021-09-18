import { phoneNumber } from '../../src/validation/installRules'

describe('Validation phoneNumber', () => {
  describe('getMessage', () => {
    test('returns expected message using field name', () => {
      const result = phoneNumber.getMessage('mobile_phone')
      expect(result).toEqual('mobile_phone is not a valid phone number')
    })
    test('returns expected message using even without field name (falsy)', () => {
      const result = phoneNumber.getMessage()
      expect(result).toEqual('unnamed field is not a valid phone number')
    })
  })
  describe('validate', () => {
    test('resolves with isValid=true', async () => {
      await expect(phoneNumber.validate('(877) 778-8697')).resolves.toHaveProperty('valid', true)
    })
    test('resolves with isValid=false', async () => {
      await expect(phoneNumber.validate('(877) 778-869')).resolves.toHaveProperty('valid', false)
    })
  })
})

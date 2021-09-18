import PhoneNumber from 'awesome-phonenumber'

export const phoneNumber = {
  getMessage: field => {
    field = field || 'unnamed field'
    return `${field} is not a valid phone number`
  },
  validate (value) {
    return new Promise(resolve => {
      let phone = new PhoneNumber(value, 'US')
      resolve({ valid: phone.isValid() })
    })
  }
}
export const install = (Validator, options = {}) => {
  Validator.extend('phoneNumber', phoneNumber)
}

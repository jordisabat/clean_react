import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    // arrange
    const sut = new EmailValidation('email')
    // act
    const error = sut.validate('')
    // assert
    expect(error).toEqual(new InvalidFieldError())
  })
})

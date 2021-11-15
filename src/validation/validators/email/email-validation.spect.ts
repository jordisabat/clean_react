import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import faker from 'faker'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    // arrange
    const sut = new EmailValidation(faker.random.word())
    // act
    const error = sut.validate(faker.random.word())
    // assert
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is invalid', () => {
    // arrange
    const sut = new EmailValidation(faker.random.word())
    // act
    const error = sut.validate(faker.internet.email())
    // assert
    expect(error).toBeFalsy()
  })
})

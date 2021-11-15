import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'
import faker from 'faker'

const makeSut = (): EmailValidation => {
  return new EmailValidation(faker.random.word())
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    // arrange
    const sut = makeSut()
    // act
    const error = sut.validate(faker.random.word())
    // assert
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is invalid', () => {
    // arrange
    const sut = makeSut()
    // act
    const error = sut.validate(faker.internet.email())
    // assert
    expect(error).toBeFalsy()
  })
})

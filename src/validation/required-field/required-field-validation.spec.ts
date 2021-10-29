import faker from 'faker'
import { RequiredFieldError } from '../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    // arrange
    const sut = new RequiredFieldValidation('email')
    // act
    const error = sut.validate('')
    // assert
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    // arrange
    const sut = new RequiredFieldValidation('email')
    const email = faker.internet.email()
    // act
    const error = sut.validate(email)
    // assert
    expect(error).toBeFalsy()
  })
})

import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    // arrange
    const fieldValidationSpy1 = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('any_message')
    const sut = new ValidationComposite([
      fieldValidationSpy1,
      fieldValidationSpy2
    ])
    // act
    const error = sut.validate('any_field', 'any_value')
    // assert
    expect(error).toBe('any_message')
  })

  test('Should return error if any validation fails', () => {
    // arrange
    const fieldValidationSpy1 = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('any_message')
    const sut = new ValidationComposite([
      fieldValidationSpy1,
      fieldValidationSpy2
    ])
    // act
    const error = sut.validate('any_field', 'any_value')
    // assert
    expect(error).toBe('any_message')
  })
})

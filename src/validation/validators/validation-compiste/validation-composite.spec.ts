import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    // arrange
    const fieldValidationSpy1 = new FieldValidationSpy('any_field')
    fieldValidationSpy1.error = new Error('first_error_message')

    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('second_error_message')
    const sut = new ValidationComposite([
      fieldValidationSpy1,
      fieldValidationSpy2
    ])
    // act
    const error = sut.validate('any_field', 'any_value')
    // assert
    expect(error).toBe('first_error_message')
  })
})

import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocolos/field-validation'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  validate(value: string): Error {
    return new InvalidFieldError()
  }
}

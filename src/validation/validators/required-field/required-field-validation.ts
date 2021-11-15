import { RequiredFieldError } from '../../errors'
import { FieldValidation } from '../../protocolos/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  validate(value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}

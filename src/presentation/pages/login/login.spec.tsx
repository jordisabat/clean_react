import React from 'react'
import {
  cleanup,
  render,
  RenderResult,
  fireEvent
} from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test/'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub: validationStub
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    // arrange
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    // act
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    // assert
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    // arrange
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    // act
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    // assert
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    // arrange
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    // act
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    // assert
    expect(emailStatus.title).toBe('OK')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    // arrange
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    // act
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    // assert
    expect(passwordStatus.title).toBe('OK')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    // arrange
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    // act
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    // assert
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    // arrange
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    // act
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    fireEvent.click(submitButton)
    // assert
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})

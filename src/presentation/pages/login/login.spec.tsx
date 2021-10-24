import React from 'react'
import faker from 'faker'
import {
  cleanup,
  render,
  RenderResult,
  fireEvent
} from '@testing-library/react'
import Login from './login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test/'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )
  return {
    sut,
    authenticationSpy
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

  test('Should call Authencication with correct values', () => {
    // arrange
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const email = faker.internet.email()
    const password = faker.internet.password()
    // act
    fireEvent.input(emailInput, {
      target: { value: email }
    })
    fireEvent.input(passwordInput, {
      target: { value: password }
    })
    fireEvent.click(submitButton)
    // assert
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})

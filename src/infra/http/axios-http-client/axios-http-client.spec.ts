import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL', async () => {
    // arrange
    const sut = makeSut()
    const url = faker.internet.url()
    // act
    await sut.post({ url })
    // assert
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
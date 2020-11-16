import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.random.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    // arrange
    const request = mockPostRequest()
    const sut = makeSut()
    // act
    await sut.post(request)
    // assert
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', async () => {
    // arrange
    const sut = makeSut()
    // act
    const httpResponse = await sut.post(mockPostRequest())
    // assert
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})

import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'
// import { HttpPostParams } from 'data/protocols/http/http-post-client'
import { mockAuthentication } from '../../../domain/test/mock-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

// const makeSut = (params: HttpPostParams): SutTypes => {
//   const url = params.url
//   const httpPostClientSpy = new HttpPostClientSpy()
//   const sut = new RemoteAuthentication(url, httpPostClientSpy)
//   return {
//     sut,
//     httpPostClientSpy
//   }
// }

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    // arrange
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    // act
    await sut.auth(mockAuthentication())
    // assert
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })
})

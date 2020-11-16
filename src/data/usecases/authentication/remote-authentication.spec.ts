import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'
import { HttpPostParams } from 'data/protocols/http/http-post-client'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (params: HttpPostParams): SutTypes => {
  const url = params.url
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
    const { sut, httpPostClientSpy } = makeSut({ url: url })
    // act
    await sut.auth()
    // assert
    expect(httpPostClientSpy.url).toBe(url)
  })
})

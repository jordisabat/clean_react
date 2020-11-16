export enum HttpStatusCode {
  ok = 204,
  unauthorized = 401,
  badRequest = 400,
  serverError = 500,
  notFound = 404
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}

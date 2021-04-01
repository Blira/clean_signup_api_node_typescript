import { badRequest, serverError } from '../helpers/httpHelper';
import { MissingParamError, InvalidParamError } from '../errors';
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from '../protocols';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const validEmail = this.emailValidator.isValid(httpRequest.body.email);

      if (!validEmail) {
        return {
          statusCode: 400,
          body: new InvalidParamError('email'),
        };
      }
    } catch (_error) {
      return serverError();
    }
  }
}

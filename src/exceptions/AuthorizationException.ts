export class AuthorizationException extends Error {
  constructor(message: string = 'Access denied') {
    super(message);
    this.name = 'AuthorizationException';
  }
}
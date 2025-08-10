export class ValidationException extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationException';
  }
}
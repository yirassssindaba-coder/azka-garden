export class BusinessException extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'BusinessException';
  }
}
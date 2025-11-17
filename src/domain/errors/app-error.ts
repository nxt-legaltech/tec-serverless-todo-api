/**
 * App Error
 *
 * @summary
 * A custom error class for application-specific errors.
 *
 * @description
 * This class extends the built-in Error class to include an HTTP status code.
 * It is used to represent errors that occur within the application, allowing
 * for more precise error handling and response generation.
 *
 * @property {number} statusCode - The HTTP status code associated with the error.
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

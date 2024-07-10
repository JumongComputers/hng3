export default class Exception extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);  // Pass message to the parent Error constructor
    this.status = status;

    // Set the prototype explicitly for correct inheritance
    Object.setPrototypeOf(this, Exception.prototype);

    // Maintains proper stack trace for where our error was thrown (only available on V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

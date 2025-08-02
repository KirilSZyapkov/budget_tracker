export class AppError extends Error {
  status: number
  constructor(message: string, status = 500) {
    super(message)
    this.status = status
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid input") {
    super(message, 400)
  }
}

export class AuthError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404)
  }
}

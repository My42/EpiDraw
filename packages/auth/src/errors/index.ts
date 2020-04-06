export const errors = {
  EMAIL_ALREADY_EXIST: 1,
  INVALID_INPUT: 2,
  USER_UNKNOWN: 3
}

export class EpiDrawError extends Error {
  code: number;

  constructor (code: number, message: string) {
    super(message)
    this.code = code
  }
}

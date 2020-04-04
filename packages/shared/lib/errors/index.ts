export const errors = {
  INVALID_INPUT: 1,
  EMAIL_ALREADY_EXIST: 2
}

export class EpiDrawError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

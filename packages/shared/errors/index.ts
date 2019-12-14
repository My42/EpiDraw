export const errors = {
  INVALID_INPUT: 1
}

export class EpiDrawError extends Error {
  constructor(code: number, message: string) {
    super(message);
  }
}

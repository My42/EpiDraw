export interface SignUpArgs {
  email: string,
  password: string,
  username: string,
}

export default class Auth {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUp ({ email, password, username } : SignUpArgs) {
  }
}

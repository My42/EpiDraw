export interface SignUpArgs {
  email: string,
  password: string,
  username: string,
}

export default class Auth {
  async signUp ({ email, password, username } : SignUpArgs) {
  }
}

import axios, { AxiosInstance } from 'axios'

class User {
  readonly #baseUrl: string
  readonly #port: number
  readonly #api: AxiosInstance

  constructor(baseUrl: string, port: number) {
    console.log('#construtor =', {baseUrl, port})

    this.#baseUrl = baseUrl
    this.#port = port
    this.#api = axios.create({
      baseURL: `http://${baseUrl}:${port}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   *
   */
  async search() {
    try {
      const response = await this.#api.get('/users')

      console.log('response =', response)

      return response.data
    } catch (e) {
      console.log('error =', e)
      return null
    }
  }
}

export { User }

import axios, { AxiosInstance } from 'axios';

export class Service {
  protected baseUrl: string

  protected port: number

  protected api: AxiosInstance

  constructor(baseUrl: string, port: number) {
    this.baseUrl = baseUrl;
    this.port = port;
    this.api = axios.create({
      baseURL: `http://${baseUrl}:${port}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get getApi() {
    return this.api;
  }
}

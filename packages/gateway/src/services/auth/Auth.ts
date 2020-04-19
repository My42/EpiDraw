import { handleError } from '@gateway/utils/decorators';
import { Service } from '../utils/Service';

export class Auth extends Service {
  @handleError
  async getToken({ userId }: { userId: string }) {
    const response = await this.api.get<string>('/token', { params: { userId } });

    return response.data;
  }
}

import { User } from '@gateway/types/User';
import faker from 'faker';

export const createUserFixture = (fields?: Partial<User>): User => ({
  email: faker.internet.email(),
  createdAt: faker.date.past().getTime(),
  id: faker.random.uuid(),
  password: faker.internet.password(),
  username: faker.internet.userName(),
  ...fields,
});

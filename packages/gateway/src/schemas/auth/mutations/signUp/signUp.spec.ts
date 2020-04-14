import { describe, it } from 'mocha';
import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { ApolloContext } from '@gateway/types/ApolloContext';
import { User } from '@gateway/services/user';

import signUp from './signUp';

describe('[gateway]: schema/auth/mutation/signUp', () => {
  const sandbox = sinon.createSandbox();

  const createMockedContext = (): ApolloContext => ({
    services: {
      user: sandbox.createStubInstance<User>(User) as unknown as User,
    },
  });

  it('should sign up an user', async () => {
    const ctx = createMockedContext();
    const input = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    };

    const result = await signUp({}, { input }, ctx);

    const spy = ctx.services.user as unknown as sinon.SinonStubbedInstance<User>;

    expect(spy.createOne.callCount).to.be.equal(1);
    expect(spy.createOne.getCall(0).args[0]).to.be.deep.equal(input);
    expect(result).to.be.a('boolean').to.be.equal(true);
  });
});

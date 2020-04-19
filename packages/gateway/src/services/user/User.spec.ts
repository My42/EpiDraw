import { ApolloError } from 'apollo-server';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';

import { objToHttpParams } from '@gateway/utils/objToHttpParams';
import { User } from './User';

describe('gateway/src/services/user/User', () => {
  const userService = new User('user', 4242);
  const axiosMocked = new MockAdapter(userService.getApi);

  describe('User.createOne', () => {
    it('should create one', async () => {
      const data = { hello: 'world' };
      const body = { email: 'vincent.mesquita@epitech.eu', username: 'ZeetcH', password: 'coucou0%' };
      axiosMocked.onPost('/users').reply(200, data);

      const result = await userService.createOne(body);

      expect(data).to.be.deep.equal(result);
      expect(JSON.parse(axiosMocked.history.post[0].data)).to.be.deep.equal(body);
    });

    it('should throw an error', async () => {
      let error: any = null;
      axiosMocked.onPost('/users').reply(404, 'message');

      try {
        await userService.createOne({ email: 'vincent.mesquita@epitech.eu', password: 'coucou0%', username: 'ZeetcH' });
      } catch (e) {
        error = e;
      }

      expect(error instanceof ApolloError).to.be.equal(true);

      const apolloError: ApolloError = error;
      expect(apolloError.message).to.be.equal('message');
      expect(apolloError.extensions.code).to.be.a('string').equal('404');
    });
  });

  describe('User.find', async () => {
    it('should find users', async () => {
      const filters = { email: 'fake_email' };
      const data = [1, 2, 3, 4];

      axiosMocked.onGet(`/users?${objToHttpParams(filters)}`).reply(200, data);

      const result = await userService.find(filters);

      expect(result).to.be.deep.equal(data);
    });
  });
});

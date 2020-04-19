import { ApolloError } from 'apollo-server';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';

import { createUserFixture } from '@gateway/utils/tests/fixtures';

import { Auth } from './Auth';

describe('packages/gateway/src/services/Auth', () => {
  const authService = new Auth('auth', 4242);
  const axiosMocked = new MockAdapter(authService.getApi);
  const { id: userId } = createUserFixture();

  describe('Auth.getToken', () => {
    it('should get the token and basic information about user', async () => {
      axiosMocked.onGet('/token').reply(200, 'FAKE_TOKEN');

      const response = await authService.getToken({ userId });

      const [history] = axiosMocked.history.get;

      expect(history).to.be.not.equal(undefined);
      expect(history.params).to.be.deep.equal({ userId });
      expect(response).be.equal('FAKE_TOKEN');
    });

    it('should throw an ApolloError', async () => {
      let error: any = null;
      axiosMocked.onGet('/token').reply(404, 'message');

      try {
        await authService.getToken({ userId: 'FAKE_ID' });
      } catch (e) {
        error = e;
      }

      expect(error).to.be.not.equal(null);
      expect(error instanceof ApolloError).to.be.equal(true);

      const apolloError: ApolloError = error;
      expect(apolloError.message).to.be.equal('message');
      expect(apolloError.extensions.code).to.be.a('string').equal('404');
    });
  });
});

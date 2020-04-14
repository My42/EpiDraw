import { ApolloError } from 'apollo-server';
import { AxiosError } from 'axios';

export function handleError(target, key, descriptor) {
  const fn = descriptor.value;

  // eslint-disable-next-line no-param-reassign
  descriptor.value = async function (...args) {
    try {
      return await fn.call(this, ...args);
    } catch (e) {
      console.log(`Error caught from ${target}.${key}:`, e);
      if (e.isAxiosError) {
        const error = e as AxiosError;
        throw new ApolloError(error.response?.data, error.response?.status.toString(), {});
      }
      throw new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
    }
  };
  return descriptor;
}

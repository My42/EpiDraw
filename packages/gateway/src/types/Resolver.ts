import { ApolloContext } from './ApolloContext';

export type Resolver<T, U = {}> = (_: U, args: T, context: ApolloContext) => void

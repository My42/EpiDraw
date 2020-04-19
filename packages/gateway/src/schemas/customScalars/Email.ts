import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';
import { UserInputError } from 'apollo-server';

function emailValue(value: string) {
  const found = value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  const result = found ? value : null;

  if (result === null) {
    throw new UserInputError('Invalid email');
  }

  return value;
}

export const Email = new GraphQLScalarType({
  name: 'Email',
  description: 'Basic Email',
  parseValue(value) {
    if (typeof value === 'string') throw new UserInputError('Must be a String');
    return emailValue(value);
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return emailValue(ast.value);
    }
    throw new UserInputError('Must be a String');
  },
});

import { UserInputError } from 'apollo-server';
import { GraphQLScalarType } from 'graphql';

const description = 'Basic email';

function emailValue(value: string) {
  const found = value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  const result = found ? value : null;

  if (result === null) {
    throw new UserInputError('Invalid email');
  }

  console.log({ found, value, result });

  return result;
}

export const Email = new GraphQLScalarType({
  name: 'Email',
  description,
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === 'StringValue') {
      return emailValue(ast.value);
    }
    throw new UserInputError('Must be a String');
  },
});

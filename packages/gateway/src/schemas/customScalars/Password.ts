import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';
import { UserInputError } from 'apollo-server';

const description = '8 characters with at least one number and special one';

function passwordValue(value: string) {
  const found = value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
  const result = found ? value : null;

  if (result === null) {
    throw new UserInputError(`${description}`);
  }

  return value;
}

export const Password = new GraphQLScalarType({
  name: 'Password',
  description,
  parseValue(value) {
    if (typeof value === 'string') throw new UserInputError('Must be a String');
    return passwordValue(value);
  },
  serialize() {
    return null;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return passwordValue(ast.value);
    }
    throw new UserInputError('Must be a String');
  },
});

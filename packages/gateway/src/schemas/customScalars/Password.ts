import { UserInputError } from 'apollo-server';
import { GraphQLScalarType } from 'graphql';

const description = '8 characters with at least one number and special one';

function passwordValue(value: string) {
  const found = value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
  const result = found ? value : null;

  if (result === null) {
    throw new UserInputError(`Invalid password: ${description}`);
  }

  console.log({ found, value, result });

  return result;
}

export const Password = new GraphQLScalarType({
  name: 'Password',
  description,
  serialize: passwordValue,
  parseValue: passwordValue,
  parseLiteral(ast) {
    if (ast.kind === 'StringValue') {
      return passwordValue(ast.value);
    }
    throw new UserInputError('Invalid password: Must be a String');
  },
});

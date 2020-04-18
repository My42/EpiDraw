import { describe, it } from 'mocha';
import { expect } from 'chai';

import { objToHttpParams } from '../objToHttpParams';

describe('gateway/src/utils/tests/objToHttpParams', () => {
  it('should reduce obj to http params with 1 params', () => {
    const obj = { param1: 'hello' };

    const result = objToHttpParams(obj);

    expect(result).to.be.a('string').equal('param1=hello');
  });

  it('should reduce obj to http params with 2 params', () => {
    const obj = { param1: 'hello', param2: 'world' };

    const result = objToHttpParams(obj);

    expect(result).to.be.a('string').equal('param1=hello&param2=world');
  });
});

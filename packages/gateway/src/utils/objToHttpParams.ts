import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';

/**
 * Reduces a object to http parameters
 * example: { param1: 'hello', param2: 'world' } to 'param1=hello&param2=world'
 *
 * @param obj
 */
export const objToHttpParams = (obj: Record<any, any>) => reduce(obj,
  (result, value, key) => {
    const prefix = isEmpty(result) ? '' : '&';
    return `${result}${prefix}${key}=${value}`;
  },
  '');

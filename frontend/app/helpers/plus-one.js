import { helper } from '@ember/component/helper';

export function plusOne(params/*, hash*/) {
  return parseInt(params) + 1;
}

export default helper(plusOne);

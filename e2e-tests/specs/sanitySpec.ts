import { expect } from 'chai';
import { describeCommon } from '../TestHelper';

describeCommon('Sanity', () => {
  it('Sanity test', () => {
    console.log('sanity');
    expect(true).to.equal(true);
  });
});

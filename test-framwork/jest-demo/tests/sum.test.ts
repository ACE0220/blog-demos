import { describe, expect, it } from '@jest/globals';
import { sum } from '../src/index';

describe('sum test', () => {
  it('add 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

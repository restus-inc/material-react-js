/* global describe, it, expect */
import { newId, handlerName } from '../lib/utils';

describe('function: newId', () => {
  it('generates a rundom id', () => {
    [...Array(200).keys()].forEach(() => {
      expect(newId()).toMatch(/^[a-z][0-9a-z]{7}$/);
    });

    [...Array(200).keys()].forEach(() => {
      expect(newId(4)).toMatch(/^[a-z][0-9a-z]{3}$/);
    });
  });
});

describe('function: handlerName', () => {
  it('converts event name to handler name', () => {
    expect(handlerName('closing')).toBe('onClosing');
  });
});

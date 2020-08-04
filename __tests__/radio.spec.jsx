/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import Radio from '../lib/radio';

jest.mock('@material/radio');
jest.mock('@material/form-field');

describe('Radio component', () => {
  it('supports radio button', () => {
    let component = renderer.create(
      <Radio/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Radio className="baz" disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Radio id="foo" label="bar" checked={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Radio label="bar" className="baz" name="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Radio id="foo" label="bar" className="baz" name="qux" disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports touch target', () => {
    let component = renderer.create(
      <Radio supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Radio className="baz" disabled={true} supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Radio id="foo" label="bar" checked={true} supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Radio label="bar" className="baz" name="qux" supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Radio id="foo" label="bar" className="baz" name="qux" disabled={true} supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

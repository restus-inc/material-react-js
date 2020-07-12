/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import Checkbox from '../lib/checkbox';

jest.mock('@material/checkbox');
jest.mock('@material/form-field');

describe('Checkbox component', () => {
  it('supports checkbox', () => {
    let component = renderer.create(
      <Checkbox/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Checkbox className="baz" disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Checkbox id="foo" label="bar" checked={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Checkbox label="bar" className="baz" indeterminate={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Checkbox id="foo" label="bar" className="baz" disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports touch target', () => {
    let component = renderer.create(
      <Checkbox supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Checkbox className="baz" disabled={true} supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Checkbox id="foo" label="bar" checked={true} supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Checkbox label="bar" className="baz" indeterminate={true} supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Checkbox id="foo" label="bar" className="baz" disabled={true} supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

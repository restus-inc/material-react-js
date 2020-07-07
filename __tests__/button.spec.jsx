/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../lib/button';

jest.mock('@material/ripple');

describe('Button component', () => {
  it('supports text buttons', () => {
    let component = renderer.create(
      <Button label="foo"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Button label="foo" icon="favorite" supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Button label="foo" className="bar" iconClassName="fa fa-aws"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Button variation="text" label="foo" icon="favorite" disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports outlined buttons', () => {
    let component = renderer.create(
      <Button variation='outlined' label="foo"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Button variation='outlined' label="foo" icon="favorite" supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Button variation='outlined' label="foo" className="bar" iconClassName="fa fa-aws" disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports contained buttons', () => {
    let component = renderer.create(
      <Button variation='contained' label="foo"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Button variation='contained' label="foo" icon="favorite" supportsTouch={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Button variation='contained' label="foo" className="bar" iconClassName="fa fa-aws" disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

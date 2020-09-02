/* global describe, it, expect */
import 'regenerator-runtime/runtime';
import React from 'react';
import { htmlOfRendering } from './utils';

import Button from '../lib/button';

describe('Button component', () => {
  it('supports text buttons', () => {
    expect(htmlOfRendering(
      <Button label="foo"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button type="button" label="foo" icon="favorite" supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button label="foo" className="bar" iconClassName="fa fa-aws"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button type="reset" variation="text" label="foo" icon="favorite" disabled={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports outlined buttons', () => {
    expect(htmlOfRendering(
      <Button variation='outlined' label="foo"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button type="button" variation='outlined' label="foo" icon="favorite" supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button variation='outlined' label="foo" className="bar" iconClassName="fa fa-aws" disabled={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports contained buttons', () => {
    expect(htmlOfRendering(
      <Button variation='contained' label="foo"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button type="button" variation='contained' label="foo" icon="favorite" supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button variation='contained' label="foo" className="bar" iconClassName="fa fa-aws" disabled={true}/>,
    )).resolves.toMatchSnapshot();
  });
});

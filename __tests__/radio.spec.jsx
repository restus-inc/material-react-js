/* global describe, it, expect */
import 'regenerator-runtime/runtime';
import React from 'react';
import { htmlOfRendering } from './utils';

import Radio from '../lib/radio';

describe('Radio component', () => {
  it('supports radio button', () => {
    expect(htmlOfRendering(
      <Radio/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Radio className="baz" disabled={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Radio id="foo" label="bar" defaultChecked={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Radio label="bar" className="baz" name="qux"/>,
    )).resolves.toMatchSnapshot();

    const props = { checked: true };
    function onChange(event) {
      props.checked = event.currentTarget.checked;
    }
    expect(htmlOfRendering(
      <Radio id="foo" label="bar" className="baz" name="qux" checked={props.checked} onChange={onChange}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports touch target', () => {
    expect(htmlOfRendering(
      <Radio supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Radio className="baz" disabled={true} supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Radio id="foo" label="bar" defaultChecked={true} supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Radio label="bar" className="baz" name="qux" supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    const props = { checked: true };
    function onChange(event) {
      props.checked = event.currentTarget.checked;
    }
    expect(htmlOfRendering(
      <Radio id="foo" label="bar" className="baz" name="qux" checked={props.checked} onChange={onChange} supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();
  });
});

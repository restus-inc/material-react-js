/**
 * @license
 * Copyright 2020 Restus Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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

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

import Checkbox from '../lib/checkbox';

describe('Checkbox component', () => {
  it('supports checkbox', async () => {
    expect(htmlOfRendering(
      <Checkbox/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Checkbox className="baz" disabled={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Checkbox id="foo" label="bar" defaultChecked={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Checkbox label="bar" className="baz" indeterminate={true}/>,
    )).resolves.toMatchSnapshot();

    const props = { checked: true };
    function onChange(event) {
      props.checked = event.currentTarget.checked;
    }
    expect(htmlOfRendering(
      <Checkbox id="foo" label="bar" className="baz" checked={props.checked} onChange={onChange}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports touch target', () => {
    expect(htmlOfRendering(
      <Checkbox supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Checkbox className="baz" disabled={true} supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Checkbox id="foo" label="bar" defaultChecked={true} supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Checkbox label="bar" className="baz" indeterminate={true} supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    const props = { checked: true };
    function onChange(event) {
      props.checked = event.currentTarget.checked;
    }
    expect(htmlOfRendering(
      <Checkbox id="foo" label="bar" className="baz" checked={props.checked} onChange={onChange} supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();
  });
});

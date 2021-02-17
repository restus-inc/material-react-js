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

/* global describe, afterEach, it, expect */
import 'regenerator-runtime/runtime';
import React, { useEffect, useRef } from 'react';
import { MDCRadio } from '@material/radio';
import { MDCFormField } from '@material/form-field';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { htmlOfRendering } from './utils';

import Radio from '../lib/radio';

describe('Radio component', () => {
  afterEach(async () => {
    await cleanup();
  });

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

  it('can provide an MDCRadio instance', async () => {
    let mdcRadioComponent;
    let mdcFormFieldComponent;
    function MyRadio() {
      const mdcRadioRef = useRef();
      const mdcFormFieldRef = useRef();
      useEffect(() => {
        mdcRadioComponent = mdcRadioRef.current;
        mdcFormFieldComponent = mdcFormFieldRef.current;
      });
      return <Radio id="my-radio" label="Radio" mdcRadioRef={mdcRadioRef} mdcFormFieldRef={mdcFormFieldRef}/>;
    }
    render(<MyRadio/>);
    expect(mdcRadioComponent).toBeInstanceOf(MDCRadio);
    expect(mdcFormFieldComponent).toBeInstanceOf(MDCFormField);
    expect(mdcFormFieldComponent.input).toBe(mdcRadioComponent);
  });

  it('can be manipulated via MDCRadio', async () => {
    function RadioTester() {
      const mdcRadioRef = useRef();
      function toggleRadio() {
        mdcRadioRef.current.checked = !mdcRadioRef.current.checked;
      }
      return (
         <>
          <Radio id="my-radio" label="Radio" mdcRadioRef={mdcRadioRef} data-testid="my-radio"/>
          <button type="button" onClick={toggleRadio}>toggle</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<RadioTester/>);
    const nativeRadio = getByTestId('my-radio');
    const button = getByText('toggle');

    expect(nativeRadio.checked).toBe(false);
    userEvent.click(button);
    expect(nativeRadio.checked).toBe(true);
    userEvent.click(button);
    expect(nativeRadio.checked).toBe(false);
  });
});

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
import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { htmlOfRendering } from './utils';

import Checkbox from '../lib/checkbox';

describe('Checkbox component', () => {
  afterEach(async () => {
    await cleanup();
  });

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

  it('can provide an MDCCheckbox instance', async () => {
    let mdcCheckboxComponent;
    let mdcFormFieldComponent;
    function MyCheckbox() {
      const mdcCheckboxRef = useRef();
      const mdcFormFieldRef = useRef();
      useEffect(() => {
        mdcCheckboxComponent = mdcCheckboxRef.current;
        mdcFormFieldComponent = mdcFormFieldRef.current;
      });
      return <Checkbox id="my-checkbox" label="Check" mdcCheckboxRef={mdcCheckboxRef} mdcFormFieldRef={mdcFormFieldRef}/>;
    }
    render(<MyCheckbox/>);
    expect(mdcCheckboxComponent).toBeInstanceOf(MDCCheckbox);
    expect(mdcFormFieldComponent).toBeInstanceOf(MDCFormField);
    expect(mdcFormFieldComponent.input).toBe(mdcCheckboxComponent);
  });

  it('can be manipulated via MDCCheckbox', async () => {
    function CheckboxTester() {
      const mdcCheckboxRef = useRef();
      function toggleCheckbox() {
        mdcCheckboxRef.current.checked = !mdcCheckboxRef.current.checked;
      }
      return (
         <>
          <Checkbox id="my-checkbox" label="Check" mdcCheckboxRef={mdcCheckboxRef} data-testid="my-checkbox"/>
          <button type="button" onClick={toggleCheckbox}>toggle</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<CheckboxTester/>);
    const nativeCheckbox = getByTestId('my-checkbox');
    const button = getByText('toggle');

    expect(nativeCheckbox.checked).toBe(false);
    userEvent.click(button);
    expect(nativeCheckbox.checked).toBe(true);
    userEvent.click(button);
    expect(nativeCheckbox.checked).toBe(false);
  });
});

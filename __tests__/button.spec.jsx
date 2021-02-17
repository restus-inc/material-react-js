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
import { MDCRipple } from '@material/ripple';
import { render, cleanup } from '@testing-library/react';
import { htmlOfRendering } from './utils';

import Button from '../lib/button';

describe('Button component', () => {
  afterEach(async () => {
    await cleanup();
  });

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
      <Button variation="outlined" label="foo"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button type="button" variation="outlined" label="foo" icon="favorite" supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button variation="outlined" label="foo" className="bar" iconClassName="fa fa-aws" disabled={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports contained buttons', () => {
    expect(htmlOfRendering(
      <Button variation="contained" label="foo"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button type="button" variation="contained" label="foo" icon="favorite" supportsTouch={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Button variation="contained" label="foo" className="bar" iconClassName="fa fa-aws" disabled={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('can provide an MDCRipple instance', async () => {
    let mdcRippleComponent;
    function MyButton() {
      const mdcRippleRef = useRef();
      useEffect(() => {
        mdcRippleComponent = mdcRippleRef.current;
      });
      return <Button label="foo" mdcRippleRef={mdcRippleRef}/>;
    }
    render(<MyButton/>);
    expect(mdcRippleComponent).toBeInstanceOf(MDCRipple);
  });
});

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

/* global jest describe, beforeEach, afterEach, it, expect */
import 'regenerator-runtime/runtime';
import React, { useEffect, useRef } from 'react';
import { render, cleanup } from '@testing-library/react';
import { MDCTooltip } from '@material/tooltip';
import { htmlOfDocumentBody } from './utils';

import Tooltip from '../lib/tooltip';
import Button from '../lib/button';

describe('Tooltip component', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.012345);
  });

  afterEach(async () => {
    jest.spyOn(global.Math, 'random').mockRestore();
    await cleanup();
  });

  it('supports plain tooltip for a single React element', () => {
    expect(htmlOfDocumentBody(
      <Tooltip text="foo" id="baz">
        <button>button</button>
      </Tooltip>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfDocumentBody(
      <Tooltip text={<>foo<br/>bar</>} className="qux">
        <Button label="button"/>
      </Tooltip>,
    )).resolves.toMatchSnapshot();
  });

  it('supports plain tooltip for multiple elements', () => {
    expect(htmlOfDocumentBody(
      <Tooltip text="foo" id="baz">
        <button>button1</button>
        <button>button2</button>
      </Tooltip>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfDocumentBody(
      <Tooltip text={<>foo<br/>bar</>} className="qux">
        text element
        <button>button2</button>
      </Tooltip>,
    )).resolves.toMatchSnapshot();
  });

  it('supports plain tooltip for a text elementa', () => {
    expect(htmlOfDocumentBody(
      <Tooltip text="foo" id="baz">
        text element
      </Tooltip>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfDocumentBody(
      <Tooltip text={<>foo<br/>bar</>} className="qux">
        text element
      </Tooltip>,
    )).resolves.toMatchSnapshot();
  });

  it('can provide an MDCTooltip instance', async () => {
    let mdcTooltipComponent;
    function MyTooltip() {
      const mdcTooltipRef = useRef();
      useEffect(() => {
        mdcTooltipComponent = mdcTooltipRef.current;
      });
      return <Tooltip text="foo" mdcTooltipRef={mdcTooltipRef}><button>button</button></Tooltip>;
    }
    render(<MyTooltip/>);
    expect(mdcTooltipComponent).toBeInstanceOf(MDCTooltip);
  });
});

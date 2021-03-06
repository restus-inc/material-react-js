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

/* global describe afterEach, it, expect, */
import 'regenerator-runtime/runtime';
import React, { useEffect, useRef } from 'react';
import { MDCRipple } from '@material/ripple';
import { render, cleanup } from '@testing-library/react';
import { htmlOfRendering } from './utils';

import IconButton from '../lib/icon-button';

describe('IconButton component', () => {
  afterEach(async () => {
    await cleanup();
  });

  it('supports material icon buttons', () => {
    expect(htmlOfRendering(
      <IconButton className="material-icons" icon="favorite"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <IconButton className="material-icons">favorite</IconButton>,
    )).resolves.toMatchSnapshot();
  });

  it('supports image icon buttons', () => {
    expect(htmlOfRendering(
      <IconButton><img src="./img/favorite.png" alt="favorite"/></IconButton>,
    )).resolves.toMatchSnapshot();
  });

  it('supports SVG icon buttons', () => {
    expect(htmlOfRendering(
      <IconButton className="foo">
        <svg viewBox="0 0 32 32">
          <circle cx="15" cy="15" r="15" stroke="none" fill="black"/>
        </svg>
      </IconButton>,
    )).resolves.toMatchSnapshot();
  });

  it('can provide an MDCRipple instance', async () => {
    let mdcRippleComponent;
    function MyIconButton() {
      const mdcRippleRef = useRef();
      useEffect(() => {
        mdcRippleComponent = mdcRippleRef.current;
      });
      return <IconButton className="material-icons" icon="favorite" mdcRippleRef={mdcRippleRef}/>;
    }
    render(<MyIconButton/>);
    expect(mdcRippleComponent).toBeInstanceOf(MDCRipple);
  });
});

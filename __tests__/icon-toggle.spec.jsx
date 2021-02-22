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

/* global jest, describe, afterEach, it, expect */
import 'regenerator-runtime/runtime';
import React, { useEffect, useRef } from 'react';
import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCRipple } from '@material/ripple';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { htmlOfRendering } from './utils';

import IconToggle from '../lib/icon-toggle';

describe('IconToggle component', () => {
  afterEach(async () => {
    await cleanup();
  });

  it('supports material icon toggle buttons', () => {
    expect(htmlOfRendering(
      <IconToggle iconClassName="material-icons" onIcon="visibility" offIcon="visibility_off" label="visibility"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <IconToggle iconClassName="material-icons" onIcon="visibility" offIcon="visibility_off" label={['off', 'on']}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <IconToggle isOnState={true} className="foo" label="visibility">
        <IconToggle.OffIcon className="material-icons">visibility_off</IconToggle.OffIcon>
        <IconToggle.OnIcon className="material-icons">visibility</IconToggle.OnIcon>
      </IconToggle>,
    )).resolves.toMatchSnapshot();
  });

  it('supports image icon toggle buttons', () => {
    expect(htmlOfRendering(
      <IconToggle className="foo" label={['off', 'on']}>
        <IconToggle.OffImage src="./img/visibility_off.png" alt="visibility_off"/>
        <IconToggle.OnImage className="bar" src="./img/visibility.png" alt="visibility"/>
      </IconToggle>,
    )).resolves.toMatchSnapshot();
  });

  it('supports SVG icon toggle buttons', () => {
    expect(htmlOfRendering(
      <IconToggle isOnState={true} className="foo" label={['off', 'on']}>
        <IconToggle.OffSVG className="bar" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" strokeWidth="2"/>
        </IconToggle.OffSVG>
        <IconToggle.OnSVG className="baz" viewBox="0 0 24 24">
          <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2"/>
        </IconToggle.OnSVG>
      </IconToggle>,
    )).resolves.toMatchSnapshot();
  });

  it('can provide an MDCIconButtonToggle instance', async () => {
    let mdcIconButtonToggleComponent;
    let mdcRippleComponent;
    function MyIconButtonToggle() {
      const mdcIconButtonToggleRef = useRef();
      const mdcRippleRef = useRef();
      useEffect(() => {
        mdcIconButtonToggleComponent = mdcIconButtonToggleRef.current;
        mdcRippleComponent = mdcRippleRef.current;
      });
      return <IconToggle iconClassName="material-icons"
                         onIcon="visibility" offIcon="visibility_off"
                         mdcIconButtonToggleRef={mdcIconButtonToggleRef}
                         mdcRippleRef={mdcRippleRef}/>;
    }
    render(<MyIconButtonToggle/>);
    expect(mdcIconButtonToggleComponent).toBeInstanceOf(MDCIconButtonToggle);
    expect(mdcRippleComponent).toBeInstanceOf(MDCRipple);
  });

  it('fires onChange event when the icon is toggled', async () => {
    let eventDetail = null;
    const onChange = jest.fn((event) => {
      eventDetail = event.detail;
    });

    const { getByTestId } = render(
      <IconToggle iconClassName="material-icons" onIcon="visibility" offIcon="visibility_off" label="visibility" onChange={onChange} data-testid="toggle"/>,
    );
    const toggleButton = getByTestId('toggle');
    expect(toggleButton.classList).not.toContain('mdc-icon-button--on');
    userEvent.click(getByTestId('toggle'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(eventDetail).toEqual({ isOn: true });
    expect(toggleButton.classList).toContain('mdc-icon-button--on');
    userEvent.click(getByTestId('toggle'));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(eventDetail).toEqual({ isOn: false });
    expect(toggleButton.classList).not.toContain('mdc-icon-button--on');
  });
});

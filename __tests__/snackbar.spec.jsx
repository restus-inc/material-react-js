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
import React, { useState } from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { htmlOfRendering, getByOpenedSnackbar } from './utils';

import Snackbar from '../lib/snackbar';

describe('Snackbar component', () => {
  afterEach(async () => {
    await cleanup();
  });

  it('supports snackbar without action button', () => {
    expect(htmlOfRendering(
      <Snackbar message="foo"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Snackbar message="foo" className="baz" isLeading={true} onClosed={() => {}}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports snackbar with action button', () => {
    expect(htmlOfRendering(
      <Snackbar label="foo" actionLabel="bar"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Snackbar label="foo" actionLabel="bar" className="baz" isStacked={true} onClosing={() => {}}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Snackbar label="foo" actionLabel="bar" isLeading={true} onClosed={() => {}}/>,
    )).resolves.toMatchSnapshot();
  });

  it('opens when isOpen property changes to true', async () => {
    let reasonForClosing;
    const onOpening = jest.fn();
    const onOpened = jest.fn();
    const onClosing = jest.fn((event) => { reasonForClosing = event.detail.reason; });
    const onClosed = jest.fn((event) => { reasonForClosing = event.detail.reason; });
    function SnackbarTester() {
      const [isOpen, setOpenStatus] = useState(false);
      return (
        <div>
          <button onClick={() => setOpenStatus(true)}>open</button>
          <button onClick={() => setOpenStatus(false)}>close</button>
          <Snackbar message="foo" isOpen={isOpen}
                    onOpening={onOpening}
                    onOpened={onOpened}
                    onClosing={onClosing}
                    onClosed={(event) => { setOpenStatus(false); onClosed(event); }}/>
        </div>
      );
    }

    const { getByText } = render(<SnackbarTester/>);
    const openButton = getByText('open');
    const colseButton = getByText('close');

    expect(() => { getByOpenedSnackbar(); }).toThrow('Unable to find an opened snackbar');
    expect(onOpening).not.toHaveBeenCalled();

    userEvent.click(openButton);
    expect(onOpening).toHaveBeenCalledTimes(1);
    expect(onOpened).not.toHaveBeenCalled();
    await waitFor(() => expect(onOpened).toHaveBeenCalledTimes(1));
    expect(onClosing).not.toHaveBeenCalled();
    expect(getByOpenedSnackbar()).toBeTruthy();

    userEvent.click(colseButton);
    expect(onClosing).toHaveBeenCalledTimes(1);
    expect(reasonForClosing).toBeUndefined();
    expect(onClosed).not.toHaveBeenCalled();
    await waitFor(() => expect(onClosed).toHaveBeenCalledTimes(1));
    expect(reasonForClosing).toBeUndefined();
    expect(() => { getByOpenedSnackbar(); }).toThrow('Unable to find an opened snackbar');

    expect(onOpening).toHaveBeenCalledTimes(1);
    userEvent.click(openButton);
    expect(onOpening).toHaveBeenCalledTimes(2);
    expect(onOpened).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(onOpened).toHaveBeenCalledTimes(2));
    expect(onClosing).toHaveBeenCalledTimes(1);
    expect(getByOpenedSnackbar()).toBeTruthy();

    // Snackbar will close automatically after 5000ms.
    await waitFor(() => expect(onClosing).toHaveBeenCalledTimes(2), { timeout: 6000 });
    expect(reasonForClosing).toBe('dismiss');
    expect(onClosed).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(onClosed).toHaveBeenCalledTimes(2));
    expect(reasonForClosing).toBe('dismiss');
    expect(onOpening).toHaveBeenCalledTimes(2);
    expect(onOpened).toHaveBeenCalledTimes(2);
    expect(onClosing).toHaveBeenCalledTimes(2);
    expect(() => { getByOpenedSnackbar(); }).toThrow('Unable to find an opened snackbar');
  }, 7000);
});

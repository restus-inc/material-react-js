/* global jest, describe, afterEach, it, expect */
/* eslint object-curly-newline: ["error", { "minProperties": 5 }] */
import 'regenerator-runtime/runtime';
import React, { useState } from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { htmlOfRendering, getByOpenedDialog, getByDialogButton, getByDialogScrim } from './utils';

import Dialog from '../lib/dialog';

describe('Dialog component', () => {
  afterEach(async () => {
    await cleanup();
  });

  it('supports confirmation dialogs', () => {
    let buttons = [{ action: 'ok', label: 'OK', isDefault: true }];
    expect(htmlOfRendering((
      <Dialog title="foo" buttons={buttons} onClosed={() => {}}>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </Dialog>
    ))).resolves.toMatchSnapshot();

    buttons = [
      { action: 'cancel', label: 'Cancel', isDefault: true },
      { action: 'ok', label: 'OK' },
    ];
    expect(htmlOfRendering((
      <Dialog title="foo" className="bar" buttons={buttons} onClosing={() => {}}>
        <ol>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ol>
      </Dialog>
    ))).resolves.toMatchSnapshot();
  });

  it('opens when isOpen property changes to true', async () => {
    let actionForClosing;
    const onOpening = jest.fn();
    const onOpened = jest.fn();
    const onClosing = jest.fn((event) => { actionForClosing = event.detail.action; });
    const onClosed = jest.fn((event) => { actionForClosing = event.detail.action; });
    const buttons = [
      { action: 'cancel', label: 'Cancel', isDefault: true },
      { action: 'ok', label: 'OK' },
    ];
    function DialogTester() {
      const [isOpen, setOpenStatus] = useState(false);
      return (
        <div>
          <button onClick={() => setOpenStatus(true)}>open</button>
          <Dialog title="foo" buttons={buttons} isOpen={isOpen}
                  onOpening={onOpening}
                  onOpened={onOpened}
                  onClosing={onClosing}
                  onClosed={(event) => { setOpenStatus(false); onClosed(event); }}>
            <ul>
              <li>one</li>
              <li>two</li>
              <li>three</li>
            </ul>
          </Dialog>
        </div>
      );
    }

    const { container, getByText } = render(<DialogTester/>);
    const openButton = getByText('open');
    const okButton = getByDialogButton(container, 'ok');
    const cancelButton = getByDialogButton(container, 'cancel');
    const scrim = getByDialogScrim(container);
    // An error occurs if the following function is mocked.
    okButton.getBoundingClientRect = jest.fn(() => ({ width: 100 }));

    expect(() => { getByOpenedDialog(); }).toThrow('Unable to find an opened dialog');
    expect(onOpening).not.toHaveBeenCalled();

    userEvent.click(openButton);
    expect(onOpening).toHaveBeenCalledTimes(1);
    expect(onOpened).not.toHaveBeenCalled();
    await waitFor(() => expect(onOpened).toHaveBeenCalledTimes(1));
    expect(onClosing).not.toHaveBeenCalled();
    expect(getByOpenedDialog()).toBeTruthy();

    userEvent.click(okButton);
    expect(onClosing).toHaveBeenCalledTimes(1);
    expect(actionForClosing).toBe('ok');
    expect(onClosed).not.toHaveBeenCalled();
    await waitFor(() => expect(onClosed).toHaveBeenCalledTimes(1));
    expect(actionForClosing).toBe('ok');
    expect(() => { getByOpenedDialog(); }).toThrow('Unable to find an opened dialog');

    expect(onOpening).toHaveBeenCalledTimes(1);
    userEvent.click(openButton);
    expect(onOpening).toHaveBeenCalledTimes(2);
    expect(onOpened).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(onOpened).toHaveBeenCalledTimes(2));
    expect(getByOpenedDialog()).toBeTruthy();

    expect(onClosing).toHaveBeenCalledTimes(1);
    userEvent.click(cancelButton);
    expect(onClosing).toHaveBeenCalledTimes(2);
    expect(actionForClosing).toBe('cancel');
    expect(onClosed).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(onClosed).toHaveBeenCalledTimes(2));
    expect(actionForClosing).toBe('cancel');
    expect(onOpening).toHaveBeenCalledTimes(2);
    expect(onOpened).toHaveBeenCalledTimes(2);
    expect(onClosing).toHaveBeenCalledTimes(2);
    expect(() => { getByOpenedDialog(); }).toThrow('Unable to find an opened dialog');

    userEvent.click(openButton);
    await waitFor(() => expect(onOpened).toHaveBeenCalledTimes(3));
    userEvent.click(scrim);
    expect(onClosing).toHaveBeenCalledTimes(3);
    expect(actionForClosing).toBe('close');
    expect(onClosed).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(onClosed).toHaveBeenCalledTimes(3));
    expect(actionForClosing).toBe('close');
  });
});

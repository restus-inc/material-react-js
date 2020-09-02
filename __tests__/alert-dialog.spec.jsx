/* global describe, it, expect */
import 'regenerator-runtime/runtime';
import React from 'react';
import { htmlOfRendering } from './utils';

import AlertDialog from '../lib/alert-dialog';

describe('AlertDialog component', () => {
  it('supports simple dialogs', () => {
    let buttons = [{ action: 'ok', label: 'OK', isDefault: true }];
    expect(htmlOfRendering(
      <AlertDialog content="foo" buttons={buttons} onClosed={() => {}}/>,
    )).resolves.toMatchSnapshot();

    buttons = [
      { action: 'cancel', label: 'Cancel', isDefault: true },
      { action: 'ok', label: 'OK' },
    ];
    expect(htmlOfRendering(
      <AlertDialog content="foo" className="bar" buttons={buttons} onClosing={() => {}}/>,
    )).resolves.toMatchSnapshot();
  });
});

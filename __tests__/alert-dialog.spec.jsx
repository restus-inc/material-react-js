/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import AlertDialog from '../lib/alert-dialog';

jest.mock('@material/dialog');

describe('AlertDialog component', () => {
  it('supports simple dialogs', () => {
    let buttons = [{ action: 'ok', label: 'OK', isDefault: true }];
    let component = renderer.create(
      <AlertDialog message="foo" buttons={buttons} onClosed={() => {}}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    buttons = [
      { action: 'cancel', label: 'Cancel', isDefault: true },
      { action: 'ok', label: 'OK' },
    ];
    component = renderer.create(
      <AlertDialog message="foo" className="bar" buttons={buttons} onClosing={() => {}}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import Dialog from '../lib/dialog';

jest.mock('@material/dialog');

describe('Dialog component', () => {
  it('supports confirmation dialogs', () => {
    let buttons = [{ action: 'ok', label: 'OK', isDefault: true }];
    let component = renderer.create(
      <Dialog title="foo" buttons={buttons} onClosed={() => {}}>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ul>
      </Dialog>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    buttons = [
      { action: 'cancel', label: 'Cancel', isDefault: true },
      { action: 'ok', label: 'OK' },
    ];
    component = renderer.create(
      <Dialog title="foo" className="bar" buttons={buttons} onClosing={() => {}}>
        <ol>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ol>
      </Dialog>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

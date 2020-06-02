/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import Snackbar from '../lib/snackbar';

jest.mock('@material/snackbar');

describe('Snackbar component', () => {
  it('supports snackbar without action button', () => {
    let component = renderer.create(
      <Snackbar message="foo"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Snackbar message="foo" isLeading={true} onClosed={() => {}}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports snackbar with action button', () => {
    let component = renderer.create(
      <Snackbar label="foo" actionLabel="bar"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Snackbar label="foo" actionLabel="bar" isStacked={true} onClosing={() => {}}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Snackbar label="foo" actionLabel="bar" isLeading={true} onClosed={() => {}}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

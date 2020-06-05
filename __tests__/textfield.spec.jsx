/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import TextField from '../lib/textfield';

jest.mock('../lib/utils');
jest.mock('@material/textfield');

describe('TextField component', () => {
  it('supports filled text fields', () => {
    let component = renderer.create(
      <TextField/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField label="foo" placeholder="bar" require={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField label="foo" id="bar" defaultValue="baz" pattern="[a-z]*"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="filled" label="foo" id="bar" defaultValue="baz"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField helperText="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField label="foo" placeholder="bar" require={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField label="foo" id="bar" defaultValue="baz" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports outlined text fields', () => {
    let component = renderer.create(
      <TextField variation='outlined'/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='outlined' label="foo" placeholder="bar" require={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='outlined' label="foo" id="bar" defaultValue="baz" pattern="[a-z]*"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='outlined' helperText="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='outlined' label="foo" placeholder="bar" require={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='outlined' label="foo" id="bar" defaultValue="baz" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports outlined textareas', () => {
    let component = renderer.create(
      <TextField variation='textarea'/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='textarea' placeholder="bar" require={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='textarea' id="bar" defaultValue="baz" pattern="[a-z]*" rows={6} cols={40}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='textarea' helperText="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='textarea' label="foo" placeholder="bar" require={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation='textarea' label="foo" id="bar" defaultValue="baz" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

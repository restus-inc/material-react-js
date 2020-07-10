/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import TextField from '../lib/textfield';

jest.mock('@material/textfield');

describe('TextField component', () => {
  it('supports filled text fields', () => {
    let component = renderer.create(
      <TextField/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField label="foo" placeholder="bar" required={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*"/>,
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
      <TextField label="foo" placeholder="bar" required={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports outlined text fields', () => {
    let component = renderer.create(
      <TextField variation="outlined"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="outlined" label="foo" placeholder="bar" required={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="outlined" label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="outlined" helperText="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="outlined" label="foo" placeholder="bar" required={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="outlined" label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports outlined textareas', () => {
    let component = renderer.create(
      <TextField variation="textarea"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="textarea" resizable={true} placeholder="bar" required={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="textarea" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" rows={6} cols={40}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="textarea" resizable={true} helperText="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="textarea" label="foo" placeholder="bar" required={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="textarea" label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports filled textareas', () => {
    let component = renderer.create(
      <TextField variation="filled-textarea"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="filled-textarea" resizable={true} placeholder="bar" required={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="filled-textarea" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" rows={6} cols={40}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="filled-textarea" resizable={true} helperText="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="filled-textarea" label="foo" placeholder="bar" required={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <TextField variation="filled-textarea" label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

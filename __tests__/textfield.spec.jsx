/* global describe, it, expect */
import 'regenerator-runtime/runtime';
import React from 'react';
import { htmlOfRendering } from './utils';

import TextField from '../lib/textfield';

describe('TextField component', () => {
  it('supports filled text fields', () => {
    expect(htmlOfRendering(
      <TextField/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField label="foo" placeholder="bar" required={true} disabled={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="filled" label="foo" id="bar" defaultValue="baz"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField helperText="qux"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField label="foo" placeholder="bar" required={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports outlined text fields', () => {
    expect(htmlOfRendering(
      <TextField variation="outlined"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="outlined" label="foo" placeholder="bar" required={true} disabled={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="outlined" label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="outlined" helperText="qux"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="outlined" label="foo" placeholder="bar" required={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="outlined" label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports outlined textareas', () => {
    expect(htmlOfRendering(
      <TextField variation="textarea"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="textarea" resizable={true} placeholder="bar" required={true} disabled={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="textarea" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" rows={6} cols={40}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="textarea" resizable={true} helperText="qux"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="textarea" label="foo" placeholder="bar" required={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="textarea" label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports filled textareas', () => {
    expect(htmlOfRendering(
      <TextField variation="filled-textarea"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="filled-textarea" resizable={true} placeholder="bar" required={true} disabled={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="filled-textarea" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" rows={6} cols={40}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="filled-textarea" resizable={true} helperText="qux"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="filled-textarea" label="foo" placeholder="bar" required={true} disabled={true} helperText="qux" showsHelperPersistently={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <TextField variation="filled-textarea" label="foo" id="bar" defaultValue="baz" className="qux" pattern="[a-z]*" helperText="qux" showsHelperAsValidation={true}/>,
    )).resolves.toMatchSnapshot();
  });
});

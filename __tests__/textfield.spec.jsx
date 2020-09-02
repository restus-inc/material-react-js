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

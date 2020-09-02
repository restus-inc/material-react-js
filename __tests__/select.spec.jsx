/* global jest, describe, afterEach, it, expect */
import 'regenerator-runtime/runtime';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { htmlOfRendering, findByOpenedMenu, getByMenuItem } from './utils';

import Select from '../lib/select';

describe('Select component', () => {
  afterEach(async () => {
    await cleanup();
  });

  it('supports filled select', () => {
    expect(htmlOfRendering(
      <Select items={['one', 'two', 'three']}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Select label="foo" items={['one', 'two', 'three']} required={true} disabled={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Select label="foo" id="bar" items={['one', 'two', 'three']} value="two" className="qux"/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Select variation="filled" label="foo" items={['one', 'two', 'three']} required={true} disabled={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports outlined select', () => {
    expect(htmlOfRendering(
      <Select variation="outlined" items={['one', 'two', 'three']}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Select variation="outlined" label="foo" items={['one', 'two', 'three']} required={true} disabled={true}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <Select variation="outlined" label="foo" id="bar" items={['one', 'two', 'three']} value="two" className="qux"/>,
    )).resolves.toMatchSnapshot();
  });

  it('allow to set objects as items', () => {
    const items = [
      { key: '1', value: 'one' },
      { key: '2', value: 'two' },
      { key: '3', value: 'three' },
    ];

    expect(htmlOfRendering(
      // Selected value is 'two'.
      <Select label="foo" items={items} value="2" itemsValueAttr="key" itemsTextAttr="value" />,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      // Selected value is 'two', which has index: 1.
      <Select label="foo" items={items} value="1" itemsTextAttr="value" />,
    )).resolves.toMatchSnapshot();
  });

  it('fires onChange event when the value is changed', async () => {
    let eventDetail = null;
    const onChange = jest.fn((event) => {
      eventDetail = event.detail;
    });

    const { getByRole } = render(
      <Select items={['one', 'two', 'three']} onChange={onChange}/>,
    );
    userEvent.click(getByRole('button'));
    await findByOpenedMenu(document.body);
    userEvent.click(getByMenuItem(document.body, 'two'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(eventDetail).toEqual({ value: 'two', index: 1 });
  });
});

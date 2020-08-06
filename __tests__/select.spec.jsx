/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import Select from '../lib/select';

jest.mock('@material/select');

describe('Select component', () => {
  it('supports filled select', () => {
    let component = renderer.create(
      <Select items={['one', 'two', 'three']}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Select label="foo" items={['one', 'two', 'three']} required={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Select label="foo" id="bar" items={['one', 'two', 'three']} value="baz" className="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Select variation="filled" label="foo" items={['one', 'two', 'three']} required={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('supports outlined select', () => {
    let component = renderer.create(
      <Select variation="outlined" items={['one', 'two', 'three']}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Select variation="outlined" label="foo" items={['one', 'two', 'three']} required={true} disabled={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Select variation="outlined" label="foo" id="bar" items={['one', 'two', 'three']} value="baz" className="qux"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('allow to set objects as items', () => {
    const items = [
      { key: '1', value: 'one' },
      { key: '2', value: 'two' },
      { key: '3', value: 'three' },
    ];
    let component = renderer.create(
      <Select label="foo" items={items} value="1" itemsValueAttr="key" itemsTextAttr="value" />,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <Select label="foo" items={items} value="0" itemsTextAttr="value" />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

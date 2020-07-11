/* global jest, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import Tab from '../lib/tab';
import TabBar from '../lib/tab-bar';

jest.mock('@material/tab');
jest.mock('@material/tab-bar');

describe('Tab and TabBar component', () => {
  it('render tab control', () => {
    let component = renderer.create((
      <TabBar>
        <Tab label="foo" active={true}/>
        <Tab label="bar"/>
        <Tab label="baz"/>
      </TabBar>
    ));
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create((
      <TabBar className="tab-bar" onActivated={() => {}}>
        <Tab label="foo" className="tab" icon="grade" iconClassName="icon" />
        <Tab label="bar" icon="favorite"/>
        <Tab label="baz" className="tab" active={true}/>
      </TabBar>
    ));
    expect(component.toJSON()).toMatchSnapshot();
  });
});

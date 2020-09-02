/* global jest, describe, afterEach, it, expect */
import 'regenerator-runtime/runtime';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { htmlOfRendering } from './utils';

import Tab from '../lib/tab';
import TabBar from '../lib/tab-bar';

describe('Tab and TabBar component', () => {
  afterEach(async () => {
    await cleanup();
  });

  it('render tab control', () => {
    expect(htmlOfRendering((
      <TabBar>
        <Tab label="foo" active={true}/>
        <Tab label="bar"/>
        <Tab label="baz"/>
      </TabBar>
    ))).resolves.toMatchSnapshot();

    expect(htmlOfRendering((
      <TabBar className="tab-bar">
        <Tab label="foo" className="tab" icon="grade" iconClassName="icon" />
        <Tab label="bar" icon="favorite"/>
        <Tab label="baz" className="tab" active={true}/>
      </TabBar>
    ))).resolves.toMatchSnapshot();
  });

  it('fires onActivated event when the tab is activated', () => {
    let eventDetail = null;
    const onActivated = jest.fn((event) => {
      eventDetail = event.detail;
    });

    const { getAllByRole } = render((
      <TabBar onActivated={onActivated}>
        <Tab label="foo" active={true}/>
        <Tab label="bar"/>
        <Tab label="baz"/>
      </TabBar>
    ));
    userEvent.click(getAllByRole('tab')[0]);
    expect(onActivated).not.toHaveBeenCalled();
    userEvent.click(getAllByRole('tab')[2]);
    expect(onActivated).toHaveBeenCalledTimes(1);
    expect(eventDetail).toEqual({ index: 2 });
  });
});

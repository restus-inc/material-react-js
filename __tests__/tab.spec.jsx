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

/* global jest, describe, afterEach, it, expect */
import 'regenerator-runtime/runtime';
import React, { useEffect, useRef } from 'react';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTab } from '@material/tab';
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

  it('can provide an MDCTab and MDCTabBar instance', async () => {
    let mdcTabBarComponent;
    let mdcTabComponent1;
    let mdcTabComponent2;
    function MyTabs() {
      const mdcTabBarRef = useRef();
      const mdcTabRef1 = useRef();
      const mdcTabRef2 = useRef();
      useEffect(() => {
        mdcTabBarComponent = mdcTabBarRef.current;
        mdcTabComponent1 = mdcTabRef1.current;
        mdcTabComponent2 = mdcTabRef2.current;
      });
      return (
        <TabBar mdcTabBarRef={mdcTabBarRef}>
          <Tab label="foo" active={true} mdcTabRef={mdcTabRef1}/>
          <Tab label="bar" mdcTabRef={mdcTabRef2}/>
          <Tab label="baz"/>
        </TabBar>
      );
    }
    render(<MyTabs/>);
    expect(mdcTabBarComponent).toBeInstanceOf(MDCTabBar);
    expect(mdcTabComponent1).toBeInstanceOf(MDCTab);
    expect(mdcTabComponent2).toBeInstanceOf(MDCTab);
    expect(mdcTabComponent1.active).toBe(true);
    expect(mdcTabComponent2.active).toBe(false);
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

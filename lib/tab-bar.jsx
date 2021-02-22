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

import React, { useRef } from 'react';
import { MDCTabBar } from '@material/tab-bar';
import { useMDCComponent, useMDCEvent } from './hoocks';

/**
 * [MDCTabBar component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-bar#readme}
 * implemented by react component.
 * @function TabBar
 * @param {Object} props
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {React.MutableRefObject} [props.mdcTabBarRef] MutableRefObject which bind an
 * MDCTabBar instance to.
 * @param {EventHandler} [props.onActivated] An event handler of React that is associated with
 * `button` element.
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function TabBar(props) {
  const rootElementRef = useRef();
  const mdcTabBarRef = useMDCComponent(
    MDCTabBar,
    rootElementRef,
    props.mdcTabBarRef,
  );
  useMDCEvent(mdcTabBarRef, 'MDCTabBar:activated', props.onActivated);

  return (
    <div className={props.className ? `mdc-tab-bar ${props.className}` : 'mdc-tab-bar'} role="tablist" ref={rootElementRef}>
      <div className="mdc-tab-scroller">
        <div className="mdc-tab-scroller__scroll-area">
          <div className="mdc-tab-scroller__scroll-content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { MDCTab } from '@material/tab';
import { useMDCComponent } from './hooks';

const NON_NATIVE_PROPS = [
  'label', 'className', 'active', 'icon', 'iconClassName', 'ref', 'mdcTabRef',
];

const generateRootClassName = (props) => {
  const rootClassNames = ['mdc-tab'];
  if (props.active) {
    rootClassNames.push('mdc-tab--active');
  }
  if (props.className) {
    rootClassNames.push(props.className);
  }
  return rootClassNames.join(' ');
};

function IconElement(props) {
  if (!props.icon && !props.iconClassName) {
    return null;
  }
  const iconClassName = props.iconClassName || 'material-icons';
  return <span className={`${iconClassName} mdc-tab__icon`} aria-hidden="true">{props.icon}</span>;
}

/**
 * [MDCTab component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab#readme}
 * implemented by react component.
 * @function Tab
 * @param {Object} props Attributes other than followings are passed to the `button`
 * element of React as is.
 * @param {string} props.label The text label on the tab.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.active] Specifies `true` if the tab is active, `false` otherwise.
 * Default to `false`.
 * @param {string} [props.icon] The inner text of the icon element if adding the icon.
 * The component renders an icon on the tab if either this attribute or `props.iconClassName`
 * is present.
 * @param {string} [props.iconClassName] The class name that is added to the icon element if
 * adding the icon. The component renders an icon on the tab if either this attribute or
 * `props.icon` is present.
 * @param {React.MutableRefObject} [props.mdcTabRef] MutableRefObject which bind an
 * MDCTab instance to.
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function Tab(props) {
  const rootElementRef = useRef();
  useMDCComponent(MDCTab, rootElementRef, props.mdcTabRef);

  const buttonProps = Object.entries(props).reduce((newProps, [key, value]) => (
    !NON_NATIVE_PROPS.includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
  ), {
    className: generateRootClassName(props),
    role: 'tab',
    'aria-selected': props.active,
    tabIndex: '-1',
    type: 'button',
    ref: rootElementRef,
  });

  return (
    <button {...buttonProps}>
      <span className="mdc-tab__content">
        <IconElement {...props}/>
        <span className="mdc-tab__text-label">{props.label}</span>
      </span>
      <span className={props.active ? 'mdc-tab-indicator mdc-tab-indicator--active' : 'mdc-tab-indicator'}>
        <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
      </span>
      <span className="mdc-tab__ripple"></span>
    </button>
  );
}

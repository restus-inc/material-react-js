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
import { MDCRipple } from '@material/ripple';
import { useMDCComponent } from './hoocks';

const NON_NATIVE_PROPS = [
  'variation', 'label', 'className', 'icon', 'iconClassName', 'supportsTouch', 'ref',
  'disablesMdcInstance', 'mdcRippleRef',
];

const generateRootClassName = (props) => {
  const rootClassNames = ['mdc-button'];
  switch (props.variation || 'text') {
    case 'text':
      break;
    case 'outlined':
      rootClassNames.push('mdc-button--outlined');
      break;
    case 'contained':
      rootClassNames.push('mdc-button--raised');
      break;
    default:
      throw new Error(`Not suported variation; ${props.variation}`);
  }
  if (props.supportsTouch) {
    rootClassNames.push('mdc-button--touch');
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
  return <i className={`${iconClassName} mdc-button__icon`} aria-hidden="true">{props.icon}</i>;
}

/**
 * [MDCButton component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-button#readme}
 * implemented by react component.
 * @function Button
 * @param {Object} props Attributes other than followings are passed to the `button`
 * element of React as is.
 * @param {string} [props.variation] The variation of the button. Supported variations are
 * `'text'`(default), `'outlined'` and `'contained'`.
 * @param {string} props.label The label text of the button.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.disabled] Specifies `true` if you want to disable the button.
 * Default to `false`.
 * @param {string} [props.icon] The inner text of the icon element if adding the icon.
 * The component renders an icon on the button if either this attribute or `props.iconClassName`
 * is present.
 * @param {string} [props.iconClassName] The class name that is added to the icon element if
 * adding the icon. The component renders an icon on the button if either this attribute or
 * `props.icon` is present.
 * @param {boolean} [props.disablesMdcInstance] Specifies `true` if you do not want to
 * instantiate MDC Component. Default to `false`.
 * @param {boolean} [props.supportsTouch] Whether to support touch in Material Design
 * specification. Material Design spec advises that touch targets should be at least 48 x 48 px.
 * @param {React.MutableRefObject} [props.mdcRippleRef] MutableRefObject which bind an
 * MDCRipple instance to. The instance is not bind if `props.disablesMdcInstance` is `true`.
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function Button(props) {
  const rootElementRef = useRef();
  useMDCComponent(MDCRipple, rootElementRef, props.mdcRippleRef, props.disablesMdcInstance);

  const buttonProps = Object.entries(props).reduce((newProps, [key, value]) => (
    !NON_NATIVE_PROPS.includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
  ), { className: generateRootClassName(props), ref: rootElementRef });

  const button = (
    <button {...buttonProps}>
      <div className="mdc-button__ripple"></div>
      <IconElement {...props}/>
      <span className="mdc-button__label">{props.label}</span>
      {props.supportsTouch && <div className="mdc-button__touch"></div>}
    </button>
  );
  if (props.supportsTouch) {
    return <div className="mdc-touch-target-wrapper">{button}</div>;
  }
  return button;
}

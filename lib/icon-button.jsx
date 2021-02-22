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

import React, { useRef, useCallback } from 'react';
import { MDCRipple } from '@material/ripple';
import { useMDCComponent } from './hoocks';

const NON_NATIVE_PROPS = [
  'className', 'icon', 'ref', 'disablesMdcInstance', 'mdcRippleRef',
];

const generateRootClassName = (props) => {
  const rootClassNames = ['mdc-icon-button'];
  if (props.className) {
    rootClassNames.push(props.className);
  }
  return rootClassNames.join(' ');
};

/**
 * [MDCIconButton component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button#readme}
 * implemented by react component.
 * @function IconButton
 * @param {Object} props Attributes other than followings are passed to the `button`
 * element of React as is.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {string} [props.icon] The inner text of the icon element if adding the icon.
 * @param {boolean} [props.disablesMdcInstance] Specifies `true` if you do not want to
 * instantiate MDCRipple Component. Default to `false`.
 * @param {React.MutableRefObject} [props.mdcRippleRef] MutableRefObject which bind an
 * MDCRipple instance to. The instance is not bind if `props.disablesMdcInstance` is `true`.
 * @returns {DetailedReactHTMLElement}
 * @example
 * import { IconButton } from 'material-react-js';
 *
 * function MyFavoriteButton(props) {
 *   switch (props.type) {
 *     case 'material':
 *       return <IconButton className="material-icons" icon="favorite"/>;
 *       // The following code also returns the same output
 *       // return <IconButton className="material-icons">favorite</IconButton>;
 *     case 'image':
 *       return <IconButton><img src="./img/favorite.png" alt="favorite"/></IconButton>;
 *     case 'svg':
 *       return (
 *         <IconButton>
 *           <svg viewBox="0 0 32 32">...</svg>
 *         </IconButton>
 *       );
 *     default:
 *       throw new Error('unknown icon type');
 *   }
 * }
 * @exports material-react-js
 */
export default function IconButton(props) {
  const rootElementRef = useRef();
  useMDCComponent(
    MDCRipple,
    rootElementRef,
    props.mdcRippleRef,
    props.disablesMdcInstance,
    useCallback((mdcRipple) => {
      mdcRipple.unbounded = true; // eslint-disable-line no-param-reassign
    }, []),
  );

  const buttonProps = Object.entries(props).reduce((newProps, [key, value]) => (
    !NON_NATIVE_PROPS.includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
  ), { className: generateRootClassName(props), ref: rootElementRef });

  return <button {...buttonProps}>{props.children || props.icon}</button>;
}

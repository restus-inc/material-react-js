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
import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCRipple } from '@material/ripple';
import { useMDCComponent } from './hoocks';

const NON_NATIVE_PROPS = [
  'className', 'iconClassName', 'onIcon', 'offIcon', 'isOnState', 'label',
  'aria-label', 'aria-pressed', 'data-aria-label-off', 'data-aria-label-on',
  'ref', 'disablesMdcInstance', 'mdcIconButtonToggleRef', 'mdcRippleRef',
];

const generateIconClassName = (props, isOnIcon) => {
  const rootClassNames = ['mdc-icon-button__icon'];
  if (isOnIcon) {
    rootClassNames.push('mdc-icon-button__icon--on');
  }
  if (props.className) {
    rootClassNames.push(props.className);
  }
  return rootClassNames.join(' ');
};

const generateIconProps = (props, isOnIcon) => (
  Object.entries(props).reduce(
    (newProps, [key, value]) => (
      !['className', 'isOnIcon'].includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
    ),
    { className: generateIconClassName(props, isOnIcon) },
  )
);

const generateRootClassName = (props) => {
  const rootClassNames = ['mdc-icon-button'];
  if (props.isOnState) {
    rootClassNames.push('mdc-icon-button--on');
  }
  if (props.className) {
    rootClassNames.push(props.className);
  }
  return rootClassNames.join(' ');
};

/**
 * Icon toggle button that uses [MDCIconButton component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button#readme}
 * implemented by react component.
 * @function IconToggle
 * @param {Object} props Attributes other than followings are passed to the `button`
 * element of React as is.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {string} [props.iconClassName] The class name that is added to the icon element.
 * This property is valid only when `offIcon` or `onIcon` property is specified.
 * @param {string} [props.offIcon] The inner text of the &ldquo;off&rdquo; icon element.
 * This property is ignored when child element is specified.
 * @param {string} [props.onIcon] The inner text of the &ldquo;on&rdquo; icon element.
 * This property is ignored when child element is specified.
 * @param {boolean} [props.isOnState] Specifies `true` if initail state is &ldquo;on&rdquo;.
 * Default to `false`.
 * @param {string|string[]} [props.label] The label of icon togle button. This property maps
 * to `aria-label` attribute. If aria label is changed depening on icon button state, specify
 * an array with two elements, whose first element is the label for on state and the second
 * element is the label for off state.
 * @param {boolean} [props.disablesMdcInstance] Specifies `true` if you do not want to
 * instantiate MDCRipple Component. `MDCIconButtonToggle` is instantiated regardless
 * of the setting of this property. Default to `false`.
 * @param {React.MutableRefObject} [props.mdcIconButtonToggleRef] MutableRefObject which
 * bind an MDCIconButtonToggle instance to.
 * @param {React.MutableRefObject} [props.mdcRippleRef] MutableRefObject which bind an
 * MDCRipple instance to. The instance is not bind if `props.disablesMdcInstance` is `true`.
 * @returns {DetailedReactHTMLElement}
 * @example
 * import { IconToggle } from 'material-react-js';
 *
 * function MyVisibilityToggleButton(props) {
 *   switch (props.type) {
 *     case 'material':
 *       return <IconToggle iconClassName="material-icons"
 *                          offIcon="visibility_off"
 *                          onIcon="visibility"
 *                          label="visibility"/>;
 *       // The following code also returns the same output
 *       // return (
 *       //   <IconToggle label="visibility">
 *       //     <IconToggle.OffIcon className="material-icons">visibility_off</IconToggle.OffIcon>
 *       //     <IconToggle.OnIcon className="material-icons">visibility</IconToggle.OnIcon>
 *       //   </IconToggle>
 *       // );
 *     case 'image':
 *       return (
 *         <IconToggle label="visibility">
 *           <IconToggle.OffImage src="./img/visibility_off.png" alt="visibility_off"/>
 *           <IconToggle.OnImage src="./img/visibility.png" alt="visibility"/>
 *         </IconToggle>
 *       );
 *     case 'svg':
 *       return (
 *         <IconToggle label="visibility">
 *           <IconToggle.OffSVG viewBox="0 0 24 24">
 *             ...
 *           </IconToggle.OffSVG>
 *           <IconToggle.OnSVG viewBox="0 0 24 24">
 *             ...
 *           </IconToggle.OnSVG>
 *         </IconToggle>
 *       );
 *     default:
 *       throw new Error('unknown icon type');
 *   }
 * }
 * @exports material-react-js
 */
function IconToggle(props) {
  const rootElementRef = useRef();
  useMDCComponent(
    MDCIconButtonToggle,
    rootElementRef,
    props.mdcIconButtonToggleRef,
  );
  useMDCComponent(
    MDCRipple,
    rootElementRef,
    props.mdcRippleRef,
    props.disablesMdcInstance,
    useCallback((mdcRipple) => {
      mdcRipple.unbounded = true; // eslint-disable-line no-param-reassign
    }, []),
  );

  const buttonProps = {
    className: generateRootClassName(props),
    ref: rootElementRef,
  };
  if (props.label) {
    if (Array.isArray(props.label)) {
      Object.assign(buttonProps, {
        'aria-label': props.label[props.isOnState ? 1 : 0],
        'data-aria-label-off': props.label[0],
        'data-aria-label-on': props.label[1],
      });
    } else {
      Object.assign(buttonProps, {
        'aria-label': props.label,
        'aria-pressed': Boolean(props.isOnState),
      });
    }
  }
  Object.entries(props).reduce((newProps, [key, value]) => (
    !NON_NATIVE_PROPS.includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
  ), buttonProps);

  if (props.children) {
    return <button {...buttonProps}>{props.children}</button>;
  }
  return (
    <button {...buttonProps}>
      <IconToggle.OffIcon className={props.iconClassName}>{props.offIcon}</IconToggle.OffIcon>
      <IconToggle.OnIcon className={props.iconClassName}>{props.onIcon}</IconToggle.OnIcon>
    </button>
  );
}

const offElement = (type, props) => React.createElement(type, generateIconProps(props, false));
const onElement = (type, props) => React.createElement(type, generateIconProps(props, true));

/**
 * Icon element that is used &ldquo;off&rdquo; state icon in IconToggle. This component outputs
 * HTML `<i>` element with appropriate attributes.
 * @param {Object} [props]  Attributes passed to the `i` element.
 * @memberof module:IconToggle
 */
IconToggle.OffIcon = function OffIcon(props) {
  return offElement('i', props);
};

/**
 * Icon element that is used &ldquo;on&rdquo; state icon in IconToggle. This component outputs
 * HTML `<i>` element with appropriate attributes.
 * @param {Object} [props]  Attributes passed to the `i` element.
 * @memberof module:IconToggle
 */
IconToggle.OnIcon = function OnIcon(props) {
  return onElement('i', props);
};

/**
 * Image element that is used &ldquo;off&rdquo; state icon in IconToggle. This component outputs
 * HTML `<img>` element with appropriate attributes.
 * @param {Object} [props]  Attributes passed to the `img` element.
 * @memberof module:IconToggle
 */
IconToggle.OffImage = function OffImage(props) {
  return offElement('img', props);
};

/**
 * Image element that is used &ldquo;on&rdquo; state icon in IconToggle. This component outputs
 * HTML `<img>` element with appropriate attributes.
 * @param {Object} [props]  Attributes passed to the `img` element.
 * @memberof module:IconToggle
 */
IconToggle.OnImage = function OnIcon(props) {
  return onElement('img', props);
};

/**
 * SVG element that is used &ldquo;off&rdquo; state icon in IconToggle. This component outputs
 * HTML `<svg>` element with appropriate attributes.
 * @param {Object} [props]  Attributes passed to the `svg` element.
 * @memberof module:IconToggle
 */
IconToggle.OffSVG = function OffImage(props) {
  return offElement('svg', props);
};

/**
 * SVG element that is used &ldquo;on&rdquo; state icon in IconToggle. This component outputs
 * HTML `<svg>` element with appropriate attributes.
 * @param {Object} [props]  Attributes passed to the `svg` element.
 * @memberof module:IconToggle
 */
IconToggle.OnSVG = function OnIcon(props) {
  return onElement('svg', props);
};

export default IconToggle;

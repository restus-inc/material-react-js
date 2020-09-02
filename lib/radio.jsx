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

import React, { useEffect, useRef } from 'react';
import { MDCRadio } from '@material/radio';
import { MDCFormField } from '@material/form-field';

const NON_NATIVE_PROPS = [
  'label', 'className', 'indeterminate', 'supportsTouch', 'type', 'disablesMdcInstance',
];

function NativeInput(props) {
  const nativeInputProps = Object.entries(props).reduce((newProps, [key, value]) => (
    !NON_NATIVE_PROPS.includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
  ), {});
  return <input type="radio" className="mdc-radio__native-control" {...nativeInputProps}/>;
}

function SimpleRadio(props) {
  const rootElement = useRef();

  useEffect(() => {
    if (props.disablesMdcInstance) {
      return () => {};
    }
    const mdcComponent = new MDCRadio(rootElement.current);
    return () => {
      mdcComponent.destroy();
    };
  }, [props.disablesMdcInstance]);

  const classNames = ['mdc-radio'];
  if (props.disabled) {
    classNames.push('mdc-radio--disabled');
  }
  if (props.supportsTouch) {
    classNames.push('mdc-radio--touch');
  } else if (!props.label && props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(' ')} ref={rootElement}>
      <NativeInput {...props}/>
      <div className="mdc-radio__background">
        <div className="mdc-radio__outer-circle"></div>
        <div className="mdc-radio__inner-circle"></div>
      </div>
      <div className="mdc-radio__ripple"></div>
    </div>
  );
}

function RadioWithLabel(props) {
  if (!props.label) {
    return <SimpleRadio {...props}/>;
  }

  const rootElement = useRef();

  useEffect(() => {
    if (props.disablesMdcInstance) {
      return () => {};
    }
    const mdcComponent = new MDCFormField(rootElement.current);
    return () => {
      mdcComponent.destroy();
    };
  }, [props.disablesMdcInstance]);

  const labelProps = {};
  if (props.id) {
    labelProps.htmlFor = props.id;
  }
  const classNames = ['mdc-form-field'];
  if (!props.supportsTouch && props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(' ')} ref={rootElement}>
      <SimpleRadio {...props}/>
      <label {...labelProps}>{props.label}</label>
    </div>
  );
}

/**
 * [MDCRadio component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-radio#readme}
 * implemented by react component.
 * @function Radio
 * @param {Object} props Attributes other than followings are passed to the `input`
 * element of React as is.
 * @param {string} [props.label] The label text of the radio.
 * @param {boolean} [props.checked] Specifies `true` if you want to check the radio.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.disabled] Specifies `true` if you want to disable the radio.
 * Default to `false`.
 * @param {boolean} [props.disablesMdcInstance] Specifies `true` if you do not want to
 * instantiate MDC Component. Default to `false`.
 * @param {boolean} [props.supportsTouch] Whether to support touch in Material Design
 * specification. Material Design spec advises that touch targets should be at least 48 x 48 px.
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function Radio(props) {
  if (!props.supportsTouch) {
    return <RadioWithLabel {...props}/>;
  }

  const classNames = ['mdc-touch-target-wrapper'];
  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(' ')}>
      <RadioWithLabel {...props}/>
    </div>
  );
}

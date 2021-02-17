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
import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';

const NON_NATIVE_PROPS = [
  'label', 'className', 'indeterminate', 'supportsTouch', 'type', 'disablesMdcInstance',
  'mdcCheckboxRef', 'mdcFormFieldRef',
];

function NativeInput(props) {
  const nativeInputProps = Object.entries(props).reduce((newProps, [key, value]) => (
    !NON_NATIVE_PROPS.includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
  ), {});
  if (!props.checked && props.indeterminate) {
    nativeInputProps['data-indeterminate'] = 'true';
  }
  return <input type="checkbox" className="mdc-checkbox__native-control" {...nativeInputProps}/>;
}

function SimpleCheckbox(props) {
  const rootElement = useRef();

  useEffect(() => {
    if (props.disablesMdcInstance) {
      return () => {};
    }
    const mdcComponent = new MDCCheckbox(rootElement.current);
    if (props.mdcCheckboxRef) {
      props.mdcCheckboxRef.current = mdcComponent; // eslint-disable-line no-param-reassign
    }
    return () => {
      mdcComponent.destroy();
    };
  }, [props.disablesMdcInstance]);

  const classNames = ['mdc-checkbox'];
  if (props.checked || props.defaultChecked) {
    classNames.push('mdc-checkbox--selected');
  }
  if (props.disabled) {
    classNames.push('mdc-checkbox--disabled');
  }
  if (props.supportsTouch) {
    classNames.push('mdc-checkbox--touch');
  } else if (!props.label && props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(' ')} ref={rootElement}>
      <NativeInput {...props}/>
      <div className="mdc-checkbox__background">
        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path className="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
        </svg>
        <div className="mdc-checkbox__mixedmark"></div>
      </div>
      <div className="mdc-checkbox__ripple"></div>
    </div>
  );
}

function CheckboxWithLabel(props) {
  if (!props.label) {
    return <SimpleCheckbox {...props}/>;
  }

  const rootElement = useRef();
  const mdcCheckboxRef = props.mdcCheckboxRef || (props.disablesMdcInstance ? null : useRef());

  useEffect(() => {
    if (props.disablesMdcInstance) {
      return () => {};
    }
    const mdcComponent = new MDCFormField(rootElement.current);
    mdcComponent.input = mdcCheckboxRef.current;
    if (props.mdcFormFieldRef) {
      props.mdcFormFieldRef.current = mdcComponent; // eslint-disable-line no-param-reassign
    }
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
      <SimpleCheckbox mdcCheckboxRef={mdcCheckboxRef} {...props}/>
      <label {...labelProps}>{props.label}</label>
    </div>
  );
}

/**
 * [MDCCheckbox component]{@link https://github.com/YuoMamaterial-componentsmoru/material-components-web/tree/master/packages/mdc-checkbox#readme}
 * implemented by react component.
 * @function Checkbox
 * @param {Object} props Attributes other than followings are passed to the `input`
 * element of React as is.
 * @param {string} [props.label] The label text of the checkbox.
 * @param {boolean} [props.checked] Specifies `true` if you want to check the checkbox.
 * @param {boolean} [props.indeterminate] Specifies `true` if you want to set the checkbox
 * in indeterminate.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.disabled] Specifies `true` if you want to disable the checkbox.
 * Default to `false`.
 * @param {boolean} [props.disablesMdcInstance] Specifies `true` if you do not want to
 * instantiate MDC Component. Default to `false`.
 * @param {boolean} [props.supportsTouch] Whether to support touch in Material Design
 * specification. Material Design spec advises that touch targets should be at least 48 x 48 px.
 * @param {React.MutableRefObject} [props.mdcCheckboxRef] MutableRefObject which bind an
 * MDCCheckbox instance to. The instance is not bind if `props.disablesMdcInstance` is `true`.
 * @param {React.MutableRefObject} [props.mdcFormFieldRef] MutableRefObject which bind an
 * MDCormField instance to. The instance is not bind if `props.disablesMdcInstance` is `true`.
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function Checkbox(props) {
  if (!props.supportsTouch) {
    return <CheckboxWithLabel {...props}/>;
  }

  const classNames = ['mdc-touch-target-wrapper'];
  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(' ')}>
      <CheckboxWithLabel {...props}/>
    </div>
  );
}

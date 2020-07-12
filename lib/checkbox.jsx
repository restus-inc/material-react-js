import React, { useEffect, useRef } from 'react';
import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';

const NON_NATIVE_PROPS = ['label', 'className', 'indeterminate', 'supportsTouch', 'type'];

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
    const mdcComponent = new MDCCheckbox(rootElement.current);
    return () => {
      mdcComponent.destroy();
    };
  }, []);

  const classNames = ['mdc-checkbox'];
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

  useEffect(() => {
    const mdcComponent = new MDCFormField(rootElement.current);
    return () => {
      mdcComponent.destroy();
    };
  }, []);

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
      <SimpleCheckbox {...props}/>
      <label {...labelProps}>{props.label}</label>
    </div>
  );
}

/**
 * [MDCCheckbox component]{@link https://github.com/YuoMamoru/material-components-web/tree/master/packages/mdc-checkbox#readme}
 * implemented by react component.
 * @param {Object} props Attributes other than followings are passed to the `input`
 * element of React as is.
 * @param {string} [props.label] The label text of the checkbox.
 * @param {boolean} [props.checked] Specifies `true` if you want to check the checkbox.
 * @param {boolean} [props.indeterminate] Specifies `true` if you want to set the checkbox
 * in indeterminate.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.disabled] Specifies `true` if you want to disable the checkbox.
 * Default to `false`.
 * @param {boolean} [props.supportsTouch] Whether to support touch in Material Design
 * specification. Material Design spec advises that touch targets should be at least 48 x 48 px.
 * @returns {DetailedReactHTMLElement}
 * @module material-react/lib/select
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

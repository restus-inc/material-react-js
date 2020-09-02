import React, { useEffect, useRef } from 'react';
import { MDCTextField } from '@material/textfield';

const NON_NATIVE_PROPS = [
  'id', 'value', 'defaultValue', 'type', 'variation', 'label', 'className', 'helperText',
  'showsHelperPersistently', 'showsHelperAsValidation', 'rows', 'cols', 'resizable',
];

const generateRootClassName = (props) => {
  const rootClasses = ['mdc-text-field'];
  if (props.label == null || props.label === '') {
    rootClasses.push('mdc-text-field--no-label');
  }
  if (props.disabled) {
    rootClasses.push('mdc-text-field--disabled');
  }
  if (props.defaultValue) {
    rootClasses.push('mdc-text-field--label-floating');
  }

  switch (props.variation || 'filled') {
    case 'filled':
      rootClasses.push('mdc-text-field--filled');
      break;
    case 'outlined':
      rootClasses.push('mdc-text-field--outlined');
      break;
    case 'textarea':
      rootClasses.push('mdc-text-field--outlined', 'mdc-text-field--textarea');
      break;
    case 'filled-textarea':
      rootClasses.push('mdc-text-field--filled', 'mdc-text-field--textarea');
      break;
    default:
      throw new Error(`Not suported variation; ${props.variation}`);
  }
  if (props.className) {
    rootClasses.push(props.className);
  }
  return rootClasses.join(' ');
};

function NativeInput(props) {
  const nativeInputProps = Object.entries(props).reduce((newProps, [key, value]) => (
    !NON_NATIVE_PROPS.includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
  ), { className: 'mdc-text-field__input' });
  if (props.value == null) {
    Object.assign(nativeInputProps, { defaultValue: props.defaultValue });
  } else {
    Object.assign(nativeInputProps, { value: props.value });
  }
  if (props.dataset) {
    Object.assign(
      nativeInputProps,
      ...Object.entries(props.dataset).map(([key, value]) => ({ [`data-${key}`]: value })),
    );
  }
  if ((props.variation || 'filled').endsWith('textarea')) {
    Object.assign(nativeInputProps, { rows: props.rows || 4, cols: props.cols || 32 });
  } else {
    Object.assign(nativeInputProps, { type: props.type || 'text' });
  }
  if (props.id) {
    Object.assign(nativeInputProps, { id: props.id, name: props.id });
    if (!(props.label == null || props.label === '')) {
      Object.assign(nativeInputProps, { 'aria-labelledby': `${props.id}-label` });
    }
    if (props.helperText || props.showsHelperPersistently || props.showsHelperAsValidation) {
      Object.assign(nativeInputProps, {
        'aria-controls': `${props.id}-helper`,
        'aria-describedby': `${props.id}-helper`,
      });
    }
  }
  const tagName = (props.variation || 'filled').endsWith('textarea') ? 'textarea' : 'input';
  return React.createElement(tagName, nativeInputProps);
}

function HelperText(props) {
  if (!props.helperText && !props.showsHelperPersistently && !props.showsHelperAsValidation) {
    return null;
  }
  const classList = ['mdc-text-field-helper-text'];
  if (props.showsHelperPersistently) {
    classList.push('mdc-text-field-helper-text--persistent');
  }
  if (props.showsHelperAsValidation) {
    classList.push('mdc-text-field-helper-text--validation-msg');
  }
  return (
    <div className="mdc-text-field-helper-line">
      <div className={classList.join(' ')} id={props.id && `${props.id}-helper`} aria-hidden="true">{props.helperText}</div>
    </div>
  );
}

/**
 * [MDCTextField component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield#readme}
 * implemented by react component.
 * @function TextField
 * @param {Object} [props] Attributes other than followings are passed to the `input`
 * or `textarea` element of React as is.
 * @param {string} [props.id] The `id` attribute of the native html input element. This
 * property is also used the `name` attribute.
 * @param {string} [props.value] The value of the text field. Should not specify both
 * this attribute and `props.defaultValue` at the same time.
 * @param {string} [props.defaultValue] The default value of the text field. Should not
 * specify both this attribute and `props.value` at the same time.
 * @param {string} [props.type] The `type` attribute of the native html input element.
 * If `props.variation` is `'textarea'` or `'filled-textarea'`, this attribute is ignored.
 * @param {string} [props.variation] The variation of the text field. Supported variations
 *  are`'filled'`(default), `'outlined'`, `'textarea'` and `'filled-textarea'`.
 * @param {string} [props.label] The label text of the text field.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.disabled] Specifies `true` if you want to disable the text field.
 * Default to `false`.
 * @param {string} [props.helperText] Specifeis the helper text.
 * @param {boolean} [props.showsHelperPersistently] Specifies `true` to make the helper text
 * permanently visible. Default to `false`.
 * @param {boolean} [props.showsHelperAsValidation] Specifies `true` if the helper text is
 * a validation message. Default to `false`.
 * @param {number} [props.rows] The number of rows of textarea. If `props.variation` is not
 * `'textarea'` or `'filled-textarea'`, this attribute is ignored. Default to `4`.
 * @param {number} [props.cols] The cols attribute of textarea element. If `props.variation`
 * is not `'textarea'` or `'filled-textarea'`, this attribute is ignored. Default to `32`.
 * @param {boolean} [props.resizable] Specifies `true` allowing the user to resize the textarea.
 * If `props.variation` is not `'textarea'` or `'filled-textarea'`, this attribute is ignored.
 * Default to `false`
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function TextField(props) {
  const rootElement = useRef();
  const mdcComponentRef = useRef();

  useEffect(() => {
    const hasFocus = document.hasFocus() && document.activeElement === rootElement.current;
    if (mdcComponentRef.current && !hasFocus) {
      mdcComponentRef.current.useNativeValidation = false;
      mdcComponentRef.current.value = props.value;
      mdcComponentRef.current.useNativeValidation = true;
    }
  }, [props.value]);

  useEffect(() => {
    mdcComponentRef.current = new MDCTextField(rootElement.current);
    return () => {
      mdcComponentRef.current.destroy();
    };
  }, []);

  const rootClassName = generateRootClassName(props);
  const labelClassName = props.defaultValue
    ? 'mdc-floating-label mdc-floating-label--float-above'
    : 'mdc-floating-label';

  switch (props.variation || 'filled') {
    case 'filled':
      return (
        <>
          <label className={rootClassName} ref={rootElement}>
            <span className="mdc-text-field__ripple"></span>
            <NativeInput {...props}/>
            {!(props.label == null || props.label === '') && (
            <span className={labelClassName} id={props.id && `${props.id}-label`}>{props.label}</span>
            )}
            <span className="mdc-line-ripple"></span>
          </label>
          <HelperText {...props}/>
        </>
      );
    case 'outlined':
      return (
        <>
          <label className={rootClassName} ref={rootElement}>
          <NativeInput {...props}/>
            <span className="mdc-notched-outline">
              <span className="mdc-notched-outline__leading"></span>
              {!(props.label == null || props.label === '') && (
                <span className="mdc-notched-outline__notch">
                  <span className={labelClassName} id={props.id && `${props.id}-label`}>{props.label}</span>
                </span>
              )}
              <span className="mdc-notched-outline__trailing"></span>
            </span>
          </label>
          <HelperText {...props}/>
        </>
      );
    case 'textarea':
      return (
        <>
          <label className={rootClassName} ref={rootElement}>
            {props.resizable ? (
              <span className="mdc-text-field__resizer">
                <NativeInput {...props}/>
              </span>
            ) : (
              <NativeInput {...props}/>
            )}
            <span className="mdc-notched-outline">
              <span className="mdc-notched-outline__leading"></span>
              {!(props.label == null || props.label === '') && (
                <span className="mdc-notched-outline__notch">
                  <span className={labelClassName} id={props.id && `${props.id}-label`}>{props.label}</span>
                </span>
              )}
              <span className="mdc-notched-outline__trailing"></span>
            </span>
          </label>
          <HelperText {...props}/>
        </>
      );
    case 'filled-textarea':
      return (
        <>
          <label className={rootClassName} ref={rootElement}>
            <span className="mdc-text-field__ripple"></span>
            {props.resizable ? (
              <span className="mdc-text-field__resizer">
                <NativeInput {...props}/>
              </span>
            ) : (
              <NativeInput {...props}/>
            )}
            {!(props.label == null || props.label === '') && (
            <span className={labelClassName} id={props.id && `${props.id}-label`}>{props.label}</span>
            )}
            <span className="mdc-line-ripple"></span>
          </label>
          <HelperText {...props}/>
        </>
      );
    default:
      throw new Error(`Not suported variation; ${props.variation}`);
  }
}

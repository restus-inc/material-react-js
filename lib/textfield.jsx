import React, { useEffect, useRef } from 'react';
import { MDCTextField } from '@material/textfield';
import { newId } from './utils';

const generateRootClassName = (props, hasLabel) => {
  const rootClasses = ['mdc-text-field'];
  if (!hasLabel) {
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
    default:
      throw new Error(`Not suported variation; ${props.variation}`);
  }
  return rootClasses.join(' ');
};

const generateNaviteInput = (props, id, hasLabel) => {
  const nativeInputProps = {
    className: 'mdc-text-field__input',
    defaultValue: props.defaultValue || '',
    disabled: Boolean(props.disabled),
    required: Boolean(props.required),
    onChange: props.onChange,
  };
  if (props.dataset) {
    Object.assign(
      nativeInputProps,
      ...Object.entries(props.dataset).map(([key, value]) => ({ [`data-${key}`]: value })),
    );
  }
  if (props.variation === 'textarea') {
    Object.assign(nativeInputProps, { rows: props.rows || 4, cols: props.cols || 32 });
  } else {
    Object.assign(nativeInputProps, { type: props.type || 'text' });
  }
  if (props.id) {
    Object.assign(nativeInputProps, { id: props.id, name: props.id });
  }
  if (!(props.placeholder == null || props.placeholder === '')) {
    Object.assign(nativeInputProps, { placeholder: props.placeholder });
  }
  if (hasLabel) {
    Object.assign(nativeInputProps, { 'aria-labelledby': `${id}-label` });
  }
  if (props.pattern) {
    Object.assign(nativeInputProps, { pattern: props.pattern });
  }
  const tagName = props.variation === 'textarea' ? 'textarea' : 'input';
  return React.createElement(tagName, nativeInputProps);
};

/**
 * [MDCTextField component]{@link https://github.com/YuoMamoru/material-components-web/tree/master/packages/mdc-textfield#readme}
 * implemented by react component.
 * @param {Object} [props]
 * @param {string} [props.id] The `id` attribute of the native html input element. This
 * property is also used the `name` attribute.
 * @param {string} [props.defaultValue] The default value of the text field.
 * @param {string} [props.type] The `type` attribute of the native html input element.
 * If `props.variation` is `'textarea'`, this attribute is ignored. Default to `'text'`.
 * @param {string} [props.variation] The variation of the text field. Supported variations
 *  are`'filled'`(default), `'outlined'` and `'textarea'`.
 * @param {string} [props.label] The label text of the text field. If `props.variation` is
 * `'textarea'`, this attribute is ignored.
 * @param {string} [props.placeholder] The placeholder of the text field.
 * @param {boolean} [props.disabled] Specifies `true` if you want to disable the text field.
 * Default to `false`.
 * @param {boolean} [props.required] Specifies `true` if the text field is required.
 * Default to `false`.
 * @param {string} [props.pattern] Specifeis regular expression as string that the text
 * field's value is checked.
 * @param {number} [props.rows] The number of rows of textarea. If `props.variation` is not
 * `'textarea'`, this attribute is ignored. Default to `4`.
 * @param {number} [props.cols] The cols attribute of textarea element. If `props.variation`
 * is not `'textarea'`, this attribute is ignored. Default to `32`.
 * @param {EventHandler} [props.onChange] Specifies event handler that is called when
 * the text changes.
 * @returns {DetailedReactHTMLElement}
 * @module material-react/lib/textfield
 */
export default function TextField(props) {
  const rootElement = useRef();

  useEffect(() => {
    const mdcComponent = new MDCTextField(rootElement.current);
    return () => {
      mdcComponent.destroy();
    };
  });

  const id = props.id || newId();
  const hasLabel = !(props.label == null || props.label === '');
  const rootClassName = generateRootClassName(props, hasLabel);
  const labelClassName = (hasLabel && props.defaultValue)
    ? 'mdc-floating-label mdc-floating-label--float-above'
    : 'mdc-floating-label';
  const nativeInput = generateNaviteInput(props, id, hasLabel);

  switch (props.variation || 'filled') {
    case 'filled':
      return (
        <label className={rootClassName} ref={rootElement}>
          <span className="mdc-text-field__ripple"></span>
          {nativeInput}
          {hasLabel && <span className={labelClassName} id={`${id}-label`}>{props.label}</span>}
          <span className="mdc-line-ripple"></span>
        </label>
      );
    case 'outlined':
      return (
        <label className={rootClassName} ref={rootElement}>
          {nativeInput}
          <span className="mdc-notched-outline">
            <span className="mdc-notched-outline__leading"></span>
            {hasLabel && (
              <span className="mdc-notched-outline__notch">
                <span className={labelClassName} id={`${id}-label`}>{props.label}</span>
              </span>
            )}
            <span className="mdc-notched-outline__trailing"></span>
          </span>
        </label>
      );
    case 'textarea':
      return (
        <label className={rootClassName} ref={rootElement}>
          <span className="mdc-text-field__resizer">
            {nativeInput}
          </span>
          <span className="mdc-notched-outline">
            <span className="mdc-notched-outline__leading"></span>
            <span className="mdc-notched-outline__trailing"></span>
          </span>
        </label>
      );
    default:
      throw new Error(`Not suported variation; ${props.variation}`);
  }
}

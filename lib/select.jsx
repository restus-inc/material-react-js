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
import { MDCSelect } from '@material/select';

const generateRootClassName = (props) => {
  const rootClassNames = ['mdc-select'];
  switch (props.variation || 'filled') {
    case 'filled':
      rootClassNames.push('mdc-select--filled');
      break;
    case 'outlined':
      rootClassNames.push('mdc-select--outlined');
      break;
    default:
      throw new Error(`Not suported variation; ${props.variation}`);
  }
  if (props.required) {
    rootClassNames.push('mdc-select--required');
  }
  if (props.disabled) {
    rootClassNames.push('mdc-select--disabled');
  }
  if (props.className) {
    rootClassNames.push(props.className);
  }
  return rootClassNames.join(' ');
};

const getItemValue = (item, itemsValueAttr, index) => {
  if (itemsValueAttr) {
    return item[itemsValueAttr] || '';
  }
  return typeof item === 'object' ? index.toString() : item.toString();
};

/**
 * [MDCSelect component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-select#readme}
 * implemented by react component.
 * @function Select
 * @param {Object} props
 * @param {Object[]|string[]} props.items The list of options.
 * @param {string} [props.itemsValueAttr] The attribute name of the options to hold a value.
 * If not specified, index of items is used.
 * @param {string} [props.itemsTextAttr] The attribute name of the options to show contents
 * of the option. If not specified, the return value of `item.toString()` is used.
 * @param {string} [props.value] The value of `props.itemsValueAttr` attributes of the
 * selected option.
 * @param {string} [props.variation] The variation of the select. Supported variations are
 * `'filled'`(default) and `'outlined'`.
 * @param {string} [props.label] The label text of the select.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.required] Specifies `true` if the select is required.
 * Default to `false`.
 * @param {boolean} [props.disabled] Specifies `true` if you want to disable the select.
 * Default to `false`.
 * @param {EventHandler} [props.onChange] Specifies event handler that is called when
 * a option has been selected.
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function Select(props) {
  const rootElement = useRef();
  const mdcComponentRef = useRef();

  useEffect(() => {
    mdcComponentRef.current = new MDCSelect(rootElement.current);
    return () => {
      mdcComponentRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    const hasFocus = document.hasFocus() && document.activeElement === rootElement.current;
    if (mdcComponentRef.current && !hasFocus) {
      mdcComponentRef.current.useNativeValidation = false;
      mdcComponentRef.current.value = props.value;
      mdcComponentRef.current.useNativeValidation = true;
    }
  }, [props.value]);

  useEffect(() => {
    if (props.onChange) {
      mdcComponentRef.current.listen('MDCSelect:change', props.onChange);
    }
    return () => {
      if (props.onChange) {
        mdcComponentRef.current.unlisten('MDCSelect:change', props.onChange);
      }
    };
  }, [props.onChange]);

  const selectedItemText = props.value == null
    ? ''
    : props.items.reduce((text, item, i) => {
      if (text) {
        return text;
      }
      const value = getItemValue(item, props.itemsValueAttr, i);
      if (props.value !== value) {
        return text;
      }
      return props.itemsTextAttr ? item[props.itemsTextAttr] : item.toString();
    }, '');

  return (
    <div className={generateRootClassName(props)} ref={rootElement}>
      <div className="mdc-select__anchor"
           role="button"
           aria-haspopup="listbox"
           aria-required={props.required ? 'true' : null}
           aria-disabled={props.disabled ? 'true' : null}>
        {props.variation === 'outlined' ? '' : <span className="mdc-select__ripple"></span>}
        <span className="mdc-select__selected-text">{selectedItemText}</span>
        <span className="mdc-select__dropdown-icon">
          <svg className="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
            <polygon className="mdc-select__dropdown-icon-inactive"
                     stroke="none"
                     fillRule="evenodd"
                     points="7 10 12 15 17 10"/>
            <polygon className="mdc-select__dropdown-icon-active"
                     stroke="none"
                     fillRule="evenodd"
                     points="7 15 12 10 17 15"/>
          </svg>
        </span>
        {props.variation === 'outlined'
          ? (
            <span className="mdc-notched-outline">
              <span className="mdc-notched-outline__leading"></span>
              {props.label && (
              <span className="mdc-notched-outline__notch">
                <span className="mdc-floating-label">{props.label}</span>
              </span>
              )}
              <span className="mdc-notched-outline__trailing"></span>
            </span>
          )
          : (
            <>
              {props.label && <span className="mdc-floating-label">{props.label}</span>}
              <span className="mdc-line-ripple"></span>
            </>
          )}
      </div>
      <div className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
        <ul className="mdc-list" role="listbox">
        {props.items.map((item, i) => {
          const value = getItemValue(item, props.itemsValueAttr, i);
          const selectedText = props.itemsTextAttr ? item[props.itemsTextAttr] : item.toString();
          const selected = props.value && (props.value === value);
          return (
            <li className={selected ? 'mdc-list-item mdc-list-item--selected' : 'mdc-list-item'}
                data-value={value}
                role="option"
                aria-selected={selected ? 'true' : null}
                key={value}>
              <span className="mdc-list-item__ripple"></span>
              {selectedText && <span className="mdc-list-item__text">{selectedText}</span>}
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
}

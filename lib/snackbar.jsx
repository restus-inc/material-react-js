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

import React, { useRef, useEffect } from 'react';
import { MDCSnackbar } from '@material/snackbar';
import { useMDCComponent, useMDCEvent } from './hoocks';

const generateRootClassName = (props) => {
  const rootClasses = ['mdc-snackbar'];
  if (props.isStacked) {
    rootClasses.push('mdc-snackbar--stacked');
  }
  if (props.isLeading) {
    rootClasses.push('mdc-snackbar--leading');
  }
  return rootClasses.join(' ');
};

/**
 * [MDCSnackbar component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-snackbar#readme}
 * implemented by react component.
 * @function Snackbar
 * @param {Object} props
 * @param {string} props.label The text label on the snackbar.
 * @param {boolean} [props.isOpen] `true` if opening snackbar, otherwise `false`.
 * Default to `false`.
 * @param {string} [props.className] The class name that is added to the surface element.
 * @param {string} [props.actionLabel] The label of action button on the snackbar. Does not
 * specify if action button is not placed.
 * @param {string} [props.isStacked] Whether to put the action button bellow the label.
 * Default to `false`.
 * @param {string} [props.isLeading] Specifies `true` if the snackbar is displayed on the
 * leading egdge of the screen (the left side in LTR, or the right side in RTL). Specifying
 * `false`(default), the snackbar are centered horizontally within the viewport.
 * @param {React.MutableRefObject} [props.mdcSnackbarRef] MutableRefObject which bind an
 * MDCSnackbar instance to.
 * @param {EventHandler} [props.onOpening] Specifies event handler that is called when
 * the snackbar begins its opening animation.
 * @param {EventHandler} [props.onOpened] Specifies event handler that is called when
 * the snackbar finishes its opening animation.
 * @param {EventHandler} [props.onClosing] Specifies event handler that is called when
 * the snackbar begins its closing animation. `event.detail.reason` contains the reason
 * why the snackbar closed (`'dismiss'`, `'action'`, or `undefined`).
 * @param {EventHandler} [props.onClosed] Specifies event handler that is called when
 * the snackbar finishes its closing animation. `event.detail.reason` contains the reason
 * why the snackbar closed (`'dismiss'`, `'action'`, or `undefined`).
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function Snackbar(props) {
  const rootElementRef = useRef();
  const mdcSnackbarRef = useMDCComponent(
    MDCSnackbar,
    rootElementRef,
    props.mdcSnackbarRef,
  );

  useEffect(() => {
    if (props.isOpen === mdcSnackbarRef.current.isOpen) {
      return;
    }
    if (props.isOpen) {
      mdcSnackbarRef.current.open();
    } else {
      mdcSnackbarRef.current.close();
    }
  }, [props.isOpen, mdcSnackbarRef]);

  useMDCEvent(mdcSnackbarRef, 'MDCSnackbar:opening', props.onOpening);
  useMDCEvent(mdcSnackbarRef, 'MDCSnackbar:opened', props.onOpened);
  useMDCEvent(mdcSnackbarRef, 'MDCSnackbar:closing', props.onClosing);
  useMDCEvent(mdcSnackbarRef, 'MDCSnackbar:closed', props.onClosed);

  return (
    <div className={generateRootClassName(props)} ref={rootElementRef}>
      <div className={props.className ? `mdc-snackbar__surface ${props.className}` : 'mdc-snackbar__surface'}>
        <div className="mdc-snackbar__label"
             role="status"
             aria-live="polite">{props.label}</div>
        {props.actionLabel && (
        <div className="mdc-snackbar__actions">
          <button type="button" className="mdc-button mdc-snackbar__action">
            <div className="mdc-button__ripple"></div>
            <span className="mdc-button__label">{props.actionLabel}</span>
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

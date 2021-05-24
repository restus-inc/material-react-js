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
import { MDCDialog } from '@material/dialog';
import { useMDCEvent, useMDCComponent } from './hooks';

/**
 * An confirmation type [MDCDialog component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield#readme}
 * implemented by react component.
 * @function Dialog
 * @param {Object} props
 * @param {string} [props.title] The title of the dialog.
 * @param {boolean} [props.isOpen] `true` if opening dialog, otherwise `false`. Default to `false`.
 * @param {string} [props.className] The class name that is added to the surface element.
 * @param {Object[]} props.buttons Specifies the settings of the action buttons that
 * the dialog has.
 * @param {string} props.buttons[].action Mandatory. The identifer of the action button.
 * @param {string} props.buttons[].label The label of the action button.
 * @param {boolean} [props.buttons[].isDefault] Specifies `true` if the button means the
 * default action, otherwise `false`. Default to `false`.
 * @param {React.MutableRefObject} [props.mdcDialogRef] MutableRefObject which bind an
 * MDCDialog instance to.
 * @param {EventHandler} [props.onOpening] Specifies event handler that is called when
 * the dialog begins its opening animation.
 * @param {EventHandler} [props.onOpened] Specifies event handler that is called when
 * the dialog finishes its opening animation.
 * @param {EventHandler} [props.onClosing] Specifies event handler that is called when
 * the dialog begins its closing animation. `event.detail.action` represents the action which
 * closed the dialog.
 * @param {EventHandler} [props.onClosed] Specifies event handler that is called when
 * the dialog finishes its closing animation. `event.detail.action` represents the action which
 * closed the dialog.
 * @returns {DetailedReactHTMLElement}
 * @example
 * import React from 'react';
 * import { Dialog } from 'material-react-js';
 *
 * function MyDialog(props) {
 *   const buttons = [
 *     { action: 'close', label: 'Cancel', isDefault: true },
 *     { action: 'accept', label: 'OK' },
 *   ];
 *   function onClosed(event) {
 *     if (event.detail.action === 'accept') {
 *       props.acceptCallback();
 *     }
 *   }
 *   return (
 *     <Dialog title="Choose a Ringtone" buttons={buttons} onClosed={onClosed}>
 *       <ul className="mdc-list">
 *         <li className="mdc-list-item" tabIndex="0">
 *           <span className="mdc-list-item__graphic">
 *             <div className="mdc-radio">
 *               <input className="mdc-radio__native-control"
 *                      type="radio"
 *                      id="test-dialog-baseline-confirmation-radio-1"
 *                      name="test-dialog-baseline-confirmation-radio-group"
 *                      checked={true}>
 *               <div className="mdc-radio__background">
 *                 <div className="mdc-radio__outer-circle"></div>
 *                 <div className="mdc-radio__inner-circle"></div>
 *               </div>
 *             </div>
 *           </span>
 *           <label id="test-dialog-baseline-confirmation-radio-1-label"
 *                  htmlFor="test-dialog-baseline-confirmation-radio-1"
 *                  className="mdc-list-item__text">None</label>
 *         </li>
 *         <!-- ... -->
 *       </ul>
 *     </Dialog>
 *   );
 * }
 * @exports material-react-js
 */
export default function Dialog(props) {
  const rootElementRef = useRef();
  const mdcDialogRef = useMDCComponent(MDCDialog, rootElementRef, props.mdcDialogRef);

  useEffect(() => {
    if (props.isOpen === mdcDialogRef.current.isOpen) {
      return;
    }
    if (props.isOpen) {
      mdcDialogRef.current.open();
    } else {
      mdcDialogRef.current.close();
    }
  }, [props.isOpen, mdcDialogRef]);

  useMDCEvent(mdcDialogRef, 'MDCDialog:opening', props.onOpening);
  useMDCEvent(mdcDialogRef, 'MDCDialog:opened', props.onOpened);
  useMDCEvent(mdcDialogRef, 'MDCDialog:closing', props.onClosing);
  useMDCEvent(mdcDialogRef, 'MDCDialog:closed', props.onClosed);

  const buttons = props.buttons.map((buttonProp) => (
    <button type="button"
            className="mdc-button mdc-dialog__button"
            data-mdc-dialog-action={buttonProp.action}
            {...(buttonProp.isDefault ? { 'data-mdc-dialog-button-default': '' } : {})}
            key={buttonProp.action}>
      <div className="mdc-button__ripple"></div>
      <span className="mdc-button__label">{buttonProp.label}</span>
    </button>
  ));
  return (
    <div className="mdc-dialog" ref={rootElementRef}>
      <div className="mdc-dialog__container">
        <div className={props.className ? `mdc-dialog__surface ${props.className}` : 'mdc-dialog__surface'}
             role="alertdialog"
             aria-modal="true">
          {props.title && <h2 className="mdc-dialog__title">{props.title}</h2>}
          <div className="mdc-dialog__content">
            {props.children}
          </div>
          <div className="mdc-dialog__actions">
            {buttons}
          </div>
        </div>
      </div>
      <div className="mdc-dialog__scrim"></div>
    </div>
  );
}

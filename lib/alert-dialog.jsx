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

import React from 'react';
import Dialog from './dialog';

/**
 * An alert type [MDCDialog component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield#readme}
 * implemented by react component.
 * @function AlertDialog
 * @param {Object} props
 * @param {string} props.content The content of the dialog.
 * @param {boolean} [props.isOpen] `true` if opening dialog, otherwise `false`. Default to `false`.
 * @param {string} [props.className] The class name that is added to the surface element.
 * @param {Object[]} props.buttons Specifies the settings of the action buttons that
 * the dialog has.
 * @param {string} props.buttons[].action Mandatory. The identifer of the action button.
 * @param {string} props.buttons[].label The label of the action button.
 * @param {string} [props.buttons[].isDefault] Specifies `true` if the button means the
 * default action, otherwise `false`. Default to `false`.
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
 * @exports material-react-js
 */
export default function AlertDialog(props) {
  return (
    <Dialog isOpen={props.isOpen} className={props.className} buttons={props.buttons}
            onOpening={props.onOpening} onOpened={props.onOpened}
            onClosing={props.onClosing} onClosed={props.onClosed}>
      {props.content}
    </Dialog>
  );
}

import React, { useEffect, useRef } from 'react';
import { MDCDialog } from '@material/dialog';

const EVENTS = [
  { mdcEventName: 'opening', propsName: 'onOpening' },
  { mdcEventName: 'opened', propsName: 'onOpend' },
  { mdcEventName: 'closing', propsName: 'onClosing' },
  { mdcEventName: 'closed', propsName: 'onClosed' },
];

/**
 * An alert type [MDCDialog component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield#readme}
 * implemented by react component.
 * @param {Object} props
 * @param {string} props.content The content of the dialog.
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
 * @module material-react/lib/alert-dialog
 */
export default function AlertDialog(props) {
  const rootElement = useRef();
  const mdcComponent = useRef();

  useEffect(() => {
    mdcComponent.current = new MDCDialog(rootElement.current);
    mdcComponent.current.open();
    return () => {
      mdcComponent.current.destroy();
    };
  });

  EVENTS.forEach(({ mdcEventName, propsName }) => {
    useEffect(() => {
      const handler = props[propsName];
      if (!handler) {
        return undefined;
      }
      mdcComponent.current.listen(`MDCDialog:${mdcEventName}`, handler);
      return () => {
        mdcComponent.current.unlisten(`MDCDialog:${mdcEventName}`, handler);
      };
    }, [props[propsName]]);
  });

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
    <div className="mdc-dialog" ref={rootElement}>
      <div className="mdc-dialog__container">
        <div className={props.className ? `mdc-dialog__surface ${props.className}` : 'mdc-dialog__surface'}
             role="alertdialog"
             aria-modal="true"
             aria-describedby="dialog-content">
          <div className="mdc-dialog__content" id="dialog-content">{props.content}</div>
          <div className="mdc-dialog__actions">
            {buttons}
          </div>
        </div>
      </div>
      <div className="mdc-dialog__scrim"></div>
    </div>
  );
}

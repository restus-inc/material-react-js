import React from 'react';
import { MDCSnackbar } from '@material/snackbar';
import { handlerName } from './utils';

const EVENTS = ['opening', 'opened', 'closing', 'closed'];

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
 * [MDCSnackbar component]{@link https://github.com/YuoMamoru/material-components-web/tree/master/packages/mdc-snackbar#readme}
 * implemented by react component.
 * @param {Object} props
 * @param {string} props.label The text label on the snackbar.
 * @param {string} [props.actionLabel] The label of action button on the snackbar. Does not
 * specify if action button is not placed.
 * @param {string} [props.isStacked] Whether to put the action button bellow the label.
 * Default to `false`.
 * @param {string} [props.isLeading] Specifies `true` if the snackbar is displayed on the
 * leading egdge of the screen (the left side in LTR, or the right side in RTL). Specifying
 * `false`(default), the snackbar are centered horizontally within the viewport.
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
 * @module material-react/lib/snackbar
 */
export default function Snackbar(props) {
  const rootElement = React.useRef();

  React.useEffect(() => {
    const mdcComponent = new MDCSnackbar(rootElement.current);
    const handlers = EVENTS.reduce((array, eventName) => {
      const handler = props[handlerName(eventName)];
      if (handler) {
        array.push({ eventName, handler });
        mdcComponent.listen(`MDCSnackbar:${eventName}`, handler);
      }
      return array;
    }, []);
    mdcComponent.open();
    return () => {
      handlers.forEach(({ eventName, handler }) => {
        mdcComponent.unlisten(`MDCSnackbar:${eventName}`, handler);
      });
      mdcComponent.destroy();
    };
  });

  return (
    <div className={generateRootClassName(props)} ref={rootElement}>
      <div className="mdc-snackbar__surface">
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

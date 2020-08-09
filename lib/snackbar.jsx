import React, { useRef, useEffect } from 'react';
import { MDCSnackbar } from '@material/snackbar';

const EVENTS = [
  { mdcEventName: 'opening', propsName: 'onOpening' },
  { mdcEventName: 'opened', propsName: 'onOpend' },
  { mdcEventName: 'closing', propsName: 'onClosing' },
  { mdcEventName: 'closed', propsName: 'onClosed' },
];

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
 * @param {Object} props
 * @param {string} props.label The text label on the snackbar.
 * @param {boolean} [isOpen] `true` if opening snackbar, otherwise `false`. Default to `false`.
 * @param {string} [props.className] The class name that is added to the surface element.
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
  const rootElement = useRef();
  const mdcComponent = useRef();

  useEffect(() => {
    mdcComponent.current = new MDCSnackbar(rootElement.current);
    return () => {
      mdcComponent.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (props.isOpen === mdcComponent.current.isOpen) {
      return;
    }
    if (props.isOpen) {
      mdcComponent.current.open();
    } else {
      mdcComponent.current.close();
    }
  });

  EVENTS.forEach(({ mdcEventName, propsName }) => {
    useEffect(() => {
      const handler = props[propsName];
      if (!handler) {
        return undefined;
      }
      mdcComponent.current.listen(`MDCSnackbar:${mdcEventName}`, handler);
      return () => {
        mdcComponent.current.unlisten(`MDCSnackbar:${mdcEventName}`, handler);
      };
    }, [props[propsName]]);
  });

  return (
    <div className={generateRootClassName(props)} ref={rootElement}>
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

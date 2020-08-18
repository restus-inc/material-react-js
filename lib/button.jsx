import React, { useEffect, useRef } from 'react';
import { MDCRipple } from '@material/ripple';

const NON_NATIVE_PROPS = [
  'variation', 'label', 'className', 'icon', 'iconClassName', 'supportsTouch', 'ref',
  'disablesMdcInstance',
];

const generateRootClassName = (props) => {
  const rootClassNames = ['mdc-button'];
  switch (props.variation || 'text') {
    case 'text':
      break;
    case 'outlined':
      rootClassNames.push('mdc-button--outlined');
      break;
    case 'contained':
      rootClassNames.push('mdc-button--raised');
      break;
    default:
      throw new Error(`Not suported variation; ${props.variation}`);
  }
  if (props.supportsTouch) {
    rootClassNames.push('mdc-button--touch');
  }
  if (props.className) {
    rootClassNames.push(props.className);
  }
  return rootClassNames.join(' ');
};

function IconElement(props) {
  if (!props.icon && !props.iconClassName) {
    return null;
  }
  const iconClassName = props.iconClassName || 'material-icons';
  return <i className={`${iconClassName} mdc-button__icon`} aria-hidden="true">{props.icon}</i>;
}

/**
 * [MDCButton component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-button#readme}
 * implemented by react component.
 * @param {Object} props Attributes other than followings are passed to the `button`
 * element of React as is.
 * @param {string} [props.variation] The variation of the button. Supported variations are
 * `'text'`(default), `'outlined'` and `'contained'`.
 * @param {string} props.label The label text of the button.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.disabled] Specifies `true` if you want to disable the button.
 * Default to `false`.
 * @param {string} [props.icon] The inner text of the icon element if adding the icon.
 * The component renders an icon on the button if either this attribute or `props.iconClassName`
 * is present.
 * @param {string} [props.iconClassName] The class name that is added to the icon element if
 * adding the icon. The component renders an icon on the button if either this attribute or
 * `props.icon` is present.
 * @param {boolean} [props.disablesMdcInstance] Specifies `true` if you do not want to
 * instantiate MDC Component. Default to `false`.
 * @param {boolean} [props.supportsTouch] Whether to support touch in Material Design
 * specification. Material Design spec advises that touch targets should be at least 48 x 48 px.
 * @returns {DetailedReactHTMLElement}
 * @module material-react/lib/button
 */
export default function Button(props) {
  const rootElement = useRef();

  useEffect(() => {
    if (props.disablesMdcInstance) {
      return () => {};
    }
    const mdcComponent = new MDCRipple(rootElement.current);
    return () => {
      mdcComponent.destroy();
    };
  }, [props.disablesMdcInstance]);

  const buttonProps = Object.entries(props).reduce((newProps, [key, value]) => (
    !NON_NATIVE_PROPS.includes(key) ? Object.assign(newProps, { [key]: value }) : newProps
  ), { className: generateRootClassName(props), ref: rootElement });

  const button = (
    <button {...buttonProps}>
      <div className="mdc-button__ripple"></div>
      <IconElement {...props}/>
      <span className="mdc-button__label">{props.label}</span>
      {props.supportsTouch && <div className="mdc-button__touch"></div>}
    </button>
  );
  if (props.supportsTouch) {
    return <div className="mdc-touch-target-wrapper">{button}</div>;
  }
  return button;
}

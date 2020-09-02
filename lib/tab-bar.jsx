import React, { useRef, useEffect } from 'react';
import { MDCTabBar } from '@material/tab-bar';

/**
 * [MDCTabBar component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-bar#readme}
 * implemented by react component.
 * @function TabBar
 * @param {Object} props
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {EventHandler} [props.onActivated] An event handler of React that is associated with
 * `button` element.
 * @returns {DetailedReactHTMLElement}
 * @exports material-react-js
 */
export default function TabBar(props) {
  const rootElement = useRef();
  const mdcComponent = useRef();

  useEffect(() => {
    mdcComponent.current = new MDCTabBar(rootElement.current);
    return () => {
      mdcComponent.current.destroy();
    };
  }, props.children.map((child) => child.type));

  useEffect(() => {
    if (props.onActivated) {
      mdcComponent.current.listen('MDCTabBar:activated', props.onActivated);
    }
    return () => {
      if (props.onActivated) {
        mdcComponent.current.unlisten('MDCTabBar:activated', props.onActivated);
      }
    };
  }, [props.onActivated]);

  return (
    <div className={props.className ? `mdc-tab-bar ${props.className}` : 'mdc-tab-bar'} role="tablist" ref={rootElement}>
      <div className="mdc-tab-scroller">
        <div className="mdc-tab-scroller__scroll-area">
          <div className="mdc-tab-scroller__scroll-content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

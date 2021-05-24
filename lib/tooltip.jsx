/**
 * @license
 * Copyright 2021 Restus Inc.
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

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { MDCTooltip } from '@material/tooltip';
import { useMDCComponentRefProp } from './hooks';

function createTooltip(id) {
  const surfaceElement = document.createElement('div');
  surfaceElement.className = 'mdc-tooltip__surface mdc-tooltip__surface-animation';
  const tooltipElement = document.createElement('div');
  tooltipElement.setAttribute('role', 'tooltip');
  tooltipElement.setAttribute('aria-hidden', 'true');
  tooltipElement.appendChild(surfaceElement);
  tooltipElement.setAttribute('id', id);
  return tooltipElement;
}

/**
 * [MDCTooltip component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-tooltip#readme}
 * implemented by react component. This control supports plain tooltip only.
 * @function Tooltip
 * @param {Object} props
 * @param {string} [props.id] The ID of tooltip element. If not specified, a random string
 * will be set automatically.
 * @param {string} props.text The tooltip text.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {React.MutableRefObject} [props.mdcTooltipRef] MutableRefObject which bind an
 * MDCRipple instance to.
 * @returns {DetailedReactHTMLElement}
 * @example
 * import { Tooltip } from 'material-react-js';
 *
 * function MyLogoutIcon(props) {
 *   return (
 *     <Tooltip text="Logout">
 *       <button className="material-icons mdc-icon-button" aria-label="logout">logout</button>
 *     </Tooltip>
 *   );
 * }
 * @exports material-react-js
 */
export default function Tooltip(props) {
  const [id] = useState(props.id || `mrj-${Math.floor(Math.random() * 36 ** 8).toString(36).padStart(8, '0')}`);
  const mdcTooltipRef = useRef();

  useEffect(() => {
    const tooltipElement = createTooltip(id);
    document.body.appendChild(tooltipElement);
    mdcTooltipRef.current = new MDCTooltip(tooltipElement);
    return () => {
      mdcTooltipRef.current.destroy();
      document.body.removeChild(tooltipElement);
    };
  }, [id]);

  useEffect(() => {
    if (mdcTooltipRef.current) {
      ReactDOM.render(props.text, mdcTooltipRef.current.root.children[0]);
    }
  }, [props.text]);

  useEffect(() => {
    if (mdcTooltipRef.current) {
      const className = props.className ? `mdc-tooltip ${props.className}` : 'mdc-tooltip';
      mdcTooltipRef.current.root.className = className;
    }
  }, [props.className]);

  useMDCComponentRefProp(mdcTooltipRef, props.mdcTooltipRef);

  if (Array.isArray(props.children) || typeof props.children === 'string' || !props.children) {
    return <div aria-describedby={id}>{props.children}</div>;
  }
  return React.cloneElement(props.children, { 'aria-describedby': id });
}

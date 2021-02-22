/* eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsForRegex": ["Ref"] }] */

import { useEffect, useRef } from 'react';

export function useMDCEvent(mdcComponentRef, eventName, hander) {
  useEffect(() => {
    if (!hander) {
      return () => {};
    }
    const mdcComponent = mdcComponentRef.current;
    mdcComponent.listen(eventName, hander);
    return () => {
      mdcComponent.unlisten(eventName, hander);
    };
  }, [mdcComponentRef, eventName, hander]);
}

export function useMDCComponentRefProp(mdcComponentRef, mdcComponentRefProp) {
  useEffect(() => {
    if (mdcComponentRefProp) {
      mdcComponentRefProp.current = mdcComponentRef.current;
    }
  }, [mdcComponentRef, mdcComponentRefProp]);
}

export function useMDCComponent(
  MDCComponentConstructor,
  rootElementRef,
  mdcComponentRefProp,
  ignore = false,
  callback,
) {
  const mdcComponentRef = useRef();

  useEffect(() => {
    if (ignore || !rootElementRef.current) {
      mdcComponentRef.current = null;
      return () => {};
    }
    const mdcComponent = new MDCComponentConstructor(rootElementRef.current);
    mdcComponentRef.current = mdcComponent;
    if (callback) {
      callback(mdcComponent);
    }
    return () => {
      mdcComponent.destroy();
    };
  }, [MDCComponentConstructor, rootElementRef, ignore, callback]);

  useMDCComponentRefProp(mdcComponentRef, mdcComponentRefProp);
  return mdcComponentRef;
}

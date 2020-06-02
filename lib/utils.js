/**
 * Utilities for Material React.
 * @module material-react/lib/utils
 */

/**
 * Generates a rundom ID. The generated ID starts with basic latin child alphabet, and
 * subsequent characters consist of child alphanumeric character. (i.e. it matches
 * `/[a-z][a-z0-9]{digit-1}/`)
 * @param {number} [digit=8] The number of digit of the generated ID
 * @returns {string} The ID generated
 */
export function newId(digit = 8) {
  return (
    (Math.floor(Math.random() * 26) + 10) * (36 ** (digit - 1))
    + Math.floor(Math.random() * (36 ** (digit - 1)))
  ).toString(36);
}

/**
 * Converts the event name to event handler name.
 * @param {string} eventName The event name that is converted to the handler name
 * @return {string} The event handler name converted
 */
export function handlerName(eventName) {
  return `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
}

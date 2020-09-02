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

/* eslint object-curly-newline: ["error", { "minProperties": 6 }] */
import { render, cleanup, prettyDOM, buildQueries, queryHelpers } from '@testing-library/react';

export async function htmlOfRendering(ui) {
  const { container } = render(ui);
  const html = Array.from(container.childNodes).map((node) => (
    prettyDOM(node, null, { highlight: false })
  )).join('\n');
  await cleanup();
  return html;
}

export const [
  queryByOpenedMenu,
  getAllByOpenedMenu,
  getByOpenedMenu,
  findAllByOpenedMenu,
  findByOpenedMenu,
] = buildQueries(
  (container) => (container || document.body).querySelectorAll('.mdc-menu-surface.mdc-menu-surface--open'),
  () => 'Found multiple opened menus',
  () => 'Unable to find an opened menu',
);

export const [
  queryByMenuItem,
  getAllByMenuItem,
  getByMenuItem,
  findAllByMenuItem,
  findByMenuItem,
] = buildQueries(
  (container, text, options = {}) => (
    queryHelpers.queryAllByAttribute('data-value', container || document.body, text, options)
  ),
  (_, text) => `Found multiple menu items that have value: ${text}`,
  (_, text) => `Unable to find a menu item that has value: ${text}`,
);

export const [
  queryByOpenedSnackbar,
  getAllByOpenedSnackbar,
  getByOpenedSnackbar,
  findAllByOpenedSnackbar,
  findByOpenedSnackbar,
] = buildQueries(
  (container) => (container || document.body).querySelectorAll('.mdc-snackbar.mdc-snackbar--open:not(.mdc-snackbar--opening)'),
  () => 'Found multiple opened snackbars',
  () => 'Unable to find an opened snackbar',
);

export const [
  queryByOpenedDialog,
  getAllByOpenedDialog,
  getByOpenedDialog,
  findAllByOpenedDialog,
  findByOpenedDialog,
] = buildQueries(
  (container) => (container || document.body).querySelectorAll('.mdc-dialog.mdc-dialog--open:not(.mdc-dialog--opening)'),
  () => 'Found multiple opened dialogs',
  () => 'Unable to find an opened dialog',
);

export const [
  queryByDialogButton,
  getAllByDialogButton,
  getByDialogButton,
  findAllByDialogButton,
  findByDialogButton,
] = buildQueries(
  (container, text, options = {}) => (
    queryHelpers.queryAllByAttribute('data-mdc-dialog-action', container || document.body, text, options)
  ),
  (_, text) => `Found multiple dialog buttons that have action: ${text}`,
  (_, text) => `Unable to find a dialog button that has action: ${text}`,
);

export const [
  queryByDialogScrim,
  getAllByDialogScrim,
  getByDialogScrim,
  findAllByDialogScrim,
  findByDialogScrim,
] = buildQueries(
  (container) => (container || document.body).querySelectorAll('.mdc-dialog__scrim'),
  () => 'Found multiple dialog scrims',
  () => 'Unable to find a dialog scrim',
);

import React from 'react';

const headerCellClassName = (className, isNumeric) => {
  const classList = ['mdc-data-table__header-cell'];
  if (isNumeric) {
    classList.push('mdc-data-table__header-cell--numeric');
  }
  if (className) {
    classList.push(className);
  }
  return classList.join(' ');
};

const getHeaderContent = (content, data) => {
  if (typeof content === 'string') {
    return content;
  }
  if (typeof content === 'function') {
    return content(data);
  }
  return '';
};

function HeaderCell(props) {
  return (
    <th className={headerCellClassName(props.className, props.isNumeric)} role="columnheader" scope="col">
      {getHeaderContent(props.content, props.data)}
    </th>
  );
}

const cellClassName = (className, isNumeric) => {
  const classList = ['mdc-data-table__cell'];
  if (isNumeric) {
    classList.push('mdc-data-table__cell--numeric');
  }
  if (className) {
    classList.push(className);
  }
  return classList.join(' ');
};

const getContent = (content, rowData) => {
  if (typeof content === 'string') {
    return content.split('.').reduce((obj, accessor) => obj && obj[accessor], rowData);
  }
  if (typeof content === 'function') {
    return content(rowData);
  }
  return '';
};

function Cell(props) {
  if (props.isRowHeader) {
    return (
      <th className={cellClassName(props.className, props.isNumeric)} scope="row">
        {getContent(props.content, props.rowData)}
      </th>
    );
  }
  return (
    <td className={cellClassName(props.className, props.isNumeric)}>
      {getContent(props.content, props.rowData)}
    </td>
  );
}

/**
 * [MDCDataTable component]{@link https://github.com/YuoMamoru/material-components-web/tree/master/packages/mdc-data-table#readme}
 * implemented by react component.
 * @param {Object} props
 * @param {Object[]} props.data The data source of the table body contents.
 * @param {string} [props.keyField] The property name of data source used to uniquely
 * identify the data source an element. A nested property can be specified by connecting
 * then with `'.'`.
 * @param {string} props.className The class name that is added to the root element.
 * @param {boolean} [props.omitsHeaderRow] `true` if not display header row, otherwise `false`.
 * Default to `false`.
 * @param {Object[]} props.columns The setting of data table's columns.
 * @param {string} [props.columns[].key] The identifier for uniquely identifying the column.
 * @param {string|HeaderRenderer} [props.columns[].header] The header content of the column.
 * Mandatory if header row is shown.
 * @param {string|BodyRenderer} props.columns[].content The property name of the data source
 * used to get the content of the table body. A nested property can be specified by connecting
 * then with `'.'`.
 * @param {boolean} [props.columns[].isNumeric] `true` if this columns is a numeric column,
 * otherwise `false`. Default to `false`.
 * @param {boolean} [props.columns[].isRowHeader] `true` if a cells of this columns is a header
 * for each row, otherwise `false`. Default to `false`.
 * @param {string} [props.columns[].className] The class name that is added to cells of the
 * column.
 * @param {boolean} [props.columns[].headerClassName] The class name that is added to a cell
 * of the column in the header row.
 * @param {boolean} [props.columns[].bodyClassName] The class name that is added to cells
 * of the column in the body rows.
 * @param {string} [props.aria-label] The `aria-label` attribute added to the table tag.
 * @returns {DetailedReactHTMLElement}
 * @module material-react/lib/data-table
 */
export default function DataTable(props) {
  return (
    <div className={['mdc-data-table', props.className].join(' ').trim()}>
      <div className="mdc-data-table__table-container">
        <table className="mdc-data-table__table" aria-label={props['aria-label']}>
        {props.omitsHeaderRow
          ? null
          : (
            <thead>
              <tr className="mdc-data-table__header-row">
              {props.columns.map((column, j) => (
                <HeaderCell className={[column.className, column.headerClassName].join(' ').trim()}
                            isNumeric={column.isNumeric}
                            content={column.header}
                            data={props.data}
                            key={column.key || j}/>
              ))}
              </tr>
            </thead>
          )}
          <tbody className="mdc-data-table__content">
          {props.data.map((rowData, i) => {
            const key = props.keyField
              ? props.keyField.split('.').reduce((obj, accessor) => obj && obj[accessor], rowData)
              : i;
            return (
              <tr className="mdc-data-table__row" key={key}>
              {props.columns.map((column, j) => (
                <Cell className={[column.className, column.bodyClassName].join(' ').trim()}
                      isNumeric={column.isNumeric}
                      content={column.content}
                      isRowHeader={column.isRowHeader}
                      rowData={rowData}
                      key={column.key || j}/>
              ))}
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * The function that return the content of a cell in the header row.
 * @typedef {Function} HeaderRenderer
 * @param {Object[]} data The data source of this data table.
 * @returns {string|DetailedReactHTMLElement} The content of header cell.
 */

/**
 * The function that return the content of a cell in a body row.
 * @typedef {Function} BodyRenderer
 * @param {Object} rowData The data source element for the target row.
 * @returns {string|DetailedReactHTMLElement} The content of body cell.
 */

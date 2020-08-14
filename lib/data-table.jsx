import React, { useEffect, useRef } from 'react';
import { MDCDataTable } from '@material/data-table';

const headerCellClassName = (props) => {
  const classList = ['mdc-data-table__header-cell'];
  if (props.isNumeric) {
    classList.push('mdc-data-table__header-cell--numeric');
  }
  if (props.className) {
    classList.push(props.className);
  }
  if (props.isSortable) {
    classList.push('mdc-data-table__header-cell--with-sort');
    if (props.sortStatus) {
      classList.push('mdc-data-table__header-cell--sorted');
      if (props.sortStatus === 'descending') {
        classList.push('mdc-data-table__header-cell--sorted-descending');
      }
    }
  }
  return classList.join(' ');
};

function HeaderContent(props) {
  const child = props.content || '';
  if (props.isSortable) {
    return (
      <div className="mdc-data-table__header-cell-wrapper">
        {!props.isNumeric && <div className="mdc-data-table__header-cell-label">{child}</div>}
        <button className="mdc-icon-button material-icons mdc-data-table__sort-icon-button">arrow_upward</button>
        {props.isNumeric && <div className="mdc-data-table__header-cell-label">{child}</div>}
        <div className="mdc-data-table__sort-status-label" aria-hidden="true"></div>
      </div>
    );
  }
  return child;
}

function HeaderCell(props) {
  const attrs = {
    className: headerCellClassName(props),
    role: 'columnheader',
    scope: 'col',
    ...(props.isSortable ? {
      'aria-sort': props.sortStatus || 'none',
      'data-column-id': props.name,
    } : {}),
  };
  return (
    <th {...attrs}>
      <HeaderContent {...props}/>
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
 * [MDCDataTable component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-data-table#readme}
 * implemented by react component. This component can be used in combination with
 * [Pagenation]{@link module:material-react/lib/data-table-pagination}.
 * @param {Object} props
 * @param {Object[]} props.data The data source of the table body contents.
 * @param {string} [props.keyField] The property name of data source used to uniquely
 * identify the data source an element. A nested property can be specified by connecting
 * then with `'.'`.
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {boolean} [props.omitsHeaderRow] `true` if not display header row, otherwise `false`.
 * Default to `false`.
 * @param {Object[]} props.columns The setting of data table's columns.
 * @param {string} [props.columns[].key] The identifier for uniquely identifying the column.
 * @param {string} [props.columns[].header] The header content of the column.
 * @param {string|BodyRenderer} props.columns[].content The property name of the data source
 * used to get the content of the table body. A nested property can be specified by connecting
 * then with `'.'`.
 * @param {boolean} [props.columns[].isNumeric] Specify `true` if this columns is a numeric
 * column, otherwise `false`. Default to `false`.
 * @param {boolean} [props.columns[].isRowHeader] Specify `true` if a cells of this columns
 * is a header for each row, otherwise `false`. Default to `false`.
 * @param {string} [props.columns[].className] The class name that is added to cells of the
 * column.
 * @param {string} [props.columns[].headerClassName] The class name that is added to a cell
 * of the column in the header row.
 * @param {string} [props.columns[].bodyClassName] The class name that is added to cells
 * of the column in the body rows.
 * @param {boolean} [props.columns[].isSortable] Specify `true` if the column is sortable,
 * otherwise `false`. Default to `false`.
 * @param {string} [props.columns[].sortStatus] Specify `'ascending'` or `'descending'`
 * if the column is sorted. If `props.columns[].isSortable` is `false`, this attribute is
 * ignored.
 * @param {RowClassName} [props.rowClassName] The function to get the class name of
 * the table row.
 * @param {string} [props.aria-label] The `aria-label` attribute added to the table tag.
 * @param {EventHandler} [props.onSorted] Specifies event handler that is called when
 * sort icon of header cell is clicked.
 * @returns {DetailedReactHTMLElement}
 * @module material-react/lib/data-table
 */
export default function DataTable(props) {
  const sortable = props.columns.some((column) => column.isSortable);
  const rootElement = sortable ? useRef() : null;
  const mdcComponentRef = sortable ? useRef() : null;

  useEffect(() => {
    if (sortable) {
      mdcComponentRef.current = new MDCDataTable(rootElement.current);
    }

    // Instance is not destroyed due to a bug in MDCTable
    // return () => {
    //   if (mdcComponentRef.current) {
    //     mdcComponentRef.current.destroy();
    //   }
    // };
  }, []);

  useEffect(() => {
    if (sortable && props.onSorted) {
      mdcComponentRef.current.listen('MDCDataTable:sorted', props.onSorted);
    }
    return () => {
      if (sortable && props.onSorted) {
        mdcComponentRef.current.unlisten('MDCDataTable:sorted', props.onSorted);
      }
    };
  }, [props.onSorted]);

  return (
    <div className={props.className ? `mdc-data-table ${props.className}` : 'mdc-data-table'} ref={rootElement}>
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
                            isSortable={column.isSortable}
                            name={column.key}
                            sortStatus={column.sortStatus}
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
            const rowClassNames = ['mdc-data-table__row'];
            const additionalRowClassName = props.rowClassName && props.rowClassName(rowData);
            if (additionalRowClassName) {
              rowClassNames.push(additionalRowClassName);
            }
            return (
              <tr className={rowClassNames.join(' ')} key={key}>
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
      {props.children}
    </div>
  );
}

/**
 * The function that return the content of a cell in a body row.
 * @typedef {Function} BodyRenderer
 * @param {Object} rowData The data source element for the target row.
 * @returns {string|DetailedReactHTMLElement} The content of a body cell.
 */

/**
 * The function that return class name of a body row.
 * @typedef {Function} RowClassName
 * @param {Object} rowData The data source element for the target row.
 * @returns {string} The class name of a body row.
 */

import React, { useEffect, useRef } from 'react';
import { MDCDataTable } from '@material/data-table';
import Checkbox from './checkbox';

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
  if (props.isSortable) {
    return (
      <div className="mdc-data-table__header-cell-wrapper">
        {!props.isNumeric && <div className="mdc-data-table__header-cell-label">{props.children}</div>}
        <button className="mdc-icon-button material-icons mdc-data-table__sort-icon-button">arrow_upward</button>
        {props.isNumeric && <div className="mdc-data-table__header-cell-label">{props.children}</div>}
        <div className="mdc-data-table__sort-status-label" aria-hidden="true"></div>
      </div>
    );
  }
  return props.children || '';
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
        {props.content ? getContent(props.content, props.rowData) : props.children}
      </th>
    );
  }
  return (
    <td className={cellClassName(props.className, props.isNumeric)}>
      {props.content ? getContent(props.content, props.rowData) : props.children}
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
 * @param {boolean} [props.usesRowSelection] Specify `true` if table has the row selection
 * feature, otherwise `false`. Default to `false`.
 * @param {string} [props.selectionField] The property name of data source used to select
 * a row in the table. A nested property can be specified by connecting then with `'.'`.
 * @param {RowClassName} [props.rowClassName] The function to get the class name of
 * the table row.
 * @param {string} [props.aria-label] The `aria-label` attribute added to the table tag.
 * @param {EventHandler} [props.onRowSelectionChanged] Specifies event handler that is
 * called when row selection checkbox is clicked.
 * @param {EventHandler} [props.onSelectedAll] Specifies event handler that is called
 * when all rows are selected by clicking checkbox in header.
 * @param {EventHandler} [props.onUnselectedAll] Specifies event handler that is called
 * when all rows are unselected by clicking checkbox in header.
 * @param {EventHandler} [props.onSorted] Specifies event handler that is called when
 * sort icon of header cell is clicked.
 * @returns {DetailedReactHTMLElement}
 * @module material-react/lib/data-table
 */
export default function DataTable(props) {
  const sortable = props.columns.some((column) => column.isSortable);
  const rootElement = sortable || props.usesRowSelection ? useRef() : null;
  const mdcComponentRef = sortable || props.usesRowSelection ? useRef() : null;

  useEffect(() => {
    if (sortable || props.usesRowSelection) {
      mdcComponentRef.current = new MDCDataTable(rootElement.current);
    }

    return () => {
      if (mdcComponentRef && mdcComponentRef.current) {
        try {
          // Sometimes an error is thrown due to a bug in MDCTable
          mdcComponentRef.current.destroy();
        } catch (error) {
          // do nothing
        }
      }
    };
  }, [sortable, props.usesRowSelection, props.data]);

  useEffect(() => {
    if (!props.usesRowSelection || !props.onRowSelectionChanged) {
      return () => {};
    }
    mdcComponentRef.current.listen('MDCDataTable:rowSelectionChanged', props.onRowSelectionChanged);
    return () => {
      mdcComponentRef.current.unlisten('MDCDataTable:rowSelectionChanged', props.onRowSelectionChanged);
    };
  }, [props.usesRowSelection, props.onRowSelectionChanged]);

  useEffect(() => {
    if (!props.usesRowSelection || !props.onSelectedAll) {
      return () => {};
    }
    mdcComponentRef.current.listen('MDCDataTable:selectedAll', props.onSelectedAll);
    return () => {
      mdcComponentRef.current.unlisten('MDCDataTable:selectedAll', props.onSelectedAll);
    };
  }, [props.usesRowSelection, props.onSelectedAll]);

  useEffect(() => {
    if (!props.usesRowSelection || !props.onUnselectedAll) {
      return () => {};
    }
    mdcComponentRef.current.listen('MDCDataTable:unselectedAll', props.onUnselectedAll);
    return () => {
      mdcComponentRef.current.unlisten('MDCDataTable:unselectedAll', props.onUnselectedAll);
    };
  }, [props.usesRowSelection, props.onUnselectedAll]);

  useEffect(() => {
    if (!sortable || !props.onSorted) {
      return () => {};
    }
    mdcComponentRef.current.listen('MDCDataTable:sorted', props.onSorted);
    return () => {
      mdcComponentRef.current.unlisten('MDCDataTable:sorted', props.onSorted);
    };
  }, [sortable, props.onSorted]);

  return (
    <div className={props.className ? `mdc-data-table ${props.className}` : 'mdc-data-table'} ref={rootElement}>
      <div className="mdc-data-table__table-container">
        <table className="mdc-data-table__table" aria-label={props['aria-label']}>
        {props.omitsHeaderRow
          ? null
          : (
            <thead>
              <tr className="mdc-data-table__header-row">
              {props.usesRowSelection && (
                <HeaderCell className="mdc-data-table__header-cell--checkbox">
                  <Checkbox className="mdc-data-table__header-row-checkbox"
                            disablesMdcInstance={true}
                            aria-label="Toggle all rows"/>
                </HeaderCell>
              )}
              {props.columns.map((column, j) => (
                <HeaderCell className={[column.className, column.headerClassName].join(' ').trim()}
                            isNumeric={column.isNumeric}
                            data={props.data}
                            isSortable={column.isSortable}
                            name={column.key}
                            sortStatus={column.sortStatus}
                            key={column.key || j}>
                  {column.header}
                </HeaderCell>
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
            const selected = props.usesRowSelection && getContent(props.selectionField, rowData);
            if (selected) {
              rowClassNames.push('mdc-data-table__row--selected');
            }
            const additionalRowClassName = props.rowClassName && props.rowClassName(rowData);
            if (additionalRowClassName) {
              rowClassNames.push(additionalRowClassName);
            }
            return (
              <tr className={rowClassNames.join(' ')} key={key}
                  {...(props.usesRowSelection ? { 'data-row-id': key } : {})}>
              {props.usesRowSelection && (
                <Cell className="mdc-data-table__cell--checkbox">
                  <Checkbox className="mdc-data-table__row-checkbox"
                            defaultChecked={selected}
                            disablesMdcInstance={true}/>
                </Cell>
              )}
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

import React from 'react';
import Select from './select';

/**
 * Pagination for [MDCDataTable component]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-data-table#readme}
 * implemented by react component. This component is used as the child element of the
 * [DataTable]{@link module:material-react/lib/data-table}.
 * This component requires [MDCSelect]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-select#readme}
 * and [MDCIconButton]{@link https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button#readme}
 * to be installed in addition to MDCDataTable.
 * @param {Object} props
 * @param {string} [props.className] The class name that is added to the root element.
 * @param {number[]} [props.rowsCountList] Specifies array of number that can be set to rows
 * count per page. Default to `[10, 25, 50, 100]`.
 * @param {number} [props.defaultRowsCount] Specifies default rows count per page. Default
 * to first item of `props.rowsCountList`.
 * @param {string} [props.pageRowsLable] The label of select that specifies rows count per page.
 * @param {EventHandler} [props.onChangeRowsCount] Specifies event handler that is called when
 * select that specifies rows count per page is changed.
 * @param {string} [props.paginationLabel] The label that represents the current state of
 * pagination.
 * @param {boolean} [props.isLastPage] Specifies `true` if current page is the last page
 * otherwise `false`.
 * @param {boolean} [props.isFirstPage] Specifies `true` if current page is the first page
 * otherwise `false`.
 * @param {EventHandler} [props.onClickFirstPageIcon] Specifies event handler that is called when
 * first page icon is clicked.
 * @param {EventHandler} [props.onClickPrevPageIcon] Specifies event handler that is called when
 * previous page icon is clicked.
 * @param {EventHandler} [props.onClickNextPageIcon] Specifies event handler that is called when
 * next page icon is clicked.
 * @param {EventHandler} [props.onClickLastPageIcon] Specifies event handler that is called when
 * last page icon is clicked.
 * @returns {DetailedReactHTMLElement}
 * @example
 * import { DataTable, Pagination } from 'material-react';
 *
 * function MyTable(props) {
 *   return (
 *     <DataTable data={props.data} keyField="myKey" columns={props.columns}>
 *       <Pagination pageRowsLable="Rows per page" rowsCountList={[10, 25, 50]}
 *                   defaultRowsCount={10} paginationLabel="1-10 of 100" isFirstPage={true}/>
 *     </DataTable>
 *   );
 * }
 * @module material-react/lib/data-table-pagination
 */
export default function Pagination(props) {
  const rowsCountList = (props.rowsCountList || [10, 25, 50, 100]).map((n) => n.toString());
  const defaultRowsCount = (props.defaultRowsCount || rowsCountList[0]).toString();

  return (
    <div className={props.className ? `mdc-data-table__pagination ${props.className}` : 'mdc-data-table__pagination'}>
      <div className="mdc-data-table__pagination-trailing">
        <div className="mdc-data-table__pagination-rows-per-page">
        {props.pageRowsLable && (
          <div className="mdc-data-table__pagination-rows-per-page-label">{props.pageRowsLable}</div>
        )}
          <Select className="mdc-data-table__pagination-rows-per-page-select"
                  variation="outlined"
                  items={rowsCountList}
                  value={defaultRowsCount}
                  onChange={props.onChangeRowsCount}/>
        </div>
        <div className="mdc-data-table__pagination-navigation">
        {props.paginationLabel && (
          <div className="mdc-data-table__pagination-total">{props.paginationLabel}</div>
        )}
          <button className="mdc-icon-button material-icons mdc-data-table__pagination-button"
                  disabled={props.isFirstPage}
                  onClick={props.onClickFirstPageIcon}>
            <div className="mdc-button__icon">first_page</div>
          </button>
          <button className="mdc-icon-button material-icons mdc-data-table__pagination-button"
                  disabled={props.isFirstPage}
                  onClick={props.onClickPrevPageIcon}>
            <div className="mdc-button__icon">chevron_left</div>
          </button>
          <button className="mdc-icon-button material-icons mdc-data-table__pagination-button"
                  disabled={props.isLastPage}
                  onClick={props.onClickNextPageIcon}>
            <div className="mdc-button__icon">chevron_right</div>
          </button>
          <button className="mdc-icon-button material-icons mdc-data-table__pagination-button"
                  disabled={props.isLastPage}
                  onClick={props.onClickLastPageIcon}>
            <div className="mdc-button__icon">last_page</div>
          </button>
        </div>
      </div>
    </div>
  );
}

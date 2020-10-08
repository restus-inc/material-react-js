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

/* global jest, beforeAll, afterEach, describe, it, expect */
import 'regenerator-runtime/runtime';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { htmlOfRendering } from './utils';

import DataTable from '../lib/data-table';
import Pagination from '../lib/data-table-pagination';

describe('DataTable component', () => {
  let dataSource;

  beforeAll(() => {
    dataSource = [{
      id: 1,
      title: 'Eine kleine Nachtmusik',
      composer: { name: 'Wolfgang Amadeus Mozart', birthplace: 'Salzburg' },
      selected: true,
    }, {
      id: 2,
      title: 'Ode to Joy',
      composer: { name: 'Ludwig van Beethoven', birthplace: 'Bonn' },
    }, {
      id: 3,
      title: 'The Four Seasons',
      composer: { name: 'Antonio Vivaldi', birthplace: 'Venice' },
    }, {
      id: 4,
      title: 'Gregorian chant',
      composer: null,
      selected: true,
    }, {
      id: 5,
      title: 'Messiah',
      composer: { name: 'George Frideric Handel', birthplace: 'Halle' },
    }];
  });

  afterEach(async () => {
    await cleanup();
  });

  it('supports standard data table', () => {
    const columns = [{
      key: 'id',
      header: 'ID',
      content: 'id',
      isNumeric: true,
      isRowHeader: true,
      className: 'id-cell',
    }, {
      key: 'composer-name',
      header: 'Composer Name',
      content: 'composer.name',
      className: 'composer-cell',
      bodyClassName: 'composer-body-cell',
      headerAttrs: {
        title: 'composer-column',
      },
      bodyAttrs: {
        title: () => 'composer',
        'data-name': 'composer.name',
      },
    }, {
      key: 'detail-link',
      content: (music) => <a href={`./${music.id}`}>Show Details</a>, // eslint-disable-line react/display-name
      headerClassName: 'none',
    }];
    expect(htmlOfRendering(
      <DataTable data={dataSource} keyField="id" columns={columns} rowClassName={(row) => (row.id % 2 === 0 ? 'even' : 'odd')}/>,
    )).resolves.toMatchSnapshot();

    expect(htmlOfRendering(
      <DataTable className="my-table" data={dataSource} keyField="id" columns={columns} omitsHeaderRow={true}/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports data table with row selection', () => {
    const columns = [{
      key: 'id',
      header: 'ID',
      content: 'id',
      isNumeric: true,
      isRowHeader: true,
      className: 'id-cell',
    }, {
      key: 'composer-name',
      header: 'Composer Name',
      content: 'composer.name',
      className: 'composer-cell',
      bodyClassName: 'composer-body-cell',
    }, {
      key: 'detail-link',
      content: (music) => <a href={`./${music.id}`}>Show Details</a>, // eslint-disable-line react/display-name
      headerClassName: 'none',
    }];
    expect(htmlOfRendering(
      <DataTable data={dataSource} keyField="id" columns={columns}
                 usesRowSelection={true} selectionField="selected"/>,
    )).resolves.toMatchSnapshot();
  });

  it('supports data table with pagination', () => {
    const columns = [{
      key: 'id',
      header: 'ID',
      content: 'id',
      isNumeric: true,
      isRowHeader: true,
      className: 'id-cell',
    }, {
      key: 'composer-name',
      header: 'Composer Name',
      content: 'composer.name',
      className: 'composer-cell',
      bodyClassName: 'composer-body-cell',
    }, {
      key: 'detail-link',
      content: (music) => <a href={`./${music.id}`}>Show Details</a>, // eslint-disable-line react/display-name
      headerClassName: 'none',
    }];
    expect(htmlOfRendering((
      <DataTable data={dataSource} keyField="id" columns={columns}>
        <Pagination isFirstPage={true}/>
      </DataTable>
    ))).resolves.toMatchSnapshot();

    expect(htmlOfRendering((
      <DataTable className="my-table" data={dataSource} keyField="id" columns={columns}>
        <Pagination className="my-class" rowsCountList={[3, 5, 10]} defaultRowsCount={5}
                    pageRowsLable="Rows per page" paginationLabel="96-100 of 100"
                    isLastPage={true}/>
      </DataTable>
    ))).resolves.toMatchSnapshot();
  });

  it('supports data table with column sorting', () => {
    const columns = [{
      key: 'id',
      header: 'ID',
      content: 'id',
      isNumeric: true,
      isRowHeader: true,
      className: 'id-cell',
      isSortable: true,
      sortStatus: 'ascending',
    }, {
      key: 'composer-name',
      header: 'Composer Name',
      content: 'composer.name',
      className: 'composer-cell',
      bodyClassName: 'composer-body-cell',
      isSortable: true,
    }, {
      key: 'detail-link',
      content: (music) => <a href={`./${music.id}`}>Show Details</a>, // eslint-disable-line react/display-name
      headerClassName: 'none',
    }];
    expect(htmlOfRendering(
      <DataTable data={dataSource} keyField="id" columns={columns}/>,
    )).resolves.toMatchSnapshot();
  });

  it('fires onRowSelectionChanged, onSelectedAll and onUnselectedAll evnet when a checkbox is clicked', async () => {
    const columns = [{
      key: 'id',
      header: 'ID',
      content: 'id',
      isNumeric: true,
      isRowHeader: true,
      className: 'id-cell',
    }, {
      key: 'composer-name',
      header: 'Composer Name',
      content: 'composer.name',
      className: 'composer-cell',
      bodyClassName: 'composer-body-cell',
    }, {
      key: 'detail-link',
      content: (music) => <a href={`./${music.id}`}>Show Details</a>, // eslint-disable-line react/display-name
      headerClassName: 'none',
    }];
    let eventDetail = null;
    const onRowSelectionChanged = jest.fn((event) => {
      eventDetail = event.detail;
    });
    const onSelectedAll = jest.fn();
    const onUnselectedAll = jest.fn();

    const { container } = render(
      <DataTable data={dataSource} keyField="id" columns={columns}
                 usesRowSelection={true} selectionField="selected"
                 onRowSelectionChanged={onRowSelectionChanged}
                 onSelectedAll={onSelectedAll}
                 onUnselectedAll={onUnselectedAll}/>,
    );
    const headerCheckbox = container.querySelector('thead input[type="checkbox"]');
    const rowCheckboxes = container.querySelectorAll('tbody input[type="checkbox"]');
    const rowElements = container.querySelectorAll('tbody tr');
    expect(headerCheckbox.indeterminate).toBe(true);
    expect(headerCheckbox.checked).toBe(false);
    expect(rowCheckboxes[0].checked).toBe(true);
    expect(rowCheckboxes[1].checked).toBe(false);
    expect(rowCheckboxes[2].checked).toBe(false);
    expect(rowCheckboxes[3].checked).toBe(true);
    expect(rowCheckboxes[4].checked).toBe(false);

    userEvent.click(rowCheckboxes[0]);
    expect(onRowSelectionChanged).toHaveBeenCalledTimes(1);
    expect(eventDetail.row).toBe(rowElements[0]);
    expect(eventDetail).toMatchObject({ rowIndex: 0, selected: false });
    userEvent.click(rowCheckboxes[3]);
    expect(onRowSelectionChanged).toHaveBeenCalledTimes(2);
    expect(eventDetail.row).toBe(rowElements[3]);
    expect(eventDetail).toMatchObject({ rowIndex: 3, selected: false });
    expect(headerCheckbox.indeterminate).toBe(false);
    expect(headerCheckbox.checked).toBe(false);
    expect(rowCheckboxes[0].checked).toBe(false);
    expect(rowCheckboxes[1].checked).toBe(false);
    expect(rowCheckboxes[2].checked).toBe(false);
    expect(rowCheckboxes[3].checked).toBe(false);
    expect(rowCheckboxes[4].checked).toBe(false);

    userEvent.click(rowCheckboxes[2]);
    expect(eventDetail.row).toBe(rowElements[2]);
    expect(onRowSelectionChanged).toHaveBeenCalledTimes(3);
    expect(eventDetail).toMatchObject({ rowIndex: 2, selected: true });
    expect(headerCheckbox.indeterminate).toBe(true);
    expect(headerCheckbox.checked).toBe(false);
    expect(rowCheckboxes[0].checked).toBe(false);
    expect(rowCheckboxes[1].checked).toBe(false);
    expect(rowCheckboxes[2].checked).toBe(true);
    expect(rowCheckboxes[3].checked).toBe(false);
    expect(rowCheckboxes[4].checked).toBe(false);

    userEvent.click(headerCheckbox);
    expect(onSelectedAll).toHaveBeenCalledTimes(1);
    expect(onUnselectedAll).not.toHaveBeenCalled();
    expect(headerCheckbox.checked).toBe(true);
    expect(rowCheckboxes[0].checked).toBe(true);
    expect(rowCheckboxes[1].checked).toBe(true);
    expect(rowCheckboxes[2].checked).toBe(true);
    expect(rowCheckboxes[3].checked).toBe(true);
    expect(rowCheckboxes[4].checked).toBe(true);

    userEvent.click(headerCheckbox);
    expect(onSelectedAll).toHaveBeenCalledTimes(1);
    expect(onUnselectedAll).toHaveBeenCalledTimes(1);
    expect(headerCheckbox.checked).toBe(false);
    expect(rowCheckboxes[0].checked).toBe(false);
    expect(rowCheckboxes[1].checked).toBe(false);
    expect(rowCheckboxes[2].checked).toBe(false);
    expect(rowCheckboxes[3].checked).toBe(false);
    expect(rowCheckboxes[4].checked).toBe(false);
  });

  it('fires onSorted evnet when a sort icon is clicked', async () => {
    const columns = [{
      key: 'id',
      header: 'ID',
      content: 'id',
      isNumeric: true,
      isRowHeader: true,
      className: 'id-cell',
      isSortable: true,
      sortStatus: 'ascending',
    }, {
      key: 'composer-name',
      header: 'Composer Name',
      content: 'composer.name',
      className: 'composer-cell',
      bodyClassName: 'composer-body-cell',
      isSortable: true,
    }, {
      key: 'detail-link',
      content: (music) => <a href={`./${music.id}`}>Show Details</a>, // eslint-disable-line react/display-name
      headerClassName: 'none',
    }];
    let eventDetail = null;
    const onSorted = jest.fn((event) => {
      eventDetail = event.detail;
    });

    const { container } = render(
      <DataTable data={dataSource} keyField="id" columns={columns} onSorted={onSorted}/>,
    );
    const sortButtons = container.querySelectorAll('thead button');

    userEvent.click(sortButtons[0]);
    expect(onSorted).toHaveBeenCalledTimes(1);
    expect(eventDetail).toMatchObject({ columnId: 'id', columnIndex: 0, sortValue: 'descending' });

    userEvent.click(sortButtons[0]);
    expect(onSorted).toHaveBeenCalledTimes(2);
    expect(eventDetail).toMatchObject({ columnId: 'id', columnIndex: 0, sortValue: 'ascending' });

    userEvent.click(sortButtons[1]);
    expect(onSorted).toHaveBeenCalledTimes(3);
    expect(eventDetail).toMatchObject({ columnId: 'composer-name', columnIndex: 1, sortValue: 'ascending' });

    userEvent.click(sortButtons[1]);
    expect(onSorted).toHaveBeenCalledTimes(4);
    expect(eventDetail).toMatchObject({ columnId: 'composer-name', columnIndex: 1, sortValue: 'descending' });

    userEvent.click(sortButtons[0]);
    expect(onSorted).toHaveBeenCalledTimes(5);
    expect(eventDetail).toMatchObject({ columnId: 'id', columnIndex: 0, sortValue: 'ascending' });
  });

  it('fires onSorted evnet when a sort icon is clicked', async () => {
    const columns = [{
      key: 'id',
      header: 'ID',
      content: 'id',
      isNumeric: true,
      isRowHeader: true,
      className: 'id-cell',
    }, {
      key: 'composer-name',
      header: 'Composer Name',
      content: 'composer.name',
      className: 'composer-cell',
      bodyClassName: 'composer-body-cell',
    }, {
      key: 'detail-link',
      content: (music) => <a href={`./${music.id}`}>Show Details</a>, // eslint-disable-line react/display-name
      headerClassName: 'none',
    }];
    const onClickFirstPageIcon = jest.fn();
    const onClickPrevPageIcon = jest.fn();
    const onClickNextPageIcon = jest.fn();
    const onClickLastPageIcon = jest.fn();

    const { container } = render((
      <DataTable data={dataSource} keyField="id" columns={columns}>
        <Pagination pageRowsLable="Rows per page" paginationLabel="81-90 of 108"
                    onClickFirstPageIcon={onClickFirstPageIcon}
                    onClickPrevPageIcon={onClickPrevPageIcon}
                    onClickNextPageIcon={onClickNextPageIcon}
                    onClickLastPageIcon={onClickLastPageIcon}/>
      </DataTable>
    ));
    const [
      firstPageIcon,
      prevPageIcon,
      nextPageIcon,
      lastPageIcon,
    ] = container.querySelectorAll('.mdc-data-table__pagination-navigation button');

    userEvent.click(firstPageIcon);
    expect(onClickFirstPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickPrevPageIcon).not.toHaveBeenCalled();
    expect(onClickNextPageIcon).not.toHaveBeenCalled();
    expect(onClickLastPageIcon).not.toHaveBeenCalled();

    userEvent.click(prevPageIcon);
    expect(onClickFirstPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickPrevPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickNextPageIcon).not.toHaveBeenCalled();
    expect(onClickLastPageIcon).not.toHaveBeenCalled();

    userEvent.click(nextPageIcon);
    expect(onClickFirstPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickPrevPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickNextPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickLastPageIcon).not.toHaveBeenCalled();

    userEvent.click(lastPageIcon);
    expect(onClickFirstPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickPrevPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickNextPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickLastPageIcon).toHaveBeenCalledTimes(1);

    userEvent.click(prevPageIcon);
    expect(onClickFirstPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickPrevPageIcon).toHaveBeenCalledTimes(2);
    expect(onClickNextPageIcon).toHaveBeenCalledTimes(1);
    expect(onClickLastPageIcon).toHaveBeenCalledTimes(1);
  });
});

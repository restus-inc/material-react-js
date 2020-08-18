/* global jest, beforeAll, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import DataTable from '../lib/data-table';
import Pagination from '../lib/data-table-pagination';

jest.mock('@material/data-table');
jest.mock('@material/select');

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
    }, {
      key: 'detail-link',
      content: (music) => <a href={`./${music.id}`}>Show Details</a>, // eslint-disable-line react/display-name
      headerClassName: 'none',
    }];
    let component = renderer.create(
      <DataTable data={dataSource} keyField="id" columns={columns} rowClassName={(row) => (row.id % 2 === 0 ? 'even' : 'odd')}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <DataTable className="my-table" data={dataSource} keyField="id" columns={columns} omitsHeaderRow={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
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
    const component = renderer.create(
      <DataTable data={dataSource} keyField="id" columns={columns}
                 usesRowSelection={true} selectionField="selected"/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
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
    let component = renderer.create(
      <DataTable data={dataSource} keyField="id" columns={columns}>
        <Pagination isFirstPage={true}/>
      </DataTable>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <DataTable className="my-table" data={dataSource} keyField="id" columns={columns}>
        <Pagination className="my-class" rowsCountList={[3, 5, 10]} defaultRowsCount={5}
                    pageRowsLable="Rows per page" paginationLabel="96-100 of 100"
                    isLastPage={true}/>
      </DataTable>,
    );
    expect(component.toJSON()).toMatchSnapshot();
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
    const component = renderer.create(
      <DataTable data={dataSource} keyField="id" columns={columns}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

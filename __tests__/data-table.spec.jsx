/* global beforeAll, describe, it, expect */
import React from 'react';
import renderer from 'react-test-renderer';

import DataTable from '../lib/data-table';

describe('DataTable component', () => {
  let dataSource;

  beforeAll(() => {
    dataSource = [{
      id: 1,
      title: 'Eine kleine Nachtmusik',
      composer: { name: 'Wolfgang Amadeus Mozart', birthplace: 'Salzburg' },
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
      <DataTable data={dataSource} keyField="id" columns={columns} rowClassName={(row) => (row.id % 2 === 0 ? 'even' : 'odd') }/>,
    );
    expect(component.toJSON()).toMatchSnapshot();

    component = renderer.create(
      <DataTable className="my-table" data={dataSource} keyField="id" columns={columns} omitsHeaderRow={true}/>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

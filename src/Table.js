import React from 'react';
import DataTable from 'react-data-table-component'

const Table = ({ title, data, columns }) => (
    <DataTable
        highlightOnHover={true}
        striped={true}
        title={title}
        defaultSortField="date"
        columns={columns}
        data={data}
    />
);
export default Table;


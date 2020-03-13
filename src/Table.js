import React from 'react';
import DataTable from 'react-data-table-component'

const Table = ({ title, data, columns }) => {
        return (
        <DataTable
            title={title}
            defaultSortField="date"
            columns={columns}
            data={data}
        />
    )
};
export default Table;


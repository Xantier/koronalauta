import React from 'react';
import DataTable from 'react-data-table-component'
import {isMobile} from 'react-device-detect';

const Table = ({ title, data, columns, pending }) => (
    <DataTable
        highlightOnHover={true}
        striped={true}
        title={title}
        defaultSortField="date"
        defaultSortAsc={false}
        columns={columns}
        data={data}
        progressPending={pending}
        pagination
        dense={isMobile}
    />
);
export default Table;


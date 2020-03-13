import React from 'react';
import DataTable from 'react-data-table-component'
import {isMobile} from 'react-device-detect';
import orderBy from 'lodash/orderBy';
import trim from 'lodash/trim';


const customSort = (rows, field, direction) => {
    const handleField = row => {
        if (row[field]) {
            const number = parseInt(trim(row[field]), 10);
            return isNaN(number) ? row[field].toLowerCase() : number;
        }
        return row[field];
    };

    return orderBy(rows, handleField, direction);
};


const Table = ({ title, data, columns, pending }) => {

    const handleSort = (column, sortDirection) => console.log(column.selector, sortDirection);
    return (
        <DataTable
            highlightOnHover={true}
            striped={true}
            title={title}
            defaultSortField="id"
            defaultSortAsc={false}
            columns={columns}
            data={data}
            progressPending={pending}
            pagination
            dense={isMobile}
            sortFunction={customSort}
        />
    );
};
export default Table;


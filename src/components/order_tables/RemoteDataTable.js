import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import DataTable from 'react-data-table-component'

export default function RemoteDataTable({title, columns, fetchPaginatedData, isPaginated=true, preselectedRows, onSelectedRowsChange}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(10)
    const [selectedRows, setSelectedRows] = useState(preselectedRows)

    const handleRowSelected = (state) => {
        if (!_.isEqual(selectedRows, state.selectedRows)) {
            setSelectedRows(state.selectedRows)
            onSelectedRowsChange && onSelectedRowsChange(state.selectedRows);
        }
	}

    const fetchData = async (page) => {
        setLoading(true)
        let result = await fetchPaginatedData(page, perPage)
        setData(result.data)
        setTotalRows(result.total)
        setLoading(false)
    }

    const handleRowsPerPageChange = async (newPerPage, page) => {
        setLoading(true)
        let result = await fetchPaginatedData(page, newPerPage)
        setData(result.data)
        setTotalRows(result.total)
        setPerPage(newPerPage)
        setLoading(false)
    }

    useEffect(() => {
        fetchData(1)
    }, [])

    let preselectedOrderIds = new Set((preselectedRows||[]).map(row => row.id))

    return <>
        <DataTable
            title={title}
            columns={columns}
            data={data}
            progressPending={loading}
            {...(isPaginated ? {
                pagination: true,
                paginationServer: true,
                paginationTotalRows: totalRows,
                onChangeRowsPerPage: handleRowsPerPageChange,
                onChangePage: fetchData
            } : {})}
            selectableRows
            selectableRowSelected={row => preselectedOrderIds.has(row.id)}
            onSelectedRowsChange={handleRowSelected}
        />
    </>
}
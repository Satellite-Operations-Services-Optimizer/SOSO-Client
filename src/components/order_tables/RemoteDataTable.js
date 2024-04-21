import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

export default function RemoteDataTable({title, columns, fetchPaginatedData, preselectedRows, onSelectedRowsChange}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [perPage, setPerPage] = useState(25)
    const [selectedRows, setSelectedRows] = useState([])

    const handleRowSelected = React.useCallback(state => {
		setSelectedRows(state.selectedRows);
        onSelectedRowsChange(selectedRows);
	}, []);

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

    preselectedRows = new Set(preselectedRows)
    console.log(totalRows)

    return <>
        <DataTable
            title={title}
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handleRowsPerPageChange}
            onChangePage={fetchData}
            selectableRows
            selectableRowsSelected={row => preselectedRows.has(row)}
            onSelectedRowsChange={handleRowSelected}
        />
    </>
}
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import DataTable from 'react-data-table-component'
import { Button } from 'react-bootstrap'
import styles from '../../styles/dashboard.module.scss'
import differenceBy from 'lodash/differenceBy';

export default function RemoteDataTable({title, columns, fetchPaginatedData, isPaginated=true, isSelectable=true, preselectedRows, onSelectedRowsChange, hasAction=true, actionTitle, actionWarning, handleAction, rowDisabledCriteria}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalRows, setTotalRows] = useState(0)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedRows, setSelectedRows] = useState(preselectedRows||[])
	const [toggleCleared, setToggleCleared] = React.useState(false);

    let selectedOrderIds = new Set(selectedRows.map(row => row.id))
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

    const handlePageChange = (page) => {
        setPage(page)
        fetchData(page)
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

    const contextActions = React.useMemo(() => {
		const actionHandler = async () => {
			if (window.confirm(actionWarning)) {
				setToggleCleared(!toggleCleared);
                setSelectedRows([]);
                await handleAction(selectedRows);
                fetchData(page)
			}
		};

        return (
            <Button type="button" onClick={() => actionHandler(selectedRows)} className="btn btn-danger">
                {actionTitle}
            </Button>
        );
	}, [data, selectedRows, toggleCleared]);

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
                onChangePage: handlePageChange
            } : {})}
            {...(isSelectable ? {
                selectableRows: true,
                selectableRowSelected: row => selectedOrderIds.has(row.id),
                onSelectedRowsChange: handleRowSelected,
            } : {})}
            {...(rowDisabledCriteria ? {
                selectableRowDisabled: row => rowDisabledCriteria(row)
            } : {})}
            clearSelectedRows={toggleCleared}
            {...(hasAction ? {
                contextActions: contextActions
            } : {})}
        />
    </>
}
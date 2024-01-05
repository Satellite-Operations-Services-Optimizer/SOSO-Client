import React, {useEffect, useState} from 'react';
import { useTable, useFilters, useRowSelect, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { BiSearch,  BiDownArrowAlt , BiUpArrowAlt } from 'react-icons/bi';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import styles from '../styles/dataTable.module.scss';

const DataTable = ({search, tablePagination, columns, data, actionBtn, actionBtnText , rowSeletion, maintenanceButton }) => {  
  const [totalCount, setTotalCount] = useState(data.length);
  const [checked, setChecked] = useState(false);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter,
    pageOptions,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    gotoPage,
    setFilter,
    setPageSize,
    state: { selectedRowIds },
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    
    (hooks) => {
      rowSeletion && hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div className={styles.checkbox}>
              {/* <input type="checkbox" {...getToggleAllRowsSelectedProps()} /> */}
            </div>
          ),
          Cell: ({ row }) => (
            <div className={styles.checkbox}>
              <input type="checkbox"  {...row.getToggleRowSelectedProps()}/>
              <svg className={styles.checkBoxIcon} viewBox="0 0 16 16" width="16px" height="16px">
                <path className={styles.checkBoxIconEmpty} d="M 14.4 0 L 1.6 0 C 0.712 0 0 0.712 0 1.6 L 0 14.4 C 0 15.284 0.716 16 1.6 16 L 14.4 16 C 15.284 16 16 15.284 16 14.4 L 16 1.6 C 16 0.712 15.28 0 14.4 0 Z  M 14 2 L 14 14 L 2 14 L 2 2 L 14 2 Z" fill="#000"></path>
                <path className={styles.checkBoxIconCheck} d="M 14.4 0 L 1.6 0 C 0.712 0 0 0.712 0 1.6 L 0 14.4 C 0 15.284 0.716 16 1.6 16 L 14.4 16 C 15.284 16 16 15.284 16 14.4 L 16 1.6 C 16 0.712 15.28 0 14.4 0 Z  M 12.736 2.88 L 14.4 4.288 L 5.44 12.992 L 4.8 12.352 L 1.6 9.152 L 3.008 7.744 L 5.44 10.176 L 12.736 2.88 Z" fill="#000"></path>
                <path className={styles.checkBoxIconMinus} d="M 14.4 0 L 1.6 0 C 0.712 0 0 0.712 0 1.6 L 0 14.4 C 0 15.284 0.716 16 1.6 16 L 14.4 16 C 15.284 16 16 15.284 16 14.4 L 16 1.6 C 16 0.712 15.28 0 14.4 0 Z  M 13.333 9.067 L 2.667 9.067 L 2.667 6.933 L 13.333 6.933 L 13.333 9.067 Z " fill="#000"></path>
              </svg>
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    setChecked(Object.keys(selectedRowIds).length === rows.length || Object.keys(selectedRowIds).length > 0);
  }, [Object.keys(selectedRowIds).length]);

  return (
    <>
      <div className={styles.tableTopWrap}>
        <div className={styles.tableTopLeft}>
          {search && <div className={styles.searchWrap}>
            <BiSearch />
            <Form.Control  
              type="search" 
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)} 
              placeholder="Search" 
              />
          </div>}
          {rowSeletion &&
            <Dropdown className={styles.checkDropdown}>
              <Dropdown.Toggle id="dropdown-basic" className={styles.checkDropdownBtn}>
                <label>
                  <input
                    type="checkbox"
                    checked={Object.keys(selectedRowIds).length === rows.length || Object.keys(selectedRowIds).length > 0}
                    onChange={() => toggleAllRowsSelected()}
                    className={styles.checkInput}
                  />
                  <svg className={styles.checkBoxIcon} viewBox="0 0 16 16" width="16px" height="16px">
                    <path className={styles.checkBoxIconEmpty} d="M 14.4 0 L 1.6 0 C 0.712 0 0 0.712 0 1.6 L 0 14.4 C 0 15.284 0.716 16 1.6 16 L 14.4 16 C 15.284 16 16 15.284 16 14.4 L 16 1.6 C 16 0.712 15.28 0 14.4 0 Z  M 14 2 L 14 14 L 2 14 L 2 2 L 14 2 Z" fill="#000"></path>
                    <path className={styles.checkBoxIconCheck} d="M 14.4 0 L 1.6 0 C 0.712 0 0 0.712 0 1.6 L 0 14.4 C 0 15.284 0.716 16 1.6 16 L 14.4 16 C 15.284 16 16 15.284 16 14.4 L 16 1.6 C 16 0.712 15.28 0 14.4 0 Z  M 12.736 2.88 L 14.4 4.288 L 5.44 12.992 L 4.8 12.352 L 1.6 9.152 L 3.008 7.744 L 5.44 10.176 L 12.736 2.88 Z" fill="#000"></path>
                    <path className={styles.checkBoxIconMinus} d="M 14.4 0 L 1.6 0 C 0.712 0 0 0.712 0 1.6 L 0 14.4 C 0 15.284 0.716 16 1.6 16 L 14.4 16 C 15.284 16 16 15.284 16 14.4 L 16 1.6 C 16 0.712 15.28 0 14.4 0 Z  M 13.333 9.067 L 2.667 9.067 L 2.667 6.933 L 13.333 6.933 L 13.333 9.067 Z " fill="#000"></path>
                  </svg>
                </label>
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.checkDropdownMenu}>
                <Dropdown.Item onClick={() => toggleAllRowsSelected(true)}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => toggleAllRowsSelected(false)}>None</Dropdown.Item>
                <Dropdown.Item onClick={() => toggleAllRowsSelected(false)}>Clear</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            }
          {actionBtn && checked ? <Button type="button" className={styles.actionBtn}>{actionBtnText}</Button> : ""}
        </div>
        
        {tablePagination && <div className={maintenanceButton ? styles.tablePaginationBtn : styles.tablePagination}>
          <Dropdown className={styles.rowCountDropdown}>
            <Dropdown.Toggle id="dropdown-basic" className={styles.rowCountDropdownBtn}>
              Page 1 of 10
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.rowCountDropdownMenu}>
              <Dropdown.Item>15</Dropdown.Item>
              <Dropdown.Item>50</Dropdown.Item>
              <Dropdown.Item>100</Dropdown.Item>
              <Dropdown.Item>200</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button 
            type="button" 
            // onClick={() => previousPage()} 
            disabled={pageIndex === 0} 
            className={styles.prevBtn}>
            <LiaAngleLeftSolid />
          </Button>
          {/* <span>Page {pageIndex + 1} of {pageCount}</span> */}
          <Button 
            type="button" 
            // onClick={() => nextPage()} 
            disabled={pageIndex === pageCount - 1} 
            className={styles.nextBtn}>
            <LiaAngleRightSolid />
          </Button>
        </div>}
      </div>
      <div className={`responsive-table ${styles.productTableWrap}`}>
        <table {...getTableProps()} className={`table ${styles.productTable}`}>
          <thead>
            {headerGroups.map((headerGroup, column) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ?  <BiDownArrowAlt /> : <BiUpArrowAlt />) : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
             prepareRow(row);
             const isRowSelected = selectedRowIds[row.id];
              return (
                // <tr {...row.getRowProps()}>
                //   {row.cells.map((cell) => {
                //     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                //   })}
                // </tr>
                <tr 
                  {...row.getRowProps()} 
                  style={{
                    background: isRowSelected ? '#fffedd' : '#ffffff', // Highlight color for selected rows
                  }}>
                {row.cells.map(cell => {
                  // Create a custom cell component to render the image and name together
                  if (cell.column.id === 'product') {
                    return (
                      <td {...cell.getCellProps()} style={{ borderBottom: '1px solid black' }}>
                        <div className={styles.product}>
                          <img src={cell.row.original.image} alt={cell.row.original.name} />
                          <span>{cell.row.original.name}</span>
                        </div>
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()} style={{ borderBottom: '1px solid black' }}>
                        {cell.render('Cell')}
                      </td>
                    );
                  }
                })}
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
import React, {useState} from 'react';
import { useTable, useFilters, useRowSelect, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { Form, Button } from 'react-bootstrap';
import { BiSearch,  BiDownArrowAlt , BiUpArrowAlt } from 'react-icons/bi';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import styles from '../styles/dataTable.module.scss';

const DataTable = ({search, tablePagination, columns, data }) => {  
  const [totalCount, setTotalCount] = useState(data.length);

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
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: 'selection',
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div className={styles.checkbox}>
    //           <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       Cell: ({ row }) => (
    //         <div className={styles.checkbox}>
    //           <input type="checkbox" {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className={styles.filterSearchWrap}>
        {search && <div className={styles.searchWrap}>
          <BiSearch />
          <Form.Control  
            type="search" 
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)} 
            placeholder="Search" 
            />
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
              return (
                // <tr {...row.getRowProps()}>
                //   {row.cells.map((cell) => {
                //     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                //   })}
                // </tr>
                <tr {...row.getRowProps()}>
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
      
      {tablePagination && <div className={styles.tablePagination}>
        <Button type="button" onClick={() => previousPage()} disabled={pageIndex === 0} className={styles.prevBtn}>
          <LiaAngleLeftSolid /> Prev
        </Button>
        <span>Page {pageIndex + 1} of {pageCount}</span>
        <Button type="button" onClick={() => nextPage()} disabled={pageIndex === pageCount - 1} className={styles.nextBtn}>
          Next <LiaAngleRightSolid />
        </Button>
      </div>}
    </>
  );
};

export default DataTable;
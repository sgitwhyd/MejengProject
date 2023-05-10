import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";

const Table = ({ columns, data, numberToShow }) => {
	const tableInstance = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: numberToShow },
		},
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		nextPage,
		previousPage,
		state: { pageIndex },
	} = tableInstance;

	return (
		<div className='overflow-x-auto'>
			<table className='table w-full' {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									{/* Add a sort direction indicator */}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? " 🔽"
												: " 🔼"
											: ""}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='pagination flex justify-end py-5 pr-5'>
				<div className='btn-group'>
					<button
						className='btn btn-xs'
						onClick={() => previousPage()}
						disabled={!canPreviousPage}>
						«
					</button>
					<button className='btn no-animation btn-xs bg-primary'>
						Page {pageIndex + 1} of {pageOptions.length}
					</button>
					<button
						className='btn btn-xs'
						onClick={() => nextPage()}
						disabled={!canNextPage}>
						»
					</button>
				</div>
			</div>
		</div>
	);
};

export default Table;

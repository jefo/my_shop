import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import {
  compose,
  withHandlers,
  defaultProps,
  mapProps,
  withState,
} from 'recompose';

const enhance = compose(
  withStyles(theme => ({
    root: {
      width: '100%',
    },
    tableWrapper: {
      height: '72vh',
      overflowY: 'auto',
      backgroundColor: theme.palette.common.white,
    },
    table: {
      minWidth: '1024px',
    },
  })),
  defaultProps({
    numSelected: 0,
    selectedRows: [],
    emptyRows: 0,
  }),
  mapProps(props => ({ ...props, numSelected: props.selectedRows.length })),
  withState('page', 'setPage', 0),
  withState('rowsPerPage', 'setRowsPerPage', 25),
  withState('selectedRows', 'setSelectedRows', []),
  withHandlers({
    isSelected: ({ selectedRows }) => id => selectedRows.includes(id),
    isSelectedAll: ({ selectedRows, rows }) => () =>
      selectedRows.length === rows.length,
  }),
  withHandlers({
    toggleSelect: ({ selectedRows, isSelected, setSelectedRows }) => (
      e,
      id,
    ) => {
      const selected = isSelected(id);
      const rows = selected
        ? selectedRows.filter(r => r !== id)
        : [...selectedRows, id];
      setSelectedRows(rows);
    },
    toggleSelectAll: props => () => {
      const { selectedRows, rows, isSelected, setSelectedRows } = props;
      let newSelectedRows = [];
      if (selectedRows.length !== rows.length) {
        rows.forEach(({ id }) => {
          if (!isSelected(id)) {
            newSelectedRows.push(id);
          }
        });
      }
      setSelectedRows(newSelectedRows);
    },
    handlePageChange: ({ setPage }) => (e, page) => {
      setPage(page);
    },
    handleRowsPerPageChange: ({ setRowsPerPage }) => e => {
      setRowsPerPage(e.target.value);
    },
  }),
);

function DataTable({
  classes,
  rows,
  cols,
  emptyRows,
  rowsPerPage,
  page,
  numSelected,
  toggleSelect,
  toggleSelectAll,
  isSelected,
  selectable,
  handlePageChange,
  handleRowsPerPageChange,
}) {
  return (
    <div className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rows.length}
                    checked={numSelected === rows.length}
                    onChange={toggleSelectAll}
                  />
                </TableCell>
              )}
              {cols.map(col => <TableCell>{col.content}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                const selected = isSelected(row.id);
                return (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={event => toggleSelect(event, row.id)}
                    role="checkbox"
                    aria-checked={selected}
                    tabIndex={-1}
                    selected={selected}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox checked={selected} />
                      </TableCell>
                    )}
                    {cols.map(col => <TableCell>{row[col.name]}</TableCell>)}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={cols.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangeRowsPerPage={handleRowsPerPageChange}
        onChangePage={handlePageChange}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
      />
    </div>
  );
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  emptyRows: PropTypes.number,
  page: PropTypes.number.isRequired,
  selectedRows: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
};

export default enhance(DataTable);

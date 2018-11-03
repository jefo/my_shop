import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  withHandlers,
  withState,
  defaultProps,
  mapProps,
} from 'recompose';
import { remove } from 'lodash';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';
import { withStyles } from '@material-ui/core/styles';

const enhance = compose(
  withStyles(theme => ({
    tableWrapper: {
      backgroundColor: theme.palette.common.white,
    },
  })),
  defaultProps({
    numSelected: 0,
    selectedRows: [],
  }),
  mapProps(props => ({ ...props, numSelected: props.selectedRows.length })),
  withState('page', 'setPage', 0),
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
  }),
);

const PaginationActions = ({ classes }) => (
  <div className={classes.root}>
    <IconButton
      onClick={this.handleFirstPageButtonClick}
      disabled={page === 0}
      aria-label="First Page"
    >
      {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    </IconButton>
    <IconButton
      onClick={this.handleBackButtonClick}
      disabled={page === 0}
      aria-label="Previous Page"
    >
      {theme.direction === 'rtl' ? (
        <KeyboardArrowRight />
      ) : (
        <KeyboardArrowLeft />
      )}
    </IconButton>
    <IconButton
      onClick={this.handleNextButtonClick}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="Next Page"
    >
      {theme.direction === 'rtl' ? (
        <KeyboardArrowLeft />
      ) : (
        <KeyboardArrowRight />
      )}
    </IconButton>
    <IconButton
      onClick={this.handleLastPageButtonClick}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="Last Page"
    >
      {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    </IconButton>
  </div>
);

export const MyTable = ({
  classes,
  rows,
  emptyRows,
  rowsPerPage,
  page,
  numSelected,
  toggleSelect,
  toggleSelectAll,
  isSelected,
}) => (
  <div className={classes.tableWrapper}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rows.length}
              checked={numSelected === rows.length}
              onChange={toggleSelectAll}
            />
          </TableCell>
          <TableCell>ID</TableCell>
          <TableCell>Наименование</TableCell>
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
                <TableCell padding="checkbox">
                  <Checkbox checked={selected} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 48 * emptyRows }}>
            <TableCell colSpan={2} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  emptyRows: PropTypes.number,
  page: PropTypes.number.isRequired,
  // selectedRows: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
};

MyTable.defaultProps = {
  emptyRows: 0,
};

export default enhance(MyTable);

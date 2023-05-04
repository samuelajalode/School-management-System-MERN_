import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Link} from 'react-router-dom'
import TablePaginationActions from './TablePigination'


const useStyles2 = makeStyles({
  table: {
    width: '100%',
  },
});

export default function CustomPaginationActionsTable({scholarships}) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, scholarships.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Scholarship</TableCell>
            <TableCell align="left">Percentage</TableCell>
            <TableCell align="left">Number of Students</TableCell>
            <TableCell align="left">Added</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ?  scholarships.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : scholarships
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th"  scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">
                {row.name}
              </TableCell>
              <TableCell align="left">
                {row.percentage}
              </TableCell>
              <TableCell align="left">
                {3}
              </TableCell>
              <TableCell  align="left">
                {row.added}
              </TableCell>
              <TableCell  align="left">
                  <IconButton>
                      <DeleteOutlineIcon/>
                  </IconButton>
                  <Link to="/campuses/edit">
                     <EditIcon></EditIcon>
                  </Link>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={scholarships.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

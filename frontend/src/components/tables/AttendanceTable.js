import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
//import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import moment from 'moment'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#051f3e",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  iconSize: {
    width: 20,
    height: 20
  }
});

//const attendanceResponse = [<CheckIcon/>, <ClearIcon/>, <RemoveIcon/>]

export default function CustomizedTables({attendanceData}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.length > 0 ? attendanceData.map((row) => (
            <StyledTableRow key={row._id}>
                <StyledTableCell >
                    {row._id}
                </StyledTableCell>
                <StyledTableCell>
                    {moment(row.date).format('Do MMMM  YYYY')}
                </StyledTableCell>
                <StyledTableCell  align="left">
                      {row.status ? <CheckIcon className={classes.iconSize}/> :  <RemoveIcon className={ `${classes.iconSize} text-danger`}/>}
                </StyledTableCell>
            </StyledTableRow>
          )) : <div className="p-5">No data found</div>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

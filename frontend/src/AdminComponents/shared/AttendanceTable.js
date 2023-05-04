import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import moment from "moment";
import { Link } from "react-router-dom";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  list: {
    listStyle: "none",
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  textDanger: {
    color: "red",
  },
});

export default function CustomizedTables({ attendanceData, isStaff, isClass }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Date</StyledTableCell>
            {(!isStaff || !isClass) && (
              <StyledTableCell align="left">ClassID</StyledTableCell>
            )}
            <StyledTableCell align="left">
              {isStaff ? "Staff ID" : " Student  ID"}
            </StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceData.length > 0 ? (
            attendanceData?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>
                  {moment(row.date).format("Do MMMM  YYYY")}
                </StyledTableCell>
                {(!isStaff || !isClass) && (
                  <StyledTableCell>{row.classID}</StyledTableCell>
                )}

                <StyledTableCell>
                  <ul>
                    {row.users?.map((user) => {
                      return (
                        <li className={classes.list} key={user.userID}>
                          {" "}
                          {user.userID}
                        </li>
                      );
                    })}
                  </ul>
                </StyledTableCell>
                <StyledTableCell>
                  <ul>
                    {row.users?.map((user) => {
                      return (
                        <li className={classes.list} key={user.userID}>
                          {" "}
                          {user.name}
                        </li>
                      );
                    })}
                  </ul>
                </StyledTableCell>
                <StyledTableCell>
                  <ul>
                    {row.users?.map((user) => {
                      return (
                        <li className={classes.list} key={user.userID}>
                          {" "}
                          {user.surname}
                        </li>
                      );
                    })}
                  </ul>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTableCell>
                    <ul>
                      {row.users?.map((user) => {
                        return (
                          <li className={classes.list} key={user.userID}>
                            {user.status ? (
                              <CheckIcon className={classes.iconSize} />
                            ) : (
                              <RemoveIcon
                                className={`${classes.iconSize}  text-danger`}
                              />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </StyledTableCell>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    to={
                      isStaff
                        ? `/attendance/staff/edit/${row._id}`
                        : `/attendance/students/edit/${row.classID}/${row._id}`
                    }
                  >
                    {" "}
                    <EditIcon />{" "}
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <div className="p-5"> No data </div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

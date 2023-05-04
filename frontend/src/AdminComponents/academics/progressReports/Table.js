import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PrintIcon from "@material-ui/icons/Print";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

function SbaTable({ rows, year, term }) {
  const classes = useStyles();

  const calculateClassWork = (obj) => {
    if (obj) {
      let total = 40;
      let sum = Object.values(obj).reduce((t, { value }) => t + value, 0);
      return (sum / total) * (100 / 2);
    }
    return 0;
  };

  const getTotal = (exams, work) => {
    if (exams && work) {
      let classwork = calculateClassWork(work);
      return exams / 2 + classwork;
    }
    return 0;
  };

  return (
    <div>
      <h3>Students</h3>
      <TableContainer className="mb-5" component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Student ID</TableCell>
              <TableCell align="left">Name </TableCell>
              <TableCell align="left">Surname </TableCell>
              <TableCell align="left">Class</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row?.userID}>
                <TableCell>{row?.userID}</TableCell>
                <TableCell align="left">{row?.name}</TableCell>
                <TableCell align="left">{row?.surname}</TableCell>
                <TableCell align="left">{row?.classID}</TableCell>
                <TableCell align="left">
                  <Link
                    className="btn"
                    to={`/academics/progressreports/report/${row?.userID}/${year}/${term}`}
                  >
                    <PrintIcon />
                    Generate Report
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SbaTable;

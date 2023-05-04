import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePaginationActions from "../../shared/TablePagination";
import moment from "moment";
import { Link } from "react-router-dom";
import { currentCurrency } from "../../../utils";

const useStyles2 = makeStyles({
  table: {
    width: "100%",
  },
});

export default function CustomPaginationActionsTable({ data }) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data?.length - page * rowsPerPage);

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
            <TableCell>Date</TableCell>
            <TableCell align="left">Receipt</TableCell>
            <TableCell align="left">Student</TableCell>
            <TableCell align="left">Amount ({currentCurrency()})</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center my-5">
                No data
              </TableCell>
            </TableRow>
          ) : (
            <>
              {(rowsPerPage > 0
                ? data?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              )?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="left">
                    {moment(row?.date)?.format("D MMMM YYYY")}
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <Link to={`/store/sales/receipt/${row?._id}`}>
                      {row?._id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row?.name}</TableCell>
                  <TableCell align="left">{row?.totalCost}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            {data?.length > 5 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

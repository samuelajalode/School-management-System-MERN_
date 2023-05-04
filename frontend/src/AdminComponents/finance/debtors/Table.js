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
import { Link } from "react-router-dom";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
//import VisibilityIcon from "@material-ui/icons/Visibility";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PaymentIcon from "@material-ui/icons/Payment";
import Tooltip from "@material-ui/core/Tooltip";

import TablePaginationActions from "../../../components/tables/TablePagination";

const useStyles2 = makeStyles({
  table: {
    width: "100%",
  },
});

export default function CustomPaginationActionsTable({
  data,
  tableHeader,
  loading,
}) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
            {tableHeader &&
              tableHeader.map((head) => (
                <TableCell key={head.id}>{head.name}</TableCell>
              ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <div className="text-center my-5 w-100">
            <div class="spinner-grow spinner-grow-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow spinner-grow-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow spinner-grow-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <TableBody>
            {data.length <= 0 ? (
              <TableRow className="text-center my-5">
                <TableCell colSpan={tableHeader.length}> No data yet</TableCell>
              </TableRow>
            ) : (
              <>
                {(rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((row) => (
                  <TableRow key={row.userID}>
                    {tableHeader &&
                      tableHeader.map((cell) => (
                        <TableCell key={cell.id} align="left">
                          {row[cell.id] || "-"}
                        </TableCell>
                      ))}
                    <TableCell>
                      <div className="d-flex justify-content-around">
                        <Tooltip title="view user">
                          <Link
                            to={`/students/${row?.userID}`}
                            aria-label="delete"
                            className="btn"
                          >
                            <ViewModuleIcon />
                          </Link>
                        </Tooltip>
                        <Tooltip title="make payment">
                          <Link
                            className="btn"
                            to={`/finance/students/fees`}
                            aria-label="delete"
                          >
                            <PaymentIcon />
                          </Link>
                        </Tooltip>
                        {/* <Tooltip title="view payment receipts">
                          <Link
                            className="btn"
                            to={`/finance/students`}
                            aria-label="delete"
                          >
                            <ReceiptIcon />
                          </Link>
                        </Tooltip> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        )}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={data.length}
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
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

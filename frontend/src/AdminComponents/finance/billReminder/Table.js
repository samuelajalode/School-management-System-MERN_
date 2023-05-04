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
import ReceiptIcon from "@material-ui/icons/Receipt";
import Checkbox from "@material-ui/core/Checkbox";
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
  selected,
  setSelected,
}) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //const [selected, setSelected] = React.useState([]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.userID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (userID) => selected.indexOf(userID) !== -1;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAllClick}
                inputProps={{ "aria-label": "select all desserts" }}
              />
            </TableCell>
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
                ).map((row, index) => {
                  const isItemSelected = isSelected(row?.userID);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.userID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      key={row.userID}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
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
                          <Tooltip title="view payment receipts">
                            <Link
                              className="btn"
                              to={`/finance/students`}
                              aria-label="delete"
                            >
                              <ReceiptIcon />
                            </Link>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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

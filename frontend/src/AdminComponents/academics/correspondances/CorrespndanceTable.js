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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TablePaginationActions from "../../shared/TablePagination";
import moment from "moment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles2 = makeStyles({
  table: {
    width: "100%",
  },
});

export default function CustomPaginationActionsTable({
  data,
  tableHeader,
  handleEdit,
  handleDelete,
  handleView,
  loading,
  handleViewCorrespondance,
  noActions,
}) {
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

  const isDate = (string) => {
    const _regExp = new RegExp(
      "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
    );
    return _regExp.test(string) ? true : false;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {tableHeader &&
              tableHeader?.map((head) => (
                <TableCell key={head.id}>{head.name}</TableCell>
              ))}
            {!noActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody className="text-center my-5 w-100">
            <TableRow>
              <TableCell>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                ></span>
              </TableCell>
              <TableCell>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                ></span>
              </TableCell>
              <TableCell>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                ></span>
              </TableCell>
              <TableCell>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                ></span>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data?.length <= 0 ? (
              <TableRow className="text-center my-5"> No data </TableRow>
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
                    {tableHeader &&
                      tableHeader?.map((cell) => (
                        <TableCell key={cell?.id} align="left">
                          {isDate(row[cell?.id])
                            ? moment(row[cell?.id])?.format("D MMMM YYYY")
                            : row[cell?.id] || "-"}
                        </TableCell>
                      ))}
                    {!noActions && (
                      <TableCell align="left">
                        <div className="d-flex align-items-center">
                          <Tooltip title="View">
                            <IconButton
                              onClick={() => handleViewCorrespondance(row._id)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(row._id)}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEdit(row._id)}>
                              <EditIcon></EditIcon>
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </>
            )}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        )}
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

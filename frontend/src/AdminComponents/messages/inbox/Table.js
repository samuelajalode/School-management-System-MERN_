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
import Tooltip from "@material-ui/core/Tooltip";
//import TocIcon from "@material-ui/icons/Toc";
import { timeStamp } from "../../../utils";

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
  loading,
  isRecieved,
  isEdit,
  isItems,
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
              <TableCell colSpan={tableHeader.lenght}>
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
              <TableRow>
                <TableCell
                  colSpan={tableHeader.length + 1}
                  className="text-center"
                >
                  No Data
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
                    <TableCell>{timeStamp(row.createdAt)}</TableCell>
                    <TableCell>
                      {isRecieved ? row?.sender : row?.userID}
                    </TableCell>
                    <TableCell>{row?.message}</TableCell>
                    {/* {tableHeader &&
                      tableHeader?.map((cell) => (
                        <TableCell key={cell?.id} align="left">
                          {row[cell?.id] || "-"}
                        </TableCell>
                      ))} */}
                    {!noActions && (
                      <TableCell align="left">
                        <div className="d-flex align-items-center">
                          <Tooltip title={"delete"}>
                            <IconButton onClick={() => handleDelete(row._id)}>
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Tooltip>
                          {!isEdit && (
                            <Tooltip title="edit">
                              <IconButton onClick={() => handleEdit(row._id)}>
                                <EditIcon></EditIcon>
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      </TableCell>
                    )}
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

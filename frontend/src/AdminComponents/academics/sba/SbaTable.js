import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/BorderColor";
import Edit from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

function SbaTable({
  rows,
  handleEdit,
  examMark,
  classWorkPercentage,
  examPercentage,
  setexamMark,
  classworkMark,
  setclassworkMark,
  handleOpenPercentage,
}) {
  const classes = useStyles();
  const getGrade = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    if (num >= 75 && num <= 100) {
      return "A1";
    } else if (num >= 70 && num <= 74) {
      return "B2";
    } else if (num >= 65 && num <= 69) {
      return "B3";
    } else if (num >= 60 && num <= 64) {
      return "C4";
    } else if (num >= 55 && num <= 59) {
      return "C5";
    } else if (num >= 50 && num <= 54) {
      return "C6";
    } else if (num >= 45 && num <= 49) {
      return "D7";
    } else if (num >= 40 && num <= 44) {
      return "E8";
    } else if (num >= 0 && num <= 39) {
      return "F9";
    } else {
      return null;
    }
  };

  const getInterpretation = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    num = Number(num);
    if (num > 75 && num <= 100) {
      return "Excellent";
    } else if (num >= 70 && num <= 74) {
      return "Vert good";
    } else if (num >= 65 && num <= 69) {
      return "Good";
    } else if (num >= 60 && num <= 64) {
      return "Credit";
    } else if (num >= 55 && num <= 59) {
      return "Credit";
    } else if (num >= 50 && num <= 54) {
      return "Credit";
    } else if (num >= 45 && num <= 49) {
      return "Pass";
    } else if (num >= 40 && num <= 44) {
      return "Pass";
    } else if (num >= 0 && num <= 39) {
      return "Failure";
    } else {
      return null;
    }
  };

  const getClassWorkPercentage = (mark, per, work) => {
    if (mark && per && work) {
      let dec = (Number(mark) / Number(work)) * (Number(per) / 100);
      return Number(dec * 100).toFixed(0);
    }
    return null;
  };

  const getexamPercentage = (mark, per, exam) => {
    if (mark && per && exam) {
      let dec = (Number(mark) / Number(exam)) * (Number(per) / 100);
      return Number(dec * 100).toFixed(0);
    }
    return null;
  };

  const getTotal = (classwork, exams) => {
    if (!classwork && !exams) {
      return "-";
    }
    let decclass =
      (Number(classwork) / Number(classworkMark || 0)) *
      (Number(classWorkPercentage || 0) / 100);
    let decexam =
      (Number(exams) / Number(examMark)) * (Number(examPercentage || 0) / 100);

    let total = (Number(decexam + decclass) * 100).toFixed(0);
    return total;
  };

  return (
    <div>
      <h3 className="mb-5">Continuous Assessment</h3>
      <TableContainer className="mb-5" component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left" colSpan={3}>
                Name of Student
              </TableCell>
              <TableCell align="left">
                Class Work
                <input
                  className="form-control"
                  name="classworkMark"
                  type="number"
                  onChange={(e) => setclassworkMark(e.target.value)}
                  value={classworkMark}
                ></input>
              </TableCell>

              <TableCell align="left">
                Class Work ({classWorkPercentage}%)
                <button onClick={() => handleOpenPercentage()} className="btn">
                  Set <Edit />
                </button>
              </TableCell>
              <TableCell align="left">
                Exam
                <input
                  className="form-control"
                  type="number"
                  onChange={(e) => setexamMark(e.target.value)}
                  value={examMark}
                ></input>{" "}
              </TableCell>
              <TableCell align="left">
                Exam ({examPercentage}%)
                <button onClick={() => handleOpenPercentage()} className="btn">
                  Set <Edit />
                </button>
              </TableCell>
              <TableCell align="left">
                <small>Total 100%</small>
              </TableCell>
              <TableCell align="left">
                <small>Grade</small>
              </TableCell>
              <TableCell align="left">
                {" "}
                <small>Interpretation</small>
              </TableCell>
              <TableCell align="left">
                <small>Position</small>
              </TableCell>

              <TableCell align="left">
                <small>Set</small>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows?.length > 0 ? (
              <>
                {rows?.map((row) => (
                  <TableRow key={row?.userID}>
                    <TableCell>{row?.userID}</TableCell>
                    <TableCell colSpan={3} align="left">
                      {row?.name}
                    </TableCell>
                    <TableCell align="left">
                      <input
                        readOnly
                        value={row?.classWork || "-"}
                        type="text"
                        className="form-control"
                      />
                    </TableCell>
                    <TableCell align="left">
                      <input
                        readOnly
                        value={getClassWorkPercentage(
                          row?.classWork,
                          classWorkPercentage,
                          classworkMark
                        )}
                        type="text"
                        className="form-control"
                      />
                    </TableCell>
                    <TableCell align="left">
                      <input
                        readOnly
                        value={row?.exam}
                        type="text"
                        className="form-control"
                      />
                    </TableCell>
                    <TableCell align="left">
                      <input
                        readOnly
                        value={getexamPercentage(
                          row?.exam,
                          examPercentage,
                          examMark
                        )}
                        type="text"
                        className="form-control"
                      />
                    </TableCell>

                    <TableCell align="left">
                      {/* <small> {getTotal(row?.classWork, row?.exam)}</small> */}
                      <small> {row?.total}</small>
                    </TableCell>
                    <TableCell align="left">
                      <small> {getGrade(row?.classWork, row?.exam)}</small>
                    </TableCell>
                    <TableCell align="left">
                      <small>
                        {" "}
                        {getInterpretation(row?.classWork, row?.exam)}
                      </small>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <small>{row?.position}</small>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <button
                        onClick={() => handleEdit(row?.userID)}
                        className="btn btn-sm"
                      >
                        <EditIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableCell colSpan={10}>
                <strong>There are no students in this class</strong>{" "}
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SbaTable;

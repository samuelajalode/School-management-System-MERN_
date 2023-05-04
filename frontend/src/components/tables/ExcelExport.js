import React from "react";
import ReactExport from "react-export-excel";
import moment from "moment";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExcelExport({ data, btn, name, columns }) {
  return (
    <ExcelFile
      element={<button className="btn blue__btn">{btn || "Download"}</button>}
    >
      <ExcelSheet data={data} name={name || "data"}>
        {columns.map((col) => (
          <ExcelColumn key={col.id} label={col.name} value={col.id} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
}

export default ExcelExport;

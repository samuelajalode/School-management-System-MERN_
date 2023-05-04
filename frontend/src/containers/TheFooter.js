import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  let year = new Date();

  return (
    <CFooter fixed={false}>
      <p className="text-center  w-100 mt-3">
        © 2015 - {year.getFullYear()} Darrel Technologies Limited. All Rights
        Reserved.
      </p>
    </CFooter>
  );
};

export default React.memo(TheFooter);

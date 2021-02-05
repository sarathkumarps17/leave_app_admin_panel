import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  let year = new Date().getFullYear();
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1 footer">&copy; {year} Cyberdome Kochi.</span>
      </div>
      <div className="mfs-auto">
        {/* <span className="mr-1">Powered by</span> */}
        {/* <a href="https://www.claiga.com/" target="_blank" rel="noopener noreferrer">Claiga</a> */}
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);

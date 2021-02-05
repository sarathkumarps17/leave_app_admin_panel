import React from "react";
import { CWidgetDropdown } from "@coreui/react";
// import CIcon from '@coreui/icons-react';
import ChartLineSimple from "../charts/ChartLineSimple";
import { useHistory } from "react-router-dom";

function DataWidget({ color, header, text, datapoints, customers }) {
  let history = useHistory();
  return (
    <div>
      <div>
        <CWidgetDropdown
          style={{ cursor: "pointer" }}
          onClick={() => history.push(`/${customers}`)}
          color={color}
          header={header}
          text={text}
          className="widget"
          footerSlot={
            <div className={"text-center"} style={{ height: "150px" }}>
              <ChartLineSimple
                className="position-absolute w-100 h-50"
                backgroundColor="rgba(255,255,255,.1)"
                dataPoints={datapoints}
                label="customers"
                labels="months"
              />
            </div>
          }
        >
          {/* <CDropdown>
                        <CDropdownToggle color="transparent">
                            <CIcon name={'cilSettings'} size={'sm'} />
                        </CDropdownToggle>
                        <CDropdownMenu className="p-0" placement="bottom-end">
                            <CDropdownItem onClick={() => history.push(`/${customers}`)}>{customers}</CDropdownItem>
                            {/* <CDropdownItem>Another action</CDropdownItem>
                            <CDropdownItem>Something else here...</CDropdownItem> */}
          {/* </CDropdownMenu>
                    </CDropdown>
                </CWidgetDropdown> */}
        </CWidgetDropdown>
      </div>
    </div>
  );
}

export default DataWidget;

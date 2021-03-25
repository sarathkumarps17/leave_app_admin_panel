import React from "react";
import PropTypes from "prop-types";
import { CWidgetBrand } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from '@coreui/icons';
import ChartLineSimple from "../charts/ChartLineSimple";
import ACLeave from "../leave/ACLeave";

const StatusWidget = ({
  withCharts,
  color,
  leave,
  rightFooter,
  unavailable,
  leftFooter,
  iconName,
  datapoints,
}) => {
  // render
  return withCharts ? (
    <CWidgetBrand
      color={color}
      className="widget"
      rightHeader={`ACP:${leave.AC} - IO:${leave.IO} - SI${leave.SI}`}
      rightFooter={rightFooter}
      leftHeader={`ACP:${unavailable.AC} - IO:${unavailable.IO} - SI:${unavailable.SI}`}
      leftFooter={leftFooter}
    >
      <CIcon name={iconName} height="10" className="my-4" />
      <ChartLineSimple
        className="position-absolute w-100 h-100"
        backgroundColor="rgba(255,255,255,.1)"
        dataPoints={datapoints}
        label="Friends"
        labels="months"
      />
    </CWidgetBrand>
  ) : (
    <CWidgetBrand
      className="widget"
      color={color}
      rightFooter={`ACP:${leave.AC} - IO:${leave.IO} - SI${leave.SI}`}
      rightHeader={rightFooter}
      leftFooter={`ACP:${unavailable.AC} - IO:${unavailable.IO} - SI:${unavailable.SI}`}
      leftHeader={leftFooter}
    >
      <CIcon content={freeSet[`${iconName}`]} height="25" className="my-2" />
    </CWidgetBrand>
  );
};

StatusWidget.propTypes = {
  withCharts: PropTypes.bool,
};

export default StatusWidget;

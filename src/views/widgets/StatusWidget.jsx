import React from "react";
import PropTypes from "prop-types";
import { CWidgetBrand } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from '@coreui/icons';
import ChartLineSimple from "../charts/ChartLineSimple";

const StatusWidget = ({
  withCharts,
  color,
  rightHeader,
  rightFooter,
  leftHeader,
  leftFooter,
  iconName,
  datapoints,
}) => {
  // render

  return withCharts ? (
    <CWidgetBrand
      color={color}
      className="widget"
      rightHeader={rightHeader}
      rightFooter={rightFooter}
      leftHeader={leftHeader}
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
        rightHeader={rightHeader}
        rightFooter={rightFooter}
        leftHeader={leftHeader}
        leftFooter={leftFooter}
      >
        <CIcon content={freeSet[`${iconName}`]} height="25" className="my-4" />
      </CWidgetBrand>
    );
};

StatusWidget.propTypes = {
  withCharts: PropTypes.bool,
};

export default StatusWidget;

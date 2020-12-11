import React from "react";
import { Chart } from "react-charts";

function DebtGraph({ infoFromApi }) {
  const oneTrillion = 1000000000000;
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          [0, infoFromApi[99].tot_pub_debt_out_amt / oneTrillion],
          [1, infoFromApi[90].tot_pub_debt_out_amt / oneTrillion],
          [2, infoFromApi[80].tot_pub_debt_out_amt / oneTrillion],
          [3, infoFromApi[70].tot_pub_debt_out_amt / oneTrillion],
          [4, infoFromApi[60].tot_pub_debt_out_amt / oneTrillion],
          [5, infoFromApi[50].tot_pub_debt_out_amt / oneTrillion],
          [6, infoFromApi[40].tot_pub_debt_out_amt / oneTrillion],
          [7, infoFromApi[30].tot_pub_debt_out_amt / oneTrillion],
          [8, infoFromApi[20].tot_pub_debt_out_amt / oneTrillion],
          [9, infoFromApi[10].tot_pub_debt_out_amt / oneTrillion],
          [10, infoFromApi[0].tot_pub_debt_out_amt / oneTrillion],
        ],
      },
    ],
    [infoFromApi]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  // const lineChart = (
  // A react-chart hyper-responsively and continuously fills the available
  // space of its parent element automatically
  return (
    <div className="line-chart">
      <Chart data={data} axes={axes} />
    </div>
  );
}

export default DebtGraph;

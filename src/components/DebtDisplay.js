import React, { useContext } from "react";
import { DebtControlsContext } from "../App";

function DebtDisplay({ numberWithCommas }) {
  const debtControlsContext = useContext(DebtControlsContext);
  const { debtState, debtPerSecState } = debtControlsContext;

  return (
    <header>
      <p className="main-title">US Debt:</p>
      <h1 className="main-UsDebt">{numberWithCommas(debtState)}</h1>
      <p className="main-debtPerSec">{`${
        debtPerSecState > 0 ? "Increasing" : "Decreasing"
      } US Debt by ${numberWithCommas(debtPerSecState)} per second`}</p>
    </header>
  );
}

export default DebtDisplay;

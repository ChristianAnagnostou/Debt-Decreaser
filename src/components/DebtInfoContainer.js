import React, { useState } from "react";
import DebtAPI from "./DebtAPI";

function DebtInfoContainer({ numberWithCommas, setUsDebt }) {
  const [infoIsActive, setInfoIsActive] = useState(false);

  return (
    <div className="debt-info-container" onClick={() => setInfoIsActive(!infoIsActive)}>
      <p className="debt-info-title">Data</p>
      <DebtAPI
        numberWithCommas={numberWithCommas}
        setUsDebt={setUsDebt}
        infoIsActive={infoIsActive}
      />
    </div>
  );
}

export default DebtInfoContainer;

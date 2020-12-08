import React from "react";
import AutoClickerItem from "./AutoClickerItem";

const AutoClickers = ({
  UsDebt,
  increaseDebtPerSec,
  decreaseDebtPerSec,
  numberWithCommas,
}) => {
  const incrementValues = [0.1, 1, 10, 100, 1000, 10000, 100000, 1000000];

  return (
    <div className="AutoClickers">
      <h2>Debt Collectors</h2>
      {incrementValues.map((value) => {
        return (
          <AutoClickerItem
            key={`Auto${value}`}
            autoPerSecValue={value}
            UsDebt={UsDebt}
            numberWithCommas={numberWithCommas}
            increaseDebtPerSec={increaseDebtPerSec}
            decreaseDebtPerSec={decreaseDebtPerSec}
          />
        );
      })}
    </div>
  );
};

export default AutoClickers;

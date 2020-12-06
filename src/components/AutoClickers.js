import React from "react";
import AutoClickerItem from "./AutoClickerItem";

const AutoClickers = ({ UsDebt, handleDecrementPerSec, numberWithCommas, totalManualClicks }) => {
  const incrementValues = [.1, 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];

  return (
    <div className="AutoClickers">
      <h3>Debt Collectors</h3>
      {incrementValues.map((value) => {
        return (
          <AutoClickerItem
            key={value}
            value={value}
            UsDebt={UsDebt}
            numberWithCommas={numberWithCommas}
            handleDecrementPerSec={handleDecrementPerSec}
            totalManualClicks={totalManualClicks}
          />
        );
      })}
    </div>
  );
};

export default AutoClickers;

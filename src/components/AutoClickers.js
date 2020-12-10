import React from "react";
import AutoClickerItem from "./AutoClickerItem";

const AutoClickers = ({ numberWithCommas }) => {
  const incrementValues = [0.1, 1, 10, 100, 1000, 10000, 100000, 1000000];

  return (
    <div className="AutoClickers">
      <h2>Debt Collectors</h2>
      {incrementValues.map((value) => {
        return (
          <AutoClickerItem
            key={`Auto${value}`}
            autoPerSecValue={value}
            numberWithCommas={numberWithCommas}
          />
        );
      })}
    </div>
  );
};

export default AutoClickers;

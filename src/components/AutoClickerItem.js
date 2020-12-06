import React, { useState, useEffect } from "react";

const AutoClickerItem = ({
  value,
  UsDebt,
  numberWithCommas,
  handleDecrementPerSec,
  totalManualClicks,
}) => {
  const [amountOfThisClicker, setAmountOfThisClicker] = useState(0);
  const [autoClickerMounted, setAutoClickerMounted] = useState(false);
  const [costFactor, setCostFactor] = useState(1);

  const getCurrentPrice = () => {
    return costFactor * value * 100;
  };

  const handleDecrementClick = () => {
    if (amountOfThisClicker > 0) {
      handleDecrementPerSec({ clickValue: -value, costFactor: costFactor });
      setCostFactor(costFactor / 1.12);
      setAmountOfThisClicker(amountOfThisClicker - 1);
    }
  };

  const handleIncrementClick = () => {
    if (getCurrentPrice() <= UsDebt) {
      handleDecrementPerSec({ clickValue: value, costFactor: costFactor });
      setCostFactor(costFactor * 1.12);
      setAmountOfThisClicker(amountOfThisClicker + 1);
    }
  };

  ///THIS IS SETTING TRUE EACH TIME UsDebt CHANGES - FIND A BETTER WAY
  useEffect(() => {
    if (totalManualClicks >= value * 50) {
      setAutoClickerMounted(true);
    }
  }, [totalManualClicks, value]);

  return (
    <div key={value}>
      {autoClickerMounted && (
        <div className="autoclick-item">
          <div>
            <p className="autoclick-value">-{numberWithCommas(value)} cps</p>
            <p className="autoclick-price">(price: {numberWithCommas(value * 100 * costFactor)})</p>
          </div>
          <button
            onClick={handleIncrementClick}
            className={`increment-button ${getCurrentPrice() > UsDebt && "autoClick-disabled"}`}
          >
            +
          </button>
          <span>{amountOfThisClicker}</span>
          <button onClick={handleDecrementClick} className="decrement-button">
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default AutoClickerItem;

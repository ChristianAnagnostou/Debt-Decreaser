import React, { useState, useEffect } from "react";

const AutoClickerItem = ({
  autoPerSecValue,
  UsDebt,
  numberWithCommas,
  increaseDebtPerSec,
  decreaseDebtPerSec,
}) => {
  const [amountOfThisClicker, setAmountOfThisClicker] = useState(0);
  const [autoClickerMounted, setAutoClickerMounted] = useState(false);
  const [costFactor, setCostFactor] = useState(1);
  const maxDebtAllowed = 100000000000000;

  const getPriceOfNextItem = () => {
    return costFactor * autoPerSecValue * 100;
  };

  const handleRemoveItem = () => {
    if (amountOfThisClicker > 0) {
      increaseDebtPerSec(autoPerSecValue);
      setCostFactor(costFactor / 1.12);
      setAmountOfThisClicker(amountOfThisClicker - 1);
    }
  };

  const handleAddItem = () => {
    if (getPriceOfNextItem() + UsDebt < maxDebtAllowed) {
      decreaseDebtPerSec(autoPerSecValue, getPriceOfNextItem());
      setCostFactor(costFactor * 1.12);
      setAmountOfThisClicker(amountOfThisClicker + 1);
    }
  };

  ///THIS IS SETTING TRUE EACH TIME UsDebt CHANGES - FIND A BETTER WAY
  useEffect(() => {
    if (autoPerSecValue === 0.1) {
      setAutoClickerMounted(true);
    } else if (autoPerSecValue >=  0) {
      setAutoClickerMounted(true);
    }
  }, [autoPerSecValue]);

  return (
    <div key={autoPerSecValue}>
      {autoClickerMounted && (
        <div className="autoclick-item">
          <div>
            <p className="autoclick-autoPerSecValue">-{numberWithCommas(autoPerSecValue)}</p>
            <p className="autoclick-price">
              (price: {numberWithCommas(getPriceOfNextItem())})
            </p>
          </div>
          <button
            onClick={handleAddItem}
            className={`increment-button ${
              getPriceOfNextItem() + UsDebt > maxDebtAllowed && "autoClick-disabled"
            }`}
          >
            +
          </button>
          <span>{amountOfThisClicker}</span>
          <button onClick={handleRemoveItem} className="decrement-button">
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default AutoClickerItem;

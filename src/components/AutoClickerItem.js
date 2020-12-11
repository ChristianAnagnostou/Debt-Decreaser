import React, { useState, useEffect, useContext } from "react";
import { DebtControlsContext } from "../App";

const AutoClickerItem = ({ autoPerSecValue, numberWithCommas }) => {
  //
  const debtControlsContext = useContext(DebtControlsContext);
  const { debtState, debtPerSecState, debtDispatch } = debtControlsContext;

  const [amountOfThisClicker, setAmountOfThisClicker] = useState(0);
  const [autoClickerMounted, setAutoClickerMounted] = useState(false);
  const [costFactor, setCostFactor] = useState(1);
  const maxDebtAllowed = 100000000000000;

  const getPriceOfNextItem = () => {
    return costFactor * autoPerSecValue * 100;
  };

  const handleRemoveItem = () => {
    if (amountOfThisClicker > 0) {
      debtDispatch({ type: "increase-debtPerSec", value: autoPerSecValue });
      setCostFactor(costFactor / 1.08);
      setAmountOfThisClicker(amountOfThisClicker - 1);
    }
  };

  const handleAddItem = () => {
    if (getPriceOfNextItem() + debtState < maxDebtAllowed) {
      debtDispatch({ type: "decrease-debtPerSec", value: autoPerSecValue });
      debtDispatch({ type: "increase-debt", value: getPriceOfNextItem() });
      setCostFactor(costFactor * 1.08);
      setAmountOfThisClicker(amountOfThisClicker + 1);
    }
  };

  ///THIS IS SETTING TRUE EACH TIME debtState CHANGES - FIND A BETTER WAY
  useEffect(() => {
    if (autoPerSecValue === 0.1) {
      setAutoClickerMounted(true);
    } else if (11574 / debtPerSecState - 1 >= autoPerSecValue / 1000) {
      setAutoClickerMounted(true);
    }
  }, [autoPerSecValue, debtPerSecState]);

  return (
    <div key={autoPerSecValue}>
      {autoClickerMounted && (
        <div className="autoclick-item">
          <div>
            <p className="autoclick-autoPerSecValue">-{numberWithCommas(autoPerSecValue)}</p>
            <p className="autoclick-price">price: {numberWithCommas(getPriceOfNextItem())}</p>
          </div>
          <div className="autoclick-button-container">
            <button
              onClick={handleAddItem}
              className={`increment-button ${
                getPriceOfNextItem() + debtState > maxDebtAllowed && "autoClick-disabled"
              }`}
            >
              +
            </button>
            <span>{amountOfThisClicker}</span>
            <button onClick={handleRemoveItem} className="decrement-button">
              -
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoClickerItem;

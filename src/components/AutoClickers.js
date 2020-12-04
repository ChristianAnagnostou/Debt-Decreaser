import React, { useState } from "react";

const AutoClickers = ({ counter, handleIncrementSum, numberWithCommas }) => {
  const incrementValues = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];
  const [costFactor, setCostFactor] = useState(1);

  const calculateCost = (num) => {
    const calculatedCost = costFactor * num;
    // setCostFactor(prevCostFactor => prevCostFactor * 1.12);
    return calculatedCost;
  };
  return (
    <div className="AutoClickers">
      <h3>Finger Slaves</h3>
      {incrementValues.map((value) => {
        return (
          <div key={value}>
            {counter >= value * 100 && (
              <div className="autoclick-item">
                <div>
                  <p className='autoclick-value'>+{numberWithCommas(value)} cps</p>
                  <p className='autoclick-price'>(price: {numberWithCommas(value * 100)})</p>
                </div>
                <button onClick={() => handleIncrementSum(value)} className="increment-button">
                  +
                </button>
                <button onClick={() => handleIncrementSum(-value)} className="decrement-button">
                  -
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AutoClickers;

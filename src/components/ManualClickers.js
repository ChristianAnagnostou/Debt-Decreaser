import React from "react";

const ManualClickers = ({ counter, setCounter, numberWithCommas }) => {
  const handleManualClick = (value) => {
    setCounter((prevCounter) => prevCounter + value);
  };
  const incrementValues = [10, 100, 1000, 10000, 100000, 1000000, 10000000];

  return (
    <div className='ManualClickers'>
      <h3>You Slave</h3>
      <button onClick={() => handleManualClick(1)}>+1</button>
      {incrementValues.map((value) => {
        return (
          <div>
            {counter >= value * 10 && (
              <button onClick={() => handleManualClick(value)}>+{numberWithCommas(value)}</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ManualClickers;

import React from "react";

const ManualClickers = ({
  UsDebt,
  setUsDebt,
  numberWithCommas,
  setAutosShouldMount,
  totalManualClicks,
  setTotalManualClicks,
}) => {
  const incrementValues = [1, 10, 100, 1000];

  const handleManualClick = (value) => {
    setTotalManualClicks(totalManualClicks + 1);
    setUsDebt(UsDebt - value);
    if (totalManualClicks === 100) {
      setAutosShouldMount(true);
    }
  };

  return (
    <div className="ManualClickers">
      <h3>Manual Clicks: {totalManualClicks}</h3>
      <button onClick={() => handleManualClick(0.01)}>-1¢</button>
      <br />
      {totalManualClicks >= 25 && <button onClick={() => handleManualClick(0.1)}>-10¢</button>}
      {incrementValues.map((value) => {
        return (
          <div key={`manual${value}`}>
            {totalManualClicks >= value * 50 && (
              <button onClick={() => handleManualClick(value)}>-{numberWithCommas(value)}</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ManualClickers;

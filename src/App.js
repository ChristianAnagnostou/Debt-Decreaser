import React, { useEffect, useState } from "react";
import AutoClickers from "./components/AutoClickers";
import ManualClickers from "./components/ManualClickers";
import "./styles/app.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [incrementSum, setIncrementSum] = useState(0);

  const numberWithCommas = (x) => {
    const roundedX = Math.round(x);
    return roundedX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleIncrementSum = (num) => {
    setIncrementSum((prevIncrementSum) => prevIncrementSum + num);
    if (num > 0) {
      setCounter((prevCounter) => prevCounter - num * 100);
    }
  };

  useEffect(() => {
    console.log("incrementor changed");
    const refreshFactor = 50;

    const incrementInterval = setInterval(() => {
      console.log("incrementing");
      setCounter((prevCounter) => prevCounter + incrementSum / refreshFactor);
    }, 1000 / refreshFactor);
    return () => clearInterval(incrementInterval);
  }, [incrementSum]);

  return (
    <div className="App">
      <h1 className="main-title">FingerSlaver</h1>
      <h1 className='main-counter'>{numberWithCommas(counter)}</h1>
      <p>Finger Slaves making {numberWithCommas(incrementSum)} per second</p>
      <div className="clicker-controls">
      <ManualClickers
        counter={counter}
        setCounter={setCounter}
        numberWithCommas={numberWithCommas}
      />
      {counter >= 100 && (
        <AutoClickers
          counter={counter}
          handleIncrementSum={handleIncrementSum}
          numberWithCommas={numberWithCommas}
        />
      )}
      </div>
    </div>
  );
}

export default App;

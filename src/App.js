import React, { useEffect, useState } from "react";
// Components
import AutoClickers from "./components/AutoClickers";
import DebtInfoContainer from "./components/DebtInfoContainer";
import ManualClickers from "./components/ManualClickers";
import SaveGame from "./components/SaveGame";
// Styles
import "./styles/app.css";

function App() {
  // State
  //Declare an object as the state
  const [megaState, setMegaState] = useState({
    UsDebt: 0,
    totalManualClicks: 0,
    decrementPerSec: 0,
    autosShouldMount: false,
  });
  const [UsDebt, setUsDebt] = useState(0);
  const [totalManualClicks, setTotalManualClicks] = useState(0);
  const [decrementPerSec, setDecrementPerSec] = useState(0);
  const [autosShouldMount, setAutosShouldMount] = useState(false);

  // Converts any number into one with commas
  const numberWithCommas = (amount) => {
    let s = parseFloat(amount).toFixed(2);
    return `$${s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // takes object from AutoClickerItem and sets decrementPerSec and handles cost
  const handleDecrementPerSec = ({ clickValue, costFactor }) => {
    setDecrementPerSec(decrementPerSec - clickValue);
    if (clickValue > 0) {
      setUsDebt(UsDebt + clickValue * costFactor * 100);
    }
  };

  useEffect(() => {
    console.log("incrementor changed");
    const refreshFactor = 10;

    const incrementInterval = setInterval(() => {
      console.log("decrementing");
      setUsDebt((prevUsDebt) => prevUsDebt + decrementPerSec / refreshFactor);
    }, 1000 / refreshFactor);
    return () => clearInterval(incrementInterval);
  }, [decrementPerSec]);

  return (
    <div className="App">
      <h1 className="main-title">Debt Destroyer</h1>
      <h1 className="main-UsDebt">{numberWithCommas(UsDebt)}</h1>
      <p>Decreasing the US Debt by -{numberWithCommas(Math.abs(decrementPerSec))} per second</p>
      <div className="clicker-controls">
        <ManualClickers
          totalManualClicks={totalManualClicks}
          setTotalManualClicks={setTotalManualClicks}
          setAutosShouldMount={setAutosShouldMount}
          UsDebt={UsDebt}
          setUsDebt={setUsDebt}
          numberWithCommas={numberWithCommas}
        />
        {autosShouldMount && (
          <AutoClickers
            totalManualClicks={totalManualClicks}
            UsDebt={UsDebt}
            handleDecrementPerSec={handleDecrementPerSec}
            numberWithCommas={numberWithCommas}
          />
        )}
        <DebtInfoContainer numberWithCommas={numberWithCommas} setUsDebt={setUsDebt} />
        <SaveGame
          UsDebt={UsDebt}
          setUsDebt={setUsDebt}
          totalManualClicks={totalManualClicks}
          setTotalManualClicks={setTotalManualClicks}
          decrementPerSec={decrementPerSec}
          setDecrementPerSec={setDecrementPerSec}
          autosShouldMount={autosShouldMount}
          setAutosShouldMount={setAutosShouldMount}
          megaState={megaState}
          setMegaState={setMegaState}
        />
      </div>
    </div>
  );
}

export default App;

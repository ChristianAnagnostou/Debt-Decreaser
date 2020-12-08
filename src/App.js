import React, { useEffect, useState } from "react";
// Components
import AutoClickers from "./components/AutoClickers";
import DebtInfoContainer from "./components/DebtInfoContainer";
import SaveGame from "./components/SaveGame";
// Styles
import "./styles/app.css";

function App() {
  // State
  //Declare an object as the state
  const [UsDebt, setUsDebt] = useState(27000000000000);
  const [debtPerSec, setDebtPerSec] = useState(14821);

  // Converts any number into one with commas
  const numberWithCommas = (amount) => {
    let s = parseFloat(amount).toFixed(2);
    return `$${s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // takes object from AutoClickerItem and sets debtPerSec and handles cost against debt
  const increaseDebtPerSec = (perSecValue) => {
    setDebtPerSec(debtPerSec + perSecValue);
  };

  const decreaseDebtPerSec = (perSecValue, priceOfItem) => {
    setDebtPerSec(debtPerSec - perSecValue);
    setUsDebt(UsDebt + priceOfItem);
  };

  useEffect(() => {
    const refreshFactor = 25;
    const incrementInterval = setInterval(() => {
      console.log("decrementing");
      setUsDebt((prevUsDebt) => prevUsDebt + debtPerSec / refreshFactor);
    }, 1000 / refreshFactor);
    return () => clearInterval(incrementInterval);
  }, [debtPerSec]);

  return (
    <div className="App">
      <header>
        <p className="main-title">US Debt:</p>
        <h1 className="main-UsDebt">{numberWithCommas(UsDebt)}</h1>
        <p className="main-debtPerSec">{`${
          debtPerSec > 0 ? "Increasing" : "Decreasing"
        } US Debt by ${numberWithCommas(debtPerSec)} per second`}</p>
      </header>
      <div className="game-container">
        <div className="debt-decreasors">
          <AutoClickers
            UsDebt={UsDebt}
            increaseDebtPerSec={increaseDebtPerSec}
            decreaseDebtPerSec={decreaseDebtPerSec}
            numberWithCommas={numberWithCommas}
          />
          <div className="incoming-payments">Incoming Payments</div>
          <div className="taxes">Taxes</div>
        </div>
        <div className="debt-increasors">
          <div className="passives">Passives</div>
          <div className="interest">Interest</div>
          <div className="gov-spending">Govornment Spending</div>
        </div>
        <div className="game-updates-container">
          Game Updates
          <div className="game-updates">
            <p>Hello young economist!</p>
            <p>See that debt? Yeah that's really how big it is.</p>
            <p>Currently, the US debt increases at over 1b per day.</p>
            <p>Hence the 14,810 increase per second.</p>
          </div>
        </div>
      </div>

      <DebtInfoContainer numberWithCommas={numberWithCommas} setUsDebt={setUsDebt} />
      <SaveGame
        UsDebt={UsDebt}
        setUsDebt={setUsDebt}
        debtPerSec={debtPerSec}
        setDebtPerSec={setDebtPerSec}
      />
    </div>
  );
}

export default App;

import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
// Components
import AutoClickers from "./components/AutoClickers";
import DebtDisplay from "./components/DebtDisplay";
import Navbar from "./components/Navbar";
import DebtGraph from "./components/DebtGraph";
// import SaveGame from "./components/SaveGame";
// Styles
import "./styles/app.css";

export const DebtControlsContext = React.createContext();

const initialDebtState = { debt: 0, debtPerSec: 11574 }; //14821
const reducer = (state, action) => {
  switch (action.type) {
    case "increase-debt":
      return { ...state, debt: state.debt + action.value };
    case "decrease-debt":
      return { ...state, debt: state.debt - action.value };
    case "increase-debtPerSec":
      return { ...state, debtPerSec: state.debtPerSec + action.value };
    case "decrease-debtPerSec":
      return { ...state, debtPerSec: state.debtPerSec - action.value };
    default:
      return state;
  }
};

function App() {
  // Reducer
  const [debtControls, dispatchDebtControls] = useReducer(reducer, initialDebtState);
  const { debt, debtPerSec } = debtControls;

  //State
  const [infoFromApi, setInfoFromApi] = useState();

  //Fetch information about current US Debt
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          "https://www.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_penny?sort=-data_date"
        );
        setInfoFromApi(response.data.data);
        dispatchDebtControls({
          type: "increase-debt",
          value: Number(response.data.data[0].tot_pub_debt_out_amt),
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  // Inverval controlling perPerSecond updates
  useEffect(() => {
    const refreshFactor = 14;
    const incrementInterval = setInterval(() => {
      console.log("decrementing");
      dispatchDebtControls({ type: "increase-debt", value: debtPerSec / refreshFactor });
    }, 1000 / refreshFactor);
    return () => clearInterval(incrementInterval);
  }, [debtPerSec]);

  // Converts any number into one with commas
  const numberWithCommas = (amount) => {
    let s = parseFloat(amount).toFixed(2);
    return `$${s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <DebtControlsContext.Provider
      value={{ debtState: debt, debtPerSecState: debtPerSec, debtDispatch: dispatchDebtControls }}
    >
      <div className="App">
        <Navbar numberWithCommas={numberWithCommas} debtInfo={infoFromApi} />
        <DebtDisplay numberWithCommas={numberWithCommas} />
        <div className="debt-graph-container">
          <div className="debt-graph">{infoFromApi && <DebtGraph infoFromApi={infoFromApi} />}</div>
        </div>
        <div className="debt-decreasers">
          <AutoClickers numberWithCommas={numberWithCommas} />
          <div className="incoming-payments">
            <h2>Incoming Payments</h2>
          </div>
          <div className="taxes">
            <h2>Taxes</h2>
          </div>
        </div>

        <div className="debt-increasers">
          <div className="passives">
            <h2>Investments</h2>
            <div className="investment-items">
              <p>Enact $2 Trillion Relief Package</p>
              <p>Offer Free Public College</p>
            </div>
          </div>
          <div className="interest">
            <h2>Interest</h2>
          </div>
          <div className="gov-spending">
            <h2>Govornment Spending</h2>
          </div>
        </div>

        <div
          className="game-updates-container"
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}
        >
          <div className="game-updates">
            <p>Hello Mr. Economist!</p>
            <p>See that big number? Yeah that's the current US debt.</p>
            <p>It's increasing at 1b per day.</p>
            <p>Your goal is to overturn the debt and bring it back down to 0.</p>
            {debtPerSec < 0 && <p>Right on! You got the debt to start going down!</p>}
          </div>
        </div>

        {/* <SaveGame
          UsDebt={UsDebt}
          setUsDebt={setUsDebt}
          debtPerSec={debtPerSec}
          setDebtPerSec={setDebtPerSec}
        /> */}
      </div>
    </DebtControlsContext.Provider>
  );
}

export default App;

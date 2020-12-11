import React, { useState } from "react";
import DebtData from "./DebtData";

function Navbar({ numberWithCommas, debtInfo }) {
  const [debtDataActive, setDebtDataActive] = useState(false);

  return (
    <nav className="navbar">
      <ul>
        <li>Account</li>
        <li>Settings</li>
        <li>HiScores</li>
        <li>Forums</li>
        <li onClick={() => setDebtDataActive(!debtDataActive)}>
          Data
          {debtDataActive ? (
            <DebtData numberWithCommas={numberWithCommas} debtInfo={debtInfo} />
          ) : (
            ""
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

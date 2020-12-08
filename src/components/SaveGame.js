import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SaveGame = ({
  UsDebt,
  setUsDebt,
  debtPerSec,
  setDebtPerSec,
}) => {
  const [megaState, setMegaState] = useState({
    UsDebt: 0,
    debtPerSec: 0,
  });

  const saveCurrentGame = () => {
    setMegaState({
      UsDebt,
      debtPerSec,
    });
  };

  const loadLocalSave = () => {
    if (sessionStorage.getItem("megaState")) {
      const savedGame = JSON.parse(sessionStorage.getItem("megaState"));
      console.log(savedGame);
      setUsDebt(savedGame.UsDebt);
      setDebtPerSec(savedGame.debtPerSec);
    }
  };

  useEffect(() => {
    if (megaState.totalManualClicks) {
      console.log("megaState changed in SaveGame");
      sessionStorage.setItem("megaState", JSON.stringify(megaState));
      console.log(JSON.parse(sessionStorage.getItem("megaState")));
    }
  }, [megaState]);

  return (
    <SaveGameStyles>
      <button className="save-game" onClick={() => saveCurrentGame()}>
        Save Game Locally
      </button>
      <br />
      <button className="save-game" onClick={() => loadLocalSave()}>
        Load Local Game
      </button>
    </SaveGameStyles>
  );
};

const SaveGameStyles = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  background: rgb(46, 46, 46);
  padding: 10px;
  border-radius: 5px;
`;

export default SaveGame;

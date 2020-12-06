import React, { useEffect } from "react";

const SaveGame = ({
  UsDebt,
  setUsDebt,
  totalManualClicks,
  setTotalManualClicks,
  decrementPerSec,
  setDecrementPerSec,
  autosShouldMount,
  setAutosShouldMount,
  megaState,
  setMegaState,
}) => {
  const saveCurrentGame = () => {
    setMegaState({
      UsDebt,
      totalManualClicks,
      decrementPerSec,
      autosShouldMount,
    });
  };

  const loadLocalSave = () => {
    if (sessionStorage.getItem("megaState")) {
      const savedGame = JSON.parse(sessionStorage.getItem("megaState"));
      console.log(savedGame);
      setUsDebt(savedGame.UsDebt);
      setTotalManualClicks(savedGame.totalManualClicks);
      setDecrementPerSec(savedGame.decrementPerSec);
      setAutosShouldMount(savedGame.autosShouldMount);
    }
  };

  useEffect(() => {
    if(megaState.totalManualClicks){
      console.log("megaState changed in SaveGame");
      sessionStorage.setItem("megaState", JSON.stringify(megaState));
      console.log(JSON.parse(sessionStorage.getItem("megaState")));
    }
  }, [megaState]);

  return (
    <div className="Save-Game">
      <button className="save-game" onClick={() => saveCurrentGame()}>
        Save Game Locally
      </button>
      <br />
      <button className="save-game" onClick={() => loadLocalSave()}>
        Load Local Game
      </button>
    </div>
  );
};

export default SaveGame;

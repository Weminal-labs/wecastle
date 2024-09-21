import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import UnityGameComponent, { useUnityGame } from "../../../hooks/useUnityGame";

const PlayGame: React.FC = () => {
  const { isLoaded } = useUnityGame();
  const [loadGame, setLoadGame] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setLoadGame(false);
    }
  }, [isLoaded]);

  return (
    <>
      {!loadGame ? (
        <div className="h-full w-full">
          <UnityGameComponent />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default PlayGame;

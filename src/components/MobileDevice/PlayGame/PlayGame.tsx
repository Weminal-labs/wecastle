import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import UnityGameComponent, { useUnityGame } from "../../../hooks/useUnityGame";

const PlayGame: React.FC = () => {
  const { isLoaded } = useUnityGame();
  const [loadGame, setLoadGame] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setLoadGame(true);
    }
  }, [isLoaded]);

  return (
    <>
        {loadGame && (
          <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <UnityGameComponent />
          </Modal>
        )}
        hello
    </>
  );
};
export default PlayGame;

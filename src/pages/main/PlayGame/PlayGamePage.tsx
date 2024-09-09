import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import useGetRoom from "../../../hooks/useGetRoom";
import UnityGameComponent, { useUnityGame } from "../../../hooks/useUnityGame";

import { JoinRoomContainer } from "./PlayGame.style";

const PlayGame: React.FC = () => {
  const { sendMessage, show, setShow, isLoaded } = useUnityGame();
  const [loadGame, setLoadGame] = useState(false);
  const { getRooms, isLoading, rooms, setIsLoading } = useGetRoom();

  return (
    <>
      <JoinRoomContainer>
        {loadGame && (
          <Modal
            open={true}
            style={{ display: show ? "block" : "none" }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <UnityGameComponent />
          </Modal>
        )}
      </JoinRoomContainer>
    </>
  );
};
export default PlayGame;

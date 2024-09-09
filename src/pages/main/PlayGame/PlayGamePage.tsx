import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import LoadingScreen from "../../../components/layout/LoadingScreen";
import RoomCard from "../../../components/join-room/Room";
import JoinRoomDialog from "../../../components/join-room/JoinRoomDialog";
import WaitingRoom from "../../../components/create-room/WaitingRoom/WaitingRoom";
import useGetRoom from "../../../hooks/useGetRoom";
import UnityGameComponent, { useUnityGame } from "../../../hooks/useUnityGame";
import { RoomType } from "../../../type/type";
import CreateForm from "../../../components/create-room/CreateForm/CreateForm";
import AlertComponent from "../../../components/layout/AlertComponent";
import {
  Aptos,
  AptosConfig,
  InputViewFunctionData,
  Network,
} from "@aptos-labs/ts-sdk";
import {
  ButtonContainer,
  ContainerBox,
  CustomTextField,
  FlexBox,
  GridContainer,
  JoinRoomContainer,
} from "./PlayGame.style";
import { MODULE_ADDRESS } from "../../../utils/Var";
import { useAptimusFlow } from "aptimus-sdk-test/react";
import { Compare } from "../../../utils/CompareAddress";
import useContract from "../../../hooks/useContract";
import CustomButton from "../../../components/buttons/CustomButton";
import { useAlert } from "../../../contexts/AlertProvider";

const ITEMS_PER_PAGE = 6;

const PlayGame: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roomObj, setRoomObj] = useState<RoomType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openWaitRoom, setOpenWaitRoom] = useState(false);
  const { sendMessage, show, setShow, isLoaded } = useUnityGame();
  const address = localStorage.getItem("address");
  const [loadGame, setLoadGame] = useState(false);
  const { getRooms, isLoading, rooms, setIsLoading } = useGetRoom();
  const [isCreator, setIsCreator] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const { callContract, loading, error } = useContract();
  const { setAlert } = useAlert();

  useEffect(() => {
    getCurrentRoom();
  }, []);
  const getCurrentRoom = async () => {
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const aptos = new Aptos(aptosConfig);
    const payload: InputViewFunctionData = {
      function: `${MODULE_ADDRESS}::gamev3::get_room_now`,
      functionArguments: [address],
    };
    const data = await aptos.view({ payload });
    // @ts-ignore
    console.log(data);
    // @ts-ignore

    if (data[0].vec[0]) {
      // @ts-ignore
      const roomData: RoomType = data[0].vec[0];

      setRoomObj(roomData);
      const checkIsCreator = Compare(roomData.creator, address!, 5);
      if (!checkIsCreator) {
        setIsCreator(false);
      } else {
        setIsCreator(true);
      }
      setOpenWaitRoom(true);
      setLoadGame(true);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (show === false) {
      getRooms();
      console.log("Finish Game");
      setRoomObj(null);
      setLoadGame(false);
    }
  }, [show]);

  const handleReload = () => {
    getRooms();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on search
  };

  const filteredRooms = rooms.filter(
    (room) =>
      !room.is_room_close &&
      room.room_id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedRooms = filteredRooms.slice(startIndex, endIndex);

  const openGame = () => {
    if (isLoaded === false) {
   
      return;
    }
    const obj = {
      roomId: roomObj?.room_id,
      roomName: roomObj?.room_name,
      userId: address,
      userName: "123456",
    };
    sendMessage("RoomPlayer", "JoinOrCreateRoom", JSON.stringify(obj));
    setShow(true);
    setOpenWaitRoom(false);
  };
  const createRoomContract = async (
    ROOM_NAME: string,
    bet_amount: string,
    withMate: boolean,
    mateAddress: string,
  ) => {
    setOpenCreate(false);
    let functionName = "";
    let functionArgs: any[] = [];

    if (withMate) {
      console.log(mateAddress);
      functionName = "create_room_mate";
      const aptosConfig = new AptosConfig({ network: Network.TESTNET });
      const aptos = new Aptos(aptosConfig);
      try {
        const payload: InputViewFunctionData = {
          function: `${MODULE_ADDRESS}::gamev3::get_address_by_username`,
          functionArguments: [mateAddress],
        };
        const response = await aptos.view({ payload });
        // @ts-ignore
        const findAddress: string = response[0];
        console.log(findAddress);
        functionArgs = [ROOM_NAME, bet_amount, findAddress];
      } catch (error) {
        console.error("Lỗi khi tạo payload:", error);
       
        return;
      }
      // @ts-ignore

     
    } else {
      functionName = "create_room";
      functionArgs = [ROOM_NAME, bet_amount];
    }

    const a = await callContract({
      functionName,
      functionArgs,
      onSuccess: (result) => {
        // @ts-ignore

        const createRoomObj: CreateRoomType = result.events[0].data;
        setIsLoading(false);
        setRoomObj(createRoomObj);
        setOpenWaitRoom(true);
        setIsCreator(true);
        setLoadGame(true);

      },
      onError: (error) => {
        setOpenCreate(true);
        setIsLoading(false);
        // @ts-ignore
        console.error("Mã Lỗi:", error.status);
       
        setAlert("Error: " + error.toString());
        console.error("Lỗi khi gọi hàm smart contract:", error);
      },
    });
  };
  const handleOpenWaitingRoom = () => {
    setIsCreator(false);
    setLoadGame(true);
    setOpenWaitRoom(true);
  };
  return (
    <>
      <JoinRoomContainer>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <ContainerBox>
              <CustomTextField
                label="Search Room by ID"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                size="small"
              />

              <FlexBox>
                <ButtonContainer>
                  <CustomButton
                    content="Reload"
                    disabled={false}
                    isMain={false}
                    onClick={handleReload}
                  />
                </ButtonContainer>

                <ButtonContainer>
                  <CustomButton
                    content="Create"
                    disabled={false}
                    isMain={true}
                    onClick={() => {
                      setOpenCreate(true);
                    }}
                  />
                </ButtonContainer>
              </FlexBox>
            </ContainerBox>

            <GridContainer container spacing={4}>
              {displayedRooms.map((room, index) => {
                console.log(room);
                if (!Compare(room.creator, address!, 5))
                  return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <RoomCard
                        setRoomObj={setRoomObj}
                        openDialog={() => {
                          setOpenDialog(true);
                        }}
                        roomType={room}
                      />
                    </Grid>
                  );
              })}
            </GridContainer>
            <Stack spacing={4} sx={{ marginBottom: "20px", color: "white" }}>
              <Pagination
                count={Math.ceil(filteredRooms.length / ITEMS_PER_PAGE)}
                page={page}
                color="primary"
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white", // Màu chữ của các trang
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.12)", // Nền cho trang được chọn
                    color: "white", // Màu chữ cho trang được chọn
                  },
                }}
              />
            </Stack>
          </>
        )}
        {loadGame && (
          <Modal
            open={true}
            style={{ display: show ? "block" : "none" }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <UnityGameComponent />
            </>
          </Modal>
        )}

        <JoinRoomDialog
          openWaitingRoom={handleOpenWaitingRoom}
          open={openDialog}
          closeModal={() => {
            setOpenDialog(false);
          }}
          room={roomObj}
          setIsLoading={setIsLoading}
        />
        {openWaitRoom && (
          <WaitingRoom
            openGame={openGame}
            room={roomObj}
            open={openWaitRoom}
            closeRoom={() => {
              setShow(false);

              setOpenWaitRoom(false);
            }}
            isCreator={isCreator}
          />
        )}
      </JoinRoomContainer>
      <CreateForm
        createRoomContract={createRoomContract}
        open={openCreate}
        onClose={() => {
          setOpenCreate(false);
        }}
      ></CreateForm>
  
    </>
  );
};
export default PlayGame;

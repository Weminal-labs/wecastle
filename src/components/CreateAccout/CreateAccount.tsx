import { useEffect, useState } from "react";
import {
  Aptos,
  AptosConfig,
  InputViewFunctionData,
  Network,
} from "@aptos-labs/ts-sdk";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from "@mui/material";

import { MODULE_ADDRESS } from "../../utils/Var";
import { useAlert } from "../../contexts/AlertProvider";
import useContract from "../../hooks/useContract";
import CustomButton from "../buttons/CustomButton";
import CustomInput from "../input/CustomInput";

const CreateAccount = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const address = localStorage.getItem("address");
  const { callContract } = useContract();
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        try {
          setLoading(true);
          const aptosConfig = new AptosConfig({ network: Network.TESTNET });
          const aptos = new Aptos(aptosConfig);
          const payload: InputViewFunctionData = {
            function: `${MODULE_ADDRESS}::gamev1::get_player_info`,
            functionArguments: [address],
          };
          await aptos.view({ payload });

          // Handle the response as needed (e.g., set user data)
          window.location.href = "/";
        } catch (error) {
          setLoading(false);
          console.log(address);

          console.log(error);
        }
      } else {
        window.location.href = "/auth/login";
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {

    if (!(username && name)) {
      setAlert("All fields must be filled.", "info");
      return;
    }

    setLoading(true);
    await callContract({
      functionName: "create_account",
      functionArgs: [name],
      onSuccess(result) {
        window.location.href = "/";
        setAlert("Create account successfully!", "success");
      },
      onError(error) {
        if (error.status === 404)
          setAlert("You need to faucet your account!", "info");
        else
          setAlert(
            "Username is already taken. Please choose another one.",
            "info",
          );
        console.error("Error calling smart contract:", error);
      },
      onFinally() {
        setLoading(false);
      },
    });
  };

  // if (loadingFetch) {
  //   return <CircularProgress />;
  // }

  // const handleLogout = () => {
  //   localStorage.clear();
  //   flow.logout();
  //   window.location.href = "/";
  // };\

  return (
    <Modal open={true}>
      <Box
        sx={{
          width: "75vw",
          background: "#C48D5D",
          padding: 3,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "4px solid black",
        }}
      >
        <div className="vt323-regular flex w-full flex-col items-center gap-2">
          <h1 className="text-2xl text-white">Create your account</h1>

          <CustomInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            disabled={false}
          />
          <CustomInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            disabled={false}
          />
          <CustomButton
            content={loading ? "Loading..." : "Create"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default CreateAccount;

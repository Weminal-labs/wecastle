import { useEffect, useState } from "react";
import { Aptos, AptosConfig, InputViewFunctionData, Network } from "@aptos-labs/ts-sdk";
import { Avatar, Box, CircularProgress, Grid, Modal, Typography } from "@mui/material";

import { MODULE_ADDRESS } from "../../utils/Var";
import { SendButton } from "../SendButton/SendButton";
import { useAlert } from "../../contexts/AlertProvider";
import useContract from "../../hooks/useContract";
import CustomButton from "../buttons/CustomButton";
import CustomInput from "../input/CustomInput";

const CreateAccount = () => {
  const [editingImageLink, setEditingImageLink] = useState<string>("");
  const [editingName, setEditingName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const address = localStorage.getItem("address")
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
          console.log(address)

          console.log(error)
        }
      } else {
        window.location.href = "/auth/login";
      }
    };
    fetchData();
  }, []);


  const handleSubmit = async () => {
    // if (usernameTaken) {
    //   setAlert("Username is already taken. Please choose another one.", "info");
    //   return;
    // }

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
    <Modal open={true} >
      <Box sx={{
        width: '75vw', background: "#C48D5D", padding: 3, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '4px solid black'
      }}>
        <div className="flex flex-col gap-2 w-full items-center vt323-regular">
          <h1 className="text-white text-2xl">Create your account</h1>
          
          <CustomInput value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" disabled={false} />
          <CustomInput value={name} onChange={(e) => setName(e.target.value)} placeholder="name" disabled={false} />
        <CustomButton content={loading ? "Loading..." : "Create"} onClick={handleSubmit} disabled={loading} />
          {/* <Box display="flex" justifyContent="center" flexDirection="column" margin="0 25px 0 30px" gap={1.5}>
            <Typography variant="subtitle1" fontSize="0.7rem" color="white" letterSpacing="0.1rem">
              Select your Avatar
            </Typography>
            <Grid container spacing={2} >
              {existingImages.map((imgUrl, index) => (
                <Grid item xs={4} sm={2} key={index}>
                  <Avatar
                    src={imgUrl}
                    sx={{
                      width: 56,
                      height: 56,
                      border:
                        editingImageLink === imgUrl
                          ? "3px solid blue"
                          : "2px solid gray",
                      cursor: "pointer",
                    }}
                    // onClick={() => handleExistingImageSelect(imgUrl)}
                  />
                </Grid>
              ))}
            </Grid>

            <Typography variant="subtitle1" fontSize="0.7rem" color="white" letterSpacing="0.1rem" mt={1}>
              Or enter image URL
            </Typography>
            <Box display="flex" justifyContent="center" >
              <CustomInput
                value={editingImageLink}
                onChange={(e) => setEditingImageLink(e.target.value)}
                placeholder="Paste url here"
                isMain={true}
                disabled={false}
              /></Box>
          </Box>


          <Box display="flex" justifyContent="center" mt={1} margin="10px 25px 0 30px" >
            <SendButton walletAddress={address || ""} type={Network.TESTNET}>
              Faucet
            </SendButton>
          </Box>
          <Box display="flex" justifyContent="center" margin="10px 25px 25px 30px">
            <CustomButton content={loading ? "Loading..." : "Create"} isMain={true} onClick={handleUpdate} disabled={loading} />
          </Box> */}

        </div>
      </Box>
    </Modal>
  );
};

export default CreateAccount;

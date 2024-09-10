import { ContentCopy } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { shortenAddress } from "../../../utils/Shorten";
import { Menu, MenuItem } from '@mui/material';
const HomeMobile = () => {
  const address = localStorage.getItem("address") ?? "";

  return (
      <div className='w-full h-[60px] flex justify-center items-center '>
        <Typography variant="body1" color="white">
          <ContentCopy onClick={() => navigator.clipboard.writeText(address)} />
          <span style={{ marginLeft: '5px' }}>{shortenAddress(address, 5)}</span>
        </Typography>
        <Menu open={true}>
          <MenuItem>
            <Typography variant="body1" color="white">
              {shortenAddress(address, 5)}
            </Typography>
          </MenuItem>
        </Menu>
      </div>
  )

}

export default HomeMobile
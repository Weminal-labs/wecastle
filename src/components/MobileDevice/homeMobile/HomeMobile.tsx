import { ContentCopy } from "@mui/icons-material";
import { shortenAddress } from "../../../utils/Shorten";
import MenuIcon from '@mui/icons-material/Menu';
import PlayGame from "../PlayGame/PlayGame";

const HomeMobile = () => {
  const address = localStorage.getItem("address") ?? "";

  return (
    <div className="w-full h-full flex flex-col  items-center">
      <header className='w-full h-[60px] flex flex-row justify-between items-center mb-[60px]'>
        <div className='flex-1 flex justify-center ml-[70px]'>
          <h2 className="text-white font-vt323">
            <ContentCopy onClick={() => navigator.clipboard.writeText(address)} />
            <span style={{ marginLeft: '5px' }}>{shortenAddress(address, 5)}</span>
          </h2>
        </div>
        <MenuIcon style={{ color: 'white', margin: '20px', fontSize: '40px' }} />
      </header>

      {/* game */}
      <div className="w-[300px] h-[200px] border-2 border-white">
        <PlayGame />
      </div>
    </div> 
  )
}


export default HomeMobile
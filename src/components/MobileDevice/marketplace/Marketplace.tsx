import { useNavigate } from "react-router-dom";

const MarketplaceItem = (item: any) => {
  return (
    <div className="flex flex-col items-center justify-center mb-5 gap-2">
      <div className="w-[120px] h-[120px] flex flex-col items-center justify-center">
        <img src={item.image} alt={item.name} className="w-[120px] h-[120px]" />
      </div>
      <button className="w-28 bg-white text-2xl text-black border-2 border-black">
        Buy
      </button>
    </div>
  );
};

const Marketplace = () => {
  const navigate = useNavigate();
  const marketplaceItems = [
    { name: "item1", price: 100, image: "/logo.png" },
    { name: "item2", price: 200, image: "/logo.png" },
    { name: "item3", price: 300, image: "/logo.png" },
    { name: "item3", price: 300, image: "/logo.png" },
    { name: "item3", price: 300, image: "/logo.png" },
    { name: "item3", price: 300, image: "/logo.png" },
  ];
  return (
    <div className="mx-auto flex h-[100vh] w-full max-w-screen-sm flex-col items-center pt-20 ">
      <div className="w-full h-full bg-[#C48D5D] rounded-t-2xl p-10 text-white">
        <div className=" text-xl" onClick={() => navigate("/")}>
          Back
        </div>
        <h1 className="text-3xl text-center mb-5">Marketplace</h1>
        <div className="grid grid-cols-2 gap-4">
          {marketplaceItems.map((item) => (
            <MarketplaceItem key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

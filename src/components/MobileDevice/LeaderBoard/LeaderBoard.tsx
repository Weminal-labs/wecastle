import React, { useEffect, useState } from 'react';
import useGetPlayer from '../../../hooks/useGetPlayer';
import { LeaderBoardInfo } from '../../../type/type';
import { shortenAddress } from "../../../utils/Shorten";

const LeaderBoard: React.FC = () => {
    const { fetchLeaderBoard, loadingFetch } = useGetPlayer();
    const [leaderboard, setLeaderboard] = useState<LeaderBoardInfo[] | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<LeaderBoardInfo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const getLeaderboard = async () => {
            const data = await fetchLeaderBoard(10); 
            if (data) {
                setLeaderboard(data);
            }
        };

        getLeaderboard();
    }, []);

    if (loadingFetch) {
        return (
            <div className='mt-40 flex flex-col items-center justify-center text-white'>
                Loading...
            </div>
        );
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='w-[80%] max-w-[400px] mt-[40px] mx-auto flex flex-col items-center justify-center text-white bg-gray-800/40 p-6 rounded-lg shadow-xl backdrop-blur-md'>
            <h1 className='text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#C48D5D] to-[#F6E7D8]'>
                Top 10 Players
            </h1>
            {leaderboard ? (
                <table className='w-full text-white table-auto'>
                    <thead>
                        <tr className='bg-gray-700'>
                            <th className='py-3 px-6 text-left'>#</th>
                            <th className='py-3 px-6 text-left'>Address</th>
                            <th className='py-3 px-6 text-left'>Name</th>
                            <th className='py-3 px-6 text-left'>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((player, index) => (
                            <tr
                                key={player.address_id}
                                className='border-b border-gray-600 hover:bg-gray-600/50 transition duration-300'
                                onClick={() => {
                                    setSelectedPlayer(player);
                                }}
                            >
                                <td className='py-2 px-3 text-center'>{index + 1}</td>
                                <td className='py-2 px-3 text-center'>{shortenAddress(player.address_id, 3)}</td>
                                <td className='py-2 px-3 text-center'>{player.name}</td>
                                <td className='py-2 px-3 text-center'>{player.point}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='mt-4 text-lg'>No leaderboard data available.</p>
            )}
        </div>
    );
};

export default LeaderBoard;
import { useEffect, useState } from "react";

const ProgressBar = ({ isLoading }: { isLoading: boolean }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress((prev: number) => (prev < 100 ? prev + 10 : 100));
            }, 120);

            return () => clearInterval(interval);
        }
    }, [isLoading]);
    
    return (
        <div className="w-[350px] border-2 border-dark-300">
            <div className="m-1">
                <div style={{ border: "1px solid black", width: `${progress}%`, height: "30px", backgroundColor: "white" }}></div>
            </div>
        </div>
    );
}

export default ProgressBar;

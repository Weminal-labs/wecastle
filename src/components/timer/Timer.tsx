import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

export default function Timer({ expiryTimestamp }: { expiryTimestamp: Date }) {
  const { isRunning, minutes, hours, restart, seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    autoStart: true,
  });

  useEffect(() => {
    restart(expiryTimestamp, true);
  }, [expiryTimestamp, restart]);

  return (
    <div style={{ textAlign: "center" }}>
      <span>{hours}</span>h<span>{minutes}</span>m<span>{seconds}</span>s
    </div>
  );
}

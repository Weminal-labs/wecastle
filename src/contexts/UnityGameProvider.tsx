import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { useUnityContext } from "react-unity-webgl";
import AuthContext from "./AuthProvider";
import useGame from "../hooks/useGame";

// Create UnityGame context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UnityGameContext = createContext<any>(null);

interface GameProviderProps {
  children: ReactNode;
}

export const UnityGameProvider: React.FC<GameProviderProps> = ({
  children,
}) => {
  const { isLoaded, unityProvider } = useUnityContext({
    loaderUrl: "build/Build/Build.loader.js",
    dataUrl: "build/Build/Build.data",
    frameworkUrl: "build/Build/Build.framework.js",
    codeUrl: "build/Build/Build.wasm",
  });

  const { endGame } = useGame();
  const auth = useContext(AuthContext);

  const handlePushRewardGame = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (jsonData: any) => {
      console.log("call")
      const point = JSON.parse(jsonData);
      if (!auth) return;

      const round =
        auth.player.current_round !== 0 ? auth.player.current_round : 1;

      await endGame(round, point, auth.player.address_id);
    },
    [auth, endGame],
  );

  useEffect(() => {
    // Add the event listener
    addEventListener("PushRewardForPlayer", handlePushRewardGame);
    // addEventListener("FinishGame", handleUnityApplicationFinish);

    // Clean up the event listener on unmount
    return () => {
      removeEventListener("PushRewardForPlayer", handlePushRewardGame);
      // removeEventListener("FinishGame", handleUnityApplicationFinish);
    };
  }, [handlePushRewardGame]);

  return (
    <UnityGameContext.Provider
      value={{
        isLoaded,
        unityProvider,
      }}
    >
      {children}
    </UnityGameContext.Provider>
  );
};

export default UnityGameContext;

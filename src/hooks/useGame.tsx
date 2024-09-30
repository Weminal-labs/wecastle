import {
  Aptos,
  AptosConfig,
  InputViewFunctionData,
  Network,
} from "@aptos-labs/ts-sdk";
import React, { useState } from "react";
import useContract from "./useContract";

const MAX_ROUND = 3;

const useGame = () => {
  const [loadingFetch, setLoadingFetch] = useState(false);
  const { callContract } = useContract();

  const playRound = async (round: number): Promise<boolean> => {
    if (round < 0 || round > MAX_ROUND) return false;

    try {
      setLoadingFetch(true);

      await callContract({
        functionName: `play_round${round}`,
        functionArgs: [],
        onSuccess(result) {
          return true;
        },
        onError(error) {
          if (error.status === 404) return false;
          else return false;
        },
        onFinally() {
          setLoadingFetch(false);
        },
      });
    } catch (error) {
      setLoadingFetch(false);
      console.error("Error play round 1 call:", error);
      return false;
    }
    return true;
  };

  return { playRound };
};

export default useGame;

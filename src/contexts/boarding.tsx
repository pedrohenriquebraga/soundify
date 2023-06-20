import React, { createContext, useContext, useEffect } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

interface IBoardingContext {
  onBoarded: boolean;
  handleSetOnBoarded: () => void;
}

const BoardingContext = createContext<IBoardingContext>({} as IBoardingContext);

const BoardingProvider: React.FC<any> = ({ children }) => {
  const [onBoarded, setOnBoarded] = usePersistedState(
    "@SoundfyPlayer:onBoarded",
    false
  );
  const handleSetOnBoarded = async () => {
    setOnBoarded(true);
  };

  return (
    <BoardingContext.Provider
      value={{
        onBoarded,
        handleSetOnBoarded,
      }}
    >
      {children}
    </BoardingContext.Provider>
  );
};

const useBoarding = () => useContext(BoardingContext);

export { BoardingProvider, useBoarding };

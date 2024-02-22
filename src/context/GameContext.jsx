import { createContext, useState } from "react";

export const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  const submitScore = async (name) => {
    try {
      const response = await fetch(
        "https://star-attack-default-rtdb.firebaseio.com/scores.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, score }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Score submitted successfully:", responseData);
    } catch (error) {
      console.error("Failed to submit score:", error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        score,
        startGame,
        showRules,
        playMusic,
        setShowRules,
        setScore,
        setStartGame,
        setPlayMusic,
        submitScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

import { useEffect, useState } from "react";
import Button from "./Ui/Button";

const Ranking = ({ handleRanking }) => {
  const [ranking, setRanking] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://star-attack-default-rtdb.firebaseio.com/scores.json"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setRanking(responseData);
        console.log(responseData);
      } catch (error) {
        console.error("Failed to submit score:", error);
      }
    };
    console.log(ranking);
    fetchData();
  }, [ranking]);

  const rankingList = Object.values(ranking).sort((a, b) => b.score - a.score);

  return (
    <div className="w-full text-center overflow-y-auto max-h-full">
      <h2 className="text-white mb-2">RANKING</h2>
      <div className="text-white flex flex-col justify-between text-xs  mb-5">
        {rankingList.map((player, index) => (
          <div key={index} className=" flex justify-between border-b pb-1 ">
            <p className="text-xs">{player.name}</p>
            <p>{player.score}</p>
          </div>
        ))}
      </div>
      <Button text="MENU" onClick={handleRanking} />
    </div>
  );
};

export default Ranking;

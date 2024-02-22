import { motion } from "framer-motion";
import Button from "./Ui/Button";
import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

const GameOver = () => {
  const ctx = useContext(GameContext);
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleScore = (e) => {
    e.preventDefault();
    ctx.submitScore(name);

    setName("");
    setSubmit(true);
  };

  const handleRest = () => {
    ctx.setStartGame(false);
    ctx.setShowRules(false);
    ctx.setScore(0);
  };

  const handlePlayAgain = () => {
    ctx.setStartGame(false);
    ctx.setShowRules(true);
    ctx.setScore(0);
  };

  return (
    <motion.section
      className="w-10/12 md:w-1/2 h-[500PX] m-auto absolute top-0 bottom-0 left-0 right-0 z-20 flex flex-col gap-5 items-center p-10  border-double border-4 rounded-2xl bg-black  text-white"
      animate={{ y: ["-100%", "0%"] }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <h3>GAME OVER</h3>
      <p>{ctx.score}</p>
      <Button text="PLAY AGAIN" onClick={handlePlayAgain} />
      <Button text="MENU" onClick={handleRest} />
      {!submit ? (
        <form
          className="flex flex-col items-center gap-10 border p-4 rounded-md w-11/12"
          onSubmit={handleScore}
        >
          <p className="text-center">SHARE YOUR SCORE</p>
          <input
            type="text"
            placeholder="NAME"
            maxLength={16}
            value={name}
            className="w-11/12 bg-black text-center border shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button text="SUBMIT" />
        </form>
      ) : (
        <p>Sended...</p>
      )}
    </motion.section>
  );
};

export default GameOver;

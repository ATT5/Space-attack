import { useContext } from "react";
import { stars, keysImg, scapeBarImg } from "../assets";
import { GameContext } from "../context/GameContext";
import { motion } from "framer-motion";
import Button from "./Ui/Button";

const GameRules = () => {
  const ctx = useContext(GameContext);

  const startGameAndMusic = () => {
    ctx.setStartGame(true);
    ctx.setPlayMusic(true);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${stars})` }}
    >
      <motion.section
        className="w-10/12 md:w-1/2 flex flex-col gap-5 items-center p-10  border-double border-4 rounded-2xl bg-black relative z-10 text-white"
        animate={{ y: ["-100%", "0%"] }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <h2 className="text-2xl text-center">How to Play</h2>
        <div className=" text-center lg:flex flex-col lg:items-center justify-center">
          <div className="flex  justify-center">
            <img
              src={keysImg}
              alt="keys"
              className="md:w-56 md:h-48 w-20 h-20"
            />
            <img
              src={scapeBarImg}
              alt="Space Bar"
              className="md:w-56 md:h-48 w-20 h-20"
            />
          </div>
          <p className="mt-4 md:text-xl text-sm]">
            Move left (⬅️) / right (➡️) with Arrow Keys to dodge & attack. Press
            Space Bar (🚀) to fire.
          </p>
        </div>

        <Button onClick={startGameAndMusic} text="START GAME" />
      </motion.section>
    </div>
  );
};

export default GameRules;

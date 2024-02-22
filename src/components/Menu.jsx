import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import { stars, spaceShip, city, invader, linkedinIcon } from "../assets";
import { motion } from "framer-motion";
import Button from "./Ui/Button";
import Ranking from "./Ranking";

const Menu = () => {
  const [showRanking, setShowRanking] = useState(false);
  const ctx = useContext(GameContext);

  const handleRules = () => ctx.setShowRules(true);
  const handleRanking = () => setShowRanking((prev) => !prev);

  return (
    <main
      className="w-full h-screen flex flex-col justify-center items-center  relative overflow-hidden"
      style={{ backgroundImage: `url(${stars})` }}
    >
      {/* spaceship */}
      <motion.div
        className=" absolute left-10 h-screen w-full flex items-end z-10"
        animate={{ y: ["0%", "-100%"], x: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <img src={spaceShip} alt="spaceship" className="w-24 h-24 rotate-45" />
      </motion.div>
      <motion.section
        className="w-10/12 md:w-1/2 md:h-2/3 h-96 flex flex-col gap-5 items-center p-10  border-double border-4 rounded-2xl bg-black relative z-10 "
        animate={{ y: ["-100%", "0%"] }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        {!showRanking ? (
          <>
            <img
              src={invader}
              alt="invader"
              className="w-12 h-12 absolute md:right-14 right-3"
            />
            <h1 className="mb-5  -skew-y-[6deg] font-press-start flex flex-col text-5xl lg:text-8xl gap-5 bg-gradient-to-t from-red-700 to-amber-300 bg-clip-text text-transparent">
              SPACE <span>ATTACK</span>
            </h1>

            <Button onClick={handleRules} text={"START GAME"} />
            <Button onClick={handleRanking} text={"RANKING"} />
          </>
        ) : (
          <Ranking handleRanking={handleRanking} />
        )}
      </motion.section>
      <div
        className="city h-screen w-full absolute top-0 bottom-0 -right-1/2  -skew-x-12"
        style={{ backgroundImage: `url(${city})` }}
      ></div>

      <a
        href="https://www.linkedin.com/in/arturobaylon/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 left-3 text-yellow-500 flex  w-full items-center"
      >
        <img src={linkedinIcon} alt="linkedin" className="w-10 h-10" />
      </a>
      <div className="absolute bottom-4 right-2 text-yellow-500 flex   items-center">
        <p className="text-[9px] md:text-lg">
          @Developed and designed by Arturo B
        </p>
      </div>
    </main>
  );
};

export default Menu;

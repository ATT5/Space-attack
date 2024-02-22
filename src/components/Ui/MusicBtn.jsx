// Import necessary hooks
import { useContext, useEffect, useRef } from "react";
import { musicIcon, music, cancelIcon } from "../../assets"; // Assuming these paths are correct
import { GameContext } from "../../context/GameContext";

const MusicBtn = () => {
  const { playMusic, setPlayMusic } = useContext(GameContext);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    setPlayMusic((prev) => !prev);
  };

  useEffect(() => {
    if (playMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playMusic]);

  return (
    <>
      <button
        onClick={toggleMusic}
        className="bg-white p-2 rounded-full absolute top-8 right-5 z-20"
      >
        <img
          src={musicIcon}
          alt="Toggle music"
          width={20}
          height={20}
          className="object-fill"
        />
        {!playMusic && (
          <img
            src={cancelIcon}
            alt="Toggle music"
            width={28}
            height={28}
            className="absolute z-10 object-fill top-[4px] right-[3px]"
          />
        )}
      </button>
      <audio ref={audioRef} src={music} loop />
    </>
  );
};

export default MusicBtn;

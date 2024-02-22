import Game from "./components/Game";
import Menu from "./components/Menu";
import { useContext } from "react";
import { GameContext } from "./context/GameContext";
import GameRules from "./components/GameRules";
import MusicBtn from "./components/Ui/MusicBtn";

function App() {
  const ctx = useContext(GameContext);

  return (
    <div className="w-full h-screen font-press-start">
      {ctx.startGame ? <Game /> : ctx.showRules ? <GameRules /> : <Menu />}
      <MusicBtn />
    </div>
  );
}

export default App;

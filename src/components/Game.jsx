import { useRef, useEffect, useContext, useState } from "react";
import { stars } from "../assets";
import { GameContext } from "../context/GameContext";
import Player from "../Classes/Player";
import Grid from "../Classes/Grid";
import Projectile from "../Classes/Projectile";
import GameOver from "./GameOver";
import { motion } from "framer-motion";
function checkCollision(projectile, invader) {
  if (!projectile || !invader || !projectile.position || !invader.position) {
    return false;
  }

  return (
    projectile.position.x + projectile.radius >= invader.position.x &&
    projectile.position.x - projectile.radius <=
      invader.position.x + invader.width &&
    projectile.position.y + projectile.radius >= invader.position.y &&
    projectile.position.y - projectile.radius <=
      invader.position.y + invader.height
  );
}

const Game = () => {
  const ctx = useContext(GameContext);

  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const projectilesRef = useRef([]);
  const gridsRef = useRef([]);
  const invaderProjectilesRef = useRef([]);
  const [gameActive, setGameActive] = useState(true);
  const [isAutoFiringEnabled] = useState(window.innerWidth < 768);

  const keys = {
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
    space: { pressed: false },
  };

  let game = {
    active: true,
  };

  // Function to handle button click
  const handleLeftBtn = () => {
    keys.ArrowRight.pressed = false;
    keys.ArrowLeft.pressed = true;
  };

  const handleRightBtn = () => {
    keys.ArrowLeft.pressed = false;
    keys.ArrowRight.pressed = true;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    let player = playerRef.current;
    let projectiles = projectilesRef.current;
    let grids = gridsRef.current;
    let invaderProjectiles = invaderProjectilesRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (!player) {
      player = new Player(canvas);
    }

    let frames = 0;
    let randomInterval = Math.floor(Math.random() * 500 + 500);

    const handleKeyDown = ({ key }) => {
      if (!player) return;

      switch (key) {
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          break;
        case " ":
          keys.space.pressed = true;

          projectiles.push(
            new Projectile({
              position: {
                x: player.position.x + player.width / 2,
                y: player.position.y,
              },
              velocity: {
                x: 0,
                y: -5,
              },
            })
          );

          break;
      }
    };

    const handleKeyUp = ({ key }) => {
      if (!player) return;

      switch (key) {
        case "ArrowLeft":
          keys.ArrowLeft.pressed = false;
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = false;
          break;
        case " ":
          keys.space.pressed = false;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    setInterval(() => {
      if (!isAutoFiringEnabled) return;
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y,
          },
          velocity: {
            x: 0,
            y: -5,
          },
        })
      );
    }, 200);

    // Game loop
    const updateGame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      if (!game.active && !isAutoFiringEnabled) return;
      player.update(context); // Update and draw the player
      ///restrict player movement
      if (
        keys.ArrowRight.pressed &&
        player.position.x + player.width <= canvas.width
      ) {
        player.velocity.x = 5;
        player.rotation = 0.15;
      } else if (keys.ArrowLeft.pressed && player.position.x >= 0) {
        player.velocity.x = -5;
        player.rotation = -0.15;
      } else {
        player.rotation = 0;
        player.velocity.x = 0;
      }

      ////player shoot
      projectiles.forEach((projectile, index) => {
        projectile.update(context);
        // Remove the projectile if it goes off screen
        if (projectile.position.y + projectile.radius < 0) {
          setTimeout(() => {
            projectiles.splice(index, 1);
          }, 0);
        }
      });

      ////invaders shoot
      invaderProjectiles.forEach((invaderProjectile, index) => {
        if (
          invaderProjectile.position.y + invaderProjectile.height >=
          canvas.height
        ) {
          invaderProjectiles.splice(index, 1);
        } else invaderProjectile.update(context);

        if (
          invaderProjectile.position.y + invaderProjectile.height >=
            player.position.y &&
          invaderProjectile.position.x + invaderProjectile.width >=
            player.position.x &&
          invaderProjectile.position.x <= player.position.x + player.width
        ) {
          invaderProjectiles.splice(index, 1);
          player.opacity = 0;
          game.active = false;
          setGameActive(false);
        }
      });

      const toRemoveProjectiles = new Set();
      const toRemoveInvaders = new Set();

      grids.forEach((grid) => {
        grid.update(context);

        if (frames % 100 === 0 && grid.invaders.length > 0) {
          grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
            invaderProjectiles
          );
        }

        grid.invaders.forEach((invader, invaderIndex) => {
          projectiles.forEach((projectile, projectileIndex) => {
            if (checkCollision(projectile, invader)) {
              toRemoveProjectiles.add(projectileIndex);
              toRemoveInvaders.add({
                gridIndex: grids.indexOf(grid),
                invaderIndex,
              });
              ctx.setScore((prev) => (prev += 100));
            }
          });
        });
      });

      // Remove projectiles
      toRemoveProjectiles.forEach((index) => {
        projectiles.splice(index, 1);
      });

      // Remove invaders
      toRemoveInvaders.forEach(({ gridIndex, invaderIndex }) => {
        const grid = grids[gridIndex];
        if (grid) {
          grid.invaders.splice(invaderIndex, 1);
        }
      });

      // Reset removal sets for the next frame
      toRemoveProjectiles.clear();
      toRemoveInvaders.clear();

      // Add a new grid at random intervals
      if (frames % randomInterval === 0) {
        randomInterval = Math.floor(Math.random() * 500 + 500);
        grids.push(new Grid(canvas));
      }

      frames++;
      requestAnimationFrame(updateGame);
    };
    updateGame();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // Removed player from dependencies to avoid re-running useEffect

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-black"
      style={{ backgroundImage: `url(${stars})` }}
    >
      <p className="absolute top-8 left-5 z-20 text-white">
        Score <span>{ctx.score}</span>
      </p>
      <canvas
        ref={canvasRef}
        className="   w-full h-5/6 md:h-screen self-start hidden md:block"
        // style={{ backgroundImage: `url(${stars})` }}
      />
      {/* <button
        className="lg:hidden block absolute bottom-10 left-5 z-20 bg-gray-400 p-2 rounded-xl active:bg-slate-600 w-14 h-14"
        onClick={handleLeftBtn}
      >
        <img
          src={pointerIcon}
          alt="Pointer"
          className="w-10 h-10 rotate-180  "
        />
      </button>
      <button
        className="lg:hidden block absolute bottom-10 right-5 z-20 text-white bg-gray-400 p-2 rounded-xl active:bg-slate-600 w-14 h-14"
        onClick={handleRightBtn}
      >
        <img src={pointerIcon} alt="Pointer" className="w-10 h-10 " />
      </button> */}
      <motion.section
        className=" md:hidden w-10/12  flex flex-col gap-5 items-center p-10  border-double border-4 rounded-2xl bg-black relative z-10 text-white"
        animate={{ y: ["-100%", "0%"] }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <h3 className="text-center">
          {"Sorry this game it's only available on PC :( 🖥️ "}
        </h3>
      </motion.section>
      {!gameActive && !isAutoFiringEnabled && <GameOver />}
    </div>
  );
};

export default Game;

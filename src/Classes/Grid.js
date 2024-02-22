import Invader from "./Invader";

class Grid {
  constructor(canvas) {
    this.position = {
      x: 0,
      y: 0,
    };
    this.velocity = {
      x: 6,
      y: 0,
    };
    this.invaders = [];
    this.canvas = canvas;

    const columns = Math.floor(Math.random() * 10 + 5);
    const rows = Math.floor(Math.random() * 5 + 2);
    this.width = columns * 30;

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: x * 30,
              y: y * 30, // Start a bit lower than the top
            },
          })
        );
      }
    }
  }

  update(c) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    //reset the movement of the y
    this.velocity.y = 0;

    //control of the movement  of the grid

    const gridRightEdge = this.position.x + this.width;
    const canvasRightEdge = this.canvas.width;

    // Check if the grid has reached the right or left boundary of the canvas
    if (gridRightEdge >= canvasRightEdge || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x; // Reverse direction
      this.velocity.y = 30; // Move down after hitting a wall
    }

    this.invaders.forEach((invader) => {
      invader.update(c, { velocity: this.velocity });
    });
  }
}

export default Grid;

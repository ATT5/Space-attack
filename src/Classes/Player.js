import { spaceShip } from "../assets";

class Player {
  constructor(canvas, scale = 0.15) {
    this.velocity = { x: 0, y: 0 };
    this.rotation = 0;
    this.opacity = 1;

    const image = new Image();
    image.src = spaceShip;
    this.scale = scale;
    this.canvas = canvas;

    image.onload = () => {
      this.image = image;
      this.width = image.width * this.scale;
      this.height = image.height * this.scale;
      this.position = {
        x: this.canvas.width / 2 - this.width / 2,
        y: this.canvas.height - this.height - 20,
      };
    };
  }

  draw(c) {
    if (!this.image) return; // Don't draw if the image hasn't loaded
    c.save();
    c.globalAlpha = this.opacity;
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    c.restore();
  }

  update(c) {
    if (this.image) {
      this.draw(c);
      this.position.x += this.velocity.x;
    }
  }
}
export default Player;

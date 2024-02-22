import { invader } from "../assets";
import InvaderProjectile from "./InvaderProjectile";
class Invader {
  constructor({ position }) {
    this.velocity = {
      x: 0,
      y: 0,
    };

    const image = new Image();
    image.src = invader;

    image.onload = () => {
      const scale = 1;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: position.x,
        y: position.y,
      };
    };
  }

  draw(c) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(c, { velocity }) {
    if (this.image) {
      this.draw(c);
      this.position.x += velocity.x;
      this.position.y += velocity.y;
    }
  }

  shoot(invaderProjectiles) {
    if (this.position && this.width && this.height)
      invaderProjectiles.push(
        new InvaderProjectile({
          position: {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height,
          },
          velocity: {
            x: 0,
            y: 5,
          },
        })
      );
    console.log(invaderProjectiles);
  }
}

export default Invader;

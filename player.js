class Player {
  constructor() {
    this.width = 24;
    this.height = 24;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    
    // Physics constants
    this.speed = 4.2;
    this.jumpForce = -11.5;
    this.gravity = 0.58;
    this.maxFallSpeed = 12;
    
    // States
    this.isGrounded = false;
    this.facing = 1; // 1 = right, -1 = left
    this.alive = true;
    this.squash = 1; // Visual bounce effect
  }

  reset(spawnX, spawnY) {
    this.x = spawnX;
    this.y = spawnY;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
    this.alive = true;
    this.squash = 1;
  }

  update(input, platforms) {
    if (!this.alive) return;

    // Horizontal Movement
    if (input.left) {
      this.vx = -this.speed;
      this.facing = -1;
    } else if (input.right) {
      this.vx = this.speed;
      this.facing = 1;
    } else {
      this.vx = 0;
    }

    // Jump
    if (input.jump && this.isGrounded) {
      this.vy = this.jumpForce;
      this.isGrounded = false;
      this.squash = 1.3; // Stretch up
    }

    // Gravity
    this.vy += this.gravity;
    if (this.vy > this.maxFallSpeed) this.vy = this.maxFallSpeed;

    // Apply squash decay
    this.squash += (1 - this.squash) * 0.15;

    // Movement X + Collision
    this.x += this.vx;
    for (const plat of platforms) {
      if (this.checkCollision(this, plat)) {
        if (this.vx > 0) this.x = plat.x - this.width;
        else if (this.vx < 0) this.x = plat.x + plat.w;
        this.vx = 0;
      }
    }

    // Movement Y + Collision
    this.y += this.vy;
    this.isGrounded = false;

    for (const plat of platforms) {
      if (this.checkCollision(this, plat)) {
        if (this.vy > 0) {
          // Landing on platform
          this.y = plat.y - this.height;
          this.vy = 0;
          if (!this.isGrounded) {
            this.squash = 0.8; // Squash on landing
          }
          this.isGrounded = true;
        } else if (this.vy < 0) {
          // Head hit ceiling
          this.y = plat.y + plat.h;
          this.vy = 0;
        }
      }
    }
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.height > rect2.y
    );
  }

  draw(ctx) {
    if (!this.alive) return;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height);
    
    // Scale for squash/stretch
    const sy = this.squash;
    const sx = 1 / sy;
    ctx.scale(sx, sy);

    // Body (Minimal rounded 2D avatar)
    ctx.fillStyle = '#66fcf1';
    ctx.beginPath();
    ctx.roundRect(-this.width / 2, -this.height, this.width, this.height, 6);
    ctx.fill();

    // Eyes (Looks in direction of movement)
    ctx.fillStyle = '#0b0c10';
    const eyeOffset = this.facing === 1 ? 2 : -6;
    ctx.fillRect(eyeOffset, -this.height + 6, 4, 6);
    ctx.fillRect(eyeOffset + 7, -this.height + 6, 4, 6);

    ctx.restore();
  }
}

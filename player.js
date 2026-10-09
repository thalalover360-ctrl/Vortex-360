class Player {
  constructor() {
    this.width = 20;
    this.height = 36;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    // Movement
    this.speed = 4.8;
    this.jumpForce = -12;
    this.gravity = 0.58;
    this.maxFallSpeed = 13;

    // Animation frames
    this.isGrounded = false;
    this.facing = 1;
    this.alive = true;
    this.runCycle = 0;
  }

  reset(spawnX, spawnY) {
    this.x = spawnX;
    this.y = spawnY;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
    this.alive = true;
    this.runCycle = 0;
  }

  update(input, platforms) {
    if (!this.alive) return;

    if (input.left) {
      this.vx = -this.speed;
      this.facing = -1;
      this.runCycle += 0.25;
    } else if (input.right) {
      this.vx = this.speed;
      this.facing = 1;
      this.runCycle += 0.25;
    } else {
      this.vx = 0;
      this.runCycle = 0;
    }

    if (input.jump && this.isGrounded) {
      this.vy = this.jumpForce;
      this.isGrounded = false;
    }

    this.vy += this.gravity;
    if (this.vy > this.maxFallSpeed) this.vy = this.maxFallSpeed;

    // X collision
    this.x += this.vx;
    for (const p of platforms) {
      if (this.checkCollision(this, p)) {
        if (this.vx > 0) this.x = p.x - this.width;
        else if (this.vx < 0) this.x = p.x + p.w;
        this.vx = 0;
      }
    }

    // Y collision
    this.y += this.vy;
    this.isGrounded = false;
    for (const p of platforms) {
      if (this.checkCollision(this, p)) {
        if (this.vy > 0) {
          this.y = p.y - this.height;
          this.vy = 0;
          this.isGrounded = true;
        } else if (this.vy < 0) {
          this.y = p.y + p.h;
          this.vy = 0;
        }
      }
    }
  }

  checkCollision(r1, r2) {
    return (
      r1.x < r2.x + r2.w &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.h &&
      r1.y + r1.height > r2.y
    );
  }

  draw(ctx) {
    if (!this.alive) return;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y);
    ctx.scale(this.facing, 1);

    const legSwing = Math.sin(this.runCycle) * 8;
    const armSwing = Math.cos(this.runCycle) * 7;

    // 1. Head (Human face with headband/eyes)
    ctx.fillStyle = '#ffe0bd'; // Skin tone
    ctx.beginPath();
    ctx.arc(0, 7, 6, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    ctx.fillStyle = '#111';
    ctx.fillRect(2, 5, 2, 3);

    // Hair / Cap
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(0, 5, 6.2, Math.PI, 0, false);
    ctx.fill();

    // 2. Torso (Cool Hoodie/Shirt)
    ctx.fillStyle = '#ff0055'; // Neon red/pink hoodie
    ctx.fillRect(-5, 13, 10, 12);

    // 3. Arms
    ctx.strokeStyle = '#ffe0bd';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Left arm
    ctx.beginPath();
    ctx.moveTo(-2, 15);
    ctx.lineTo(-armSwing, 24);
    ctx.stroke();

    // Right arm
    ctx.beginPath();
    ctx.moveTo(2, 15);
    ctx.lineTo(armSwing, 24);
    ctx.stroke();

    // 4. Legs & Shoes (Jeans + kicks)
    ctx.strokeStyle = '#00f0ff'; // Cyan jeans
    ctx.lineWidth = 3.5;

    // Back leg
    ctx.beginPath();
    ctx.moveTo(-2, 25);
    ctx.lineTo(-legSwing, 35);
    ctx.stroke();

    // Front leg
    ctx.beginPath();
    ctx.moveTo(2, 25);
    ctx.lineTo(legSwing, 35);
    ctx.stroke();

    ctx.restore();
  }
}

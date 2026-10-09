class Player {
  constructor() {
    this.width = 22;
    this.height = 38;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    // Movement Physics
    this.speed = 5.0;
    this.jumpForce = -12.5;
    this.gravity = 0.62;
    this.maxFallSpeed = 13;

    // States & Visual FX
    this.isGrounded = false;
    this.facing = 1;
    this.alive = true;
    this.animTime = 0;
    this.trail = [];
  }

  reset(spawnX, spawnY) {
    this.x = spawnX;
    this.y = spawnY;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
    this.alive = true;
    this.animTime = 0;
    this.trail = [];
  }

  update(input, platforms) {
    if (!this.alive) return;

    if (input.left) {
      this.vx = -this.speed;
      this.facing = -1;
      this.animTime += 0.22;
    } else if (input.right) {
      this.vx = this.speed;
      this.facing = 1;
      this.animTime += 0.22;
    } else {
      this.vx = 0;
      this.animTime = 0;
    }

    if (input.jump && this.isGrounded) {
      this.vy = this.jumpForce;
      this.isGrounded = false;
    }

    this.vy += this.gravity;
    if (this.vy > this.maxFallSpeed) this.vy = this.maxFallSpeed;

    // Store trail for motion glow effect
    if (Math.abs(this.vx) > 0.5 || !this.isGrounded) {
      this.trail.push({ x: this.x, y: this.y, alpha: 0.4 });
      if (this.trail.length > 5) this.trail.shift();
    } else {
      if (this.trail.length > 0) this.trail.shift();
    }

    // X Collision
    this.x += this.vx;
    for (const p of platforms) {
      if (this.checkCollision(this, p)) {
        if (this.vx > 0) this.x = p.x - this.width;
        else if (this.vx < 0) this.x = p.x + p.w;
        this.vx = 0;
      }
    }

    // Y Collision
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

    // 1. Motion Trail (Ghost Shadows)
    for (const t of this.trail) {
      ctx.fillStyle = `rgba(0, 240, 255, ${t.alpha})`;
      ctx.fillRect(t.x + 2, t.y + 4, this.width - 4, this.height - 8);
      t.alpha *= 0.6;
    }

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y);
    ctx.scale(this.facing, 1);

    const legMove = Math.sin(this.animTime) * 7;
    const bodyBob = Math.abs(Math.cos(this.animTime)) * 2;

    // 2. Flowing Neon Scarf / Cape (Physics-based flap)
    ctx.fillStyle = '#ff0055';
    ctx.beginPath();
    ctx.moveTo(-4, 12 + bodyBob);
    ctx.quadraticCurveTo(
      -14 - Math.abs(this.vx) * 2, 
      16 + Math.sin(this.animTime * 1.5) * 6, 
      -20 - Math.abs(this.vx) * 3, 
      22 + Math.cos(this.animTime * 1.5) * 4
    );
    ctx.lineTo(-4, 18 + bodyBob);
    ctx.closePath();
    ctx.fill();

    // 3. Legs & Hi-Tech Boots
    ctx.strokeStyle = '#1a1829';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Back Leg
    ctx.beginPath();
    ctx.moveTo(-2, 24 + bodyBob);
    ctx.lineTo(-legMove - 2, 34);
    ctx.stroke();

    // Front Leg
    ctx.beginPath();
    ctx.moveTo(3, 24 + bodyBob);
    ctx.lineTo(legMove + 3, 34);
    ctx.stroke();

    // Neon Boots Sole
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(-legMove - 5, 34, 6, 3);
    ctx.fillRect(legMove, 34, 6, 3);

    // 4. Armored Torso / Jacket
    ctx.fillStyle = '#251e3e';
    ctx.beginPath();
    ctx.roundRect(-7, 10 + bodyBob, 14, 15, 3);
    ctx.fill();

    // Jacket Neon Stripe
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(-1, 10 + bodyBob, 2, 14);

    // 5. Cyber Helmet / Head
    ctx.fillStyle = '#0d0a1a';
    ctx.beginPath();
    ctx.roundRect(-6, 0 + bodyBob, 12, 11, 4);
    ctx.fill();

    // Glowing Neon Visor (Eyes)
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    ctx.fillRect(0, 3 + bodyBob, 6, 3);
    ctx.shadowBlur = 0;

    ctx.restore();
  }
}


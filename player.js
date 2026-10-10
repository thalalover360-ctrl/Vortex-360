// Player Class - Vortex-360 (Scaled Up Edition)
class Player {
  constructor() {
    this.width = 28;
    this.height = 38;
    this.x = 60;
    this.y = 150;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5.2;
    this.jumpForce = -11.5;
    this.gravity = 0.58;
    this.isGrounded = false;
    this.facing = 1; // 1 = right, -1 = left
    this.trail = [];
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
    this.trail = [];
  }

  update(input, platforms) {
    // Left / Right Movement
    if (input.left) {
      this.vx = -this.speed;
      this.facing = -1;
    } else if (input.right) {
      this.vx = this.speed;
      this.facing = 1;
    } else {
      this.vx *= 0.78;
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
    }

    // Jump
    if (input.jump && this.isGrounded) {
      this.vy = this.jumpForce;
      this.isGrounded = false;
    }

    // Apply Gravity
    this.vy += this.gravity;
    if (this.vy > 13) this.vy = 13;

    // Horizontal Movement & Collisions
    this.x += this.vx;
    for (const p of platforms) {
      if (this.checkCollision(this, p)) {
        if (this.vx > 0) this.x = p.x - this.width;
        else if (this.vx < 0) this.x = p.x + p.w;
        this.vx = 0;
      }
    }

    // Vertical Movement & Collisions
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

    // Trail FX
    if (Math.abs(this.vx) > 1 || Math.abs(this.vy) > 1) {
      this.trail.push({ x: this.x, y: this.y, alpha: 0.5 });
      if (this.trail.length > 5) this.trail.shift();
    }
    for (let t of this.trail) t.alpha -= 0.08;
    this.trail = this.trail.filter(t => t.alpha > 0);
  }

  checkCollision(p, b) {
    return (
      p.x < b.x + b.w &&
      p.x + p.width > b.x &&
      p.y < b.y + b.h &&
      p.y + p.height > b.y
    );
  }

  draw(ctx) {
    // Neon Ghost Trail
    for (const t of this.trail) {
      ctx.fillStyle = `rgba(0, 240, 255, ${Math.max(0, t.alpha * 0.4)})`;
      ctx.fillRect(t.x, t.y, this.width, this.height);
    }

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (this.facing === -1) ctx.scale(-1, 1);

    const w = this.width;
    const h = this.height;

    // Body (Cyber Suit)
    ctx.fillStyle = '#0a0d1a';
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(-w / 2, -h / 2, w, h);

    // Glowing Neon Visor
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    ctx.fillRect(2, -h / 2 + 6, 8, 5);

    // Scarf / Cape Flow
    ctx.shadowColor = '#ff0077';
    ctx.shadowBlur = 6;
    ctx.fillStyle = '#ff0077';
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 2, -h / 2 + 10);
    ctx.lineTo(-w / 2 - 8, -h / 2 + 16);
    ctx.lineTo(-w / 2 + 2, -h / 2 + 14);
    ctx.fill();

    ctx.restore();
  }
}


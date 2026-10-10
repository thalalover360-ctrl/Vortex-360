// Dynamic Cyber Ninja Sprite - Vortex-360
class Player {
  constructor() {
    this.width = 24;
    this.height = 36;
    this.x = 50;
    this.y = 150;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5.2;
    this.jumpForce = -11.5;
    this.gravity = 0.58;
    this.isGrounded = false;
    this.facing = 1;
    this.animTimer = 0;
    this.trail = [];
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
    this.animTimer = 0;
    this.trail = [];
  }

  update(input, platforms) {
    // Movement
    if (input.left) {
      this.vx = -this.speed;
      this.facing = -1;
      this.animTimer += 0.25;
    } else if (input.right) {
      this.vx = this.speed;
      this.facing = 1;
      this.animTimer += 0.25;
    } else {
      this.vx *= 0.76;
      if (Math.abs(this.vx) < 0.1) {
        this.vx = 0;
        this.animTimer = 0;
      }
    }

    // Jump
    if (input.jump && this.isGrounded) {
      this.vy = this.jumpForce;
      this.isGrounded = false;
    }

    // Gravity
    this.vy += this.gravity;
    if (this.vy > 13) this.vy = 13;

    // Horizontal collision
    this.x += this.vx;
    for (const p of platforms) {
      if (this.checkCollision(this, p)) {
        if (this.vx > 0) this.x = p.x - this.width;
        else if (this.vx < 0) this.x = p.x + p.w;
        this.vx = 0;
      }
    }

    // Vertical collision
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

    // Ghost Dash Trail
    if (Math.abs(this.vx) > 1.5 || !this.isGrounded) {
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
    // 1. Ghost Trails
    for (const t of this.trail) {
      ctx.fillStyle = `rgba(0, 240, 255, ${Math.max(0, t.alpha * 0.35)})`;
      ctx.beginPath();
      ctx.arc(t.x + this.width / 2, t.y + 10, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (this.facing === -1) ctx.scale(-1, 1);

    const legSwing = Math.sin(this.animTimer) * 7;

    // 2. Flowing Scarf / Headband Ribbons (Animated wave)
    ctx.strokeStyle = '#ff0077';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#ff0077';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    const wave = Math.sin(Date.now() / 90) * 4;
    ctx.moveTo(-5, -11);
    ctx.quadraticCurveTo(-15, -9 + wave, -22, -14 - wave);
    ctx.moveTo(-5, -9);
    ctx.quadraticCurveTo(-14, -5 + wave, -19, -8 - wave);
    ctx.stroke();

    // 3. Ninja Legs (Running & Jump Poses)
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#18122c';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    if (!this.isGrounded) {
      // In-air tuck / jump kick
      ctx.beginPath();
      ctx.moveTo(-3, 6);
      ctx.lineTo(-7, 14); // Back leg bent
      ctx.moveTo(3, 6);
      ctx.lineTo(8, 16);  // Front kick
      ctx.stroke();
    } else {
      // Running step animation
      ctx.beginPath();
      ctx.moveTo(-3, 6);
      ctx.lineTo(-3 - legSwing, 17);
      ctx.moveTo(3, 6);
      ctx.lineTo(3 + legSwing, 17);
      ctx.stroke();
    }

    // 4. Shin Guards (Neon accents)
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    if (this.isGrounded) {
      ctx.beginPath();
      ctx.moveTo(-3 - legSwing, 12);
      ctx.lineTo(-3 - legSwing, 16);
      ctx.moveTo(3 + legSwing, 12);
      ctx.lineTo(3 + legSwing, 16);
      ctx.stroke();
    }

    // 5. Ninja Torso (Cyber Armor)
    ctx.fillStyle = '#0f0a1c';
    ctx.beginPath();
    ctx.moveTo(-7, -4);
    ctx.lineTo(7, -4);
    ctx.lineTo(5, 7);
    ctx.lineTo(-5, 7);
    ctx.closePath();
    ctx.fill();

    // Armor line highlight
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(0, 7);
    ctx.stroke();

    // 6. Masked Head (Ninja Cowl)
    ctx.fillStyle = '#140e26';
    ctx.beginPath();
    ctx.arc(0, -11, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Headband
    ctx.fillStyle = '#ff0077';
    ctx.fillRect(-7.5, -14, 15, 3.5);

    // 7. Cyan Visor / Glowing Cyber Eye
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 9;
    ctx.fillRect(1, -12, 6, 2.5);

    ctx.restore();
  }
}

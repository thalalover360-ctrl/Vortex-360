// Handcrafted Levels Engine - Vortex-360 (Part 1: Levels 1 - 25)
const LEVELS = [
  // Level 1: Pehla Dhokha (Floor drops right under you)
  {
    id: 1,
    name: "Watch Your Step",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 260, h: 48 },
      { x: 260, y: 220, w: 120, h: 48, id: "dropFloor" },
      { x: 380, y: 220, w: 340, h: 48 }
    ],
    hazards: [{ x: 260, y: 250, w: 120, h: 25 }],
    update: function(player) {
      const p = this.platforms.find(pl => pl.id === "dropFloor");
      if (p && player.x > 230) p.y += 12;
    }
  },

  // Level 2: Skyfall (Spike falls when passing center)
  {
    id: 2,
    name: "Look Up",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 340, y: -60, w: 34, h: 34, id: "skySpike" }],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "skySpike");
      if (s && player.x > 260) s.y += 15;
    }
  },

  // Level 3: Bhaagta Darwaza (Door flees backwards)
  {
    id: 3,
    name: "The Coward Portal",
    spawn: { x: 40, y: 150 },
    door: { x: 540, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [],
    update: function(player) {
      if (player.x > this.door.x - 90 && this.door.x < 650) this.door.x += 8;
      if (this.door.x >= 650 && player.x > 520) this.door.x = 40;
    }
  },

  // Level 4: Doosra Step Solid Hai (Leap of Faith)
  {
    id: 4,
    name: "Leap of Faith",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 100, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 220, y: 180, w: 85, h: 22, id: "fakeStep" },
      { x: 370, y: 160, w: 90, h: 22 },
      { x: 520, y: 160, w: 200, h: 80 }
    ],
    hazards: [{ x: 150, y: 250, w: 370, h: 25 }],
    update: function(player) {
      const f = this.platforms.find(p => p.id === "fakeStep");
      if (f && player.x > 210 && player.isGrounded) f.y += 7;
    }
  },

  // Level 5: Moving Ferry (Horizontal travel over lava)
  {
    id: 5,
    name: "Lava Ferry",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 170, y: 220, w: 80, h: 22, id: "ferry", dir: 1 },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [{ x: 140, y: 250, w: 360, h: 25 }],
    update: function() {
      const f = this.platforms.find(p => p.id === "ferry");
      if (f) {
        f.x += 2.8 * f.dir;
        if (f.x > 400) f.dir = -1;
        if (f.x < 170) f.dir = 1;
      }
    }
  },

  // Level 6: Saw Hunter (Peeche se aane wali saw)
  {
    id: 6,
    name: "Run For Your Life",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: -30, y: 185, w: 35, h: 35, id: "saw" }],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "saw");
      if (s && player.x > 50) s.x += 4.8;
    }
  },

  // Level 7: Super Bounce Pad into Ceiling Danger
  {
    id: 7,
    name: "Trampoline Trouble",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 60, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 230, y: 215, w: 60, h: 16, id: "spring" },
      { x: 470, y: 120, w: 250, h: 120 }
    ],
    hazards: [
      { x: 150, y: 250, w: 320, h: 25 },
      { x: 220, y: 0, w: 120, h: 25 }
    ],
    update: function(player) {
      const sp = this.platforms.find(p => p.id === "spring");
      if (sp && player.x > sp.x - 5 && player.x < sp.x + sp.w + 5 && player.y >= sp.y - player.height - 4) {
        player.vy = -14.2;
      }
    }
  },

  // Level 8: Sinking Stone
  {
    id: 8,
    name: "Quick Sand Rock",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 240, y: 190, w: 110, h: 30, id: "sinkingRock" },
      { x: 450, y: 180, w: 270, h: 70 }
    ],
    hazards: [{ x: 160, y: 250, w: 290, h: 25 }],
    update: function(player) {
      const r = this.platforms.find(p => p.id === "sinkingRock");
      if (r && player.x > r.x - 10 && player.x < r.x + r.w + 10 && player.isGrounded) {
        r.y += 3.8;
      }
    }
  },

  // Level 9: Double Drop (2 spikes fall together)
  {
    id: 9,
    name: "Twin Daggers",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 280, y: -60, w: 30, h: 30, id: "d1" },
      { x: 450, y: -60, w: 30, h: 30, id: "d2" }
    ],
    update: function(player) {
      const d1 = this.hazards.find(h => h.id === "d1");
      const d2 = this.hazards.find(h => h.id === "d2");
      if (d1 && player.x > 210) d1.y += 16;
      if (d2 && player.x > 380) d2.y += 16;
    }
  },

  // Level 10: Crumbling Steps Sequence
  {
    id: 10,
    name: "Falling Staircase",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 70, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 160, y: 190, w: 70, h: 20, id: "st1" },
      { x: 280, y: 160, w: 70, h: 20, id: "st2" },
      { x: 400, y: 130, w: 70, h: 20, id: "st3" },
      { x: 520, y: 130, w: 200, h: 100 }
    ],
    hazards: [{ x: 120, y: 250, w: 400, h: 25 }],
    update: function(player) {
      ['st1', 'st2', 'st3'].forEach((id, idx) => {
        const s = this.platforms.find(p => p.id === id);
        if (s && player.x > s.x - 5 && player.x < s.x + s.w + 5 && player.y <= s.y + 10) {
          s.y += 6 + idx * 2;
        }
      });
    }
  },

  // Level 11: Mid-Air Inversion Gap
  {
    id: 11,
    name: "Brain Reversal",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 260, h: 48 },
      { x: 430, y: 220, w: 290, h: 48 }
    ],
    hazards: [{ x: 260, y: 250, w: 170, h: 25 }],
    update: function(player) {
      this.invertActive = (player.x > 250 && player.x < 440);
    }
  },

  // Level 12: Shrinking Island (Width kam hoti hai)
  {
    id: 12,
    name: "Melting Ice",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 240, y: 190, w: 140, h: 24, id: "meltPlat" },
      { x: 480, y: 180, w: 240, h: 60 }
    ],
    hazards: [{ x: 150, y: 250, w: 330, h: 25 }],
    update: function(player) {
      const m = this.platforms.find(p => p.id === "meltPlat");
      if (m && player.x > m.x && player.x < m.x + m.w && player.isGrounded) {
        m.w = Math.max(10, m.w - 1.4);
        m.x += 0.7;
      }
    }
  },

  // Level 13: Timed Laser Wall
  {
    id: 13,
    name: "Red Laser Barrier",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 360, y: 90, w: 24, h: 130, id: "laser13" }],
    timer: 0,
    update: function() {
      this.timer++;
      const l = this.hazards.find(h => h.id === "laser13");
      if (l) l.y = (Math.floor(this.timer / 40) % 2 === 0) ? 90 : -500;
    }
  },

  // Level 14: Fake Goal Post (Spike drops over exit)
  {
    id: 14,
    name: "Bait Door",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 620, y: -60, w: 36, h: 36, id: "doorSpike" }],
    update: function(player) {
      const ds = this.hazards.find(h => h.id === "doorSpike");
      if (ds && player.x > 530) ds.y += 18;
    }
  },

  // Level 15: Tracking Homing Dart
  {
    id: 15,
    name: "Seeker Rocket",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 320, h: 48 },
      { x: 420, y: 220, w: 300, h: 48 }
    ],
    hazards: [
      { x: 320, y: 250, w: 100, h: 25 },
      { x: 120, y: -40, w: 32, h: 32, id: "seeker" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "seeker");
      if (s) {
        if (s.y < 0) {
          s.x += (player.x - s.x) * 0.1;
          if (Math.abs(player.x - s.x) < 20) s.y = 1;
        } else {
          s.y += 15;
        }
      }
    }
  },

  // Level 16: Elevator to Hell (Must jump off in time)
  {
    id: 16,
    name: "Falling Elevator",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 100, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 190, w: 130, h: 26, id: "lift" },
      { x: 460, y: 160, w: 260, h: 80 }
    ],
    hazards: [{ x: 140, y: 250, w: 320, h: 25 }],
    update: function(player) {
      const l = this.platforms.find(p => p.id === "lift");
      if (l && player.x > l.x && player.x < l.x + l.w && player.isGrounded) {
        l.y += 5.2;
      }
    }
  },

  // Level 17: Back-and-Forth Needle Wall
  {
    id: 17,
    name: "Sweeping Spike",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 300, y: 190, w: 30, h: 30, id: "patrolSpike", dir: 1 }],
    update: function() {
      const ps = this.hazards.find(h => h.id === "patrolSpike");
      if (ps) {
        ps.x += 4.5 * ps.dir;
        if (ps.x > 540) ps.dir = -1;
        if (ps.x < 220) ps.dir = 1;
      }
    }
  },

  // Level 18: Disappearing Steps (Strobe)
  {
    id: 18,
    name: "Ghost Steps",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 100, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 230, y: 190, w: 80, h: 22, id: "ghost1" },
      { x: 380, y: 160, w: 80, h: 22, id: "ghost2" },
      { x: 510, y: 160, w: 210, h: 80 }
    ],
    hazards: [{ x: 150, y: 250, w: 360, h: 25 }],
    timer: 0,
    update: function() {
      this.timer++;
      const g1 = this.platforms.find(p => p.id === "ghost1");
      const g2 = this.platforms.find(p => p.id === "ghost2");
      const show1 = Math.floor(this.timer / 35) % 2 === 0;
      if (g1) g1.y = show1 ? 190 : -500;
      if (g2) g2.y = !show1 ? 160 : -500;
    }
  },

  // Level 19: High Jump vs Ceiling Needle
  {
    id: 19,
    name: "Watch Your Head",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 270, h: 48 },
      { x: 430, y: 220, w: 290, h: 48 }
    ],
    hazards: [
      { x: 270, y: 250, w: 160, h: 25 },
      { x: 310, y: 80, w: 80, h: 30 }
    ],
    update: function() {}
  },

  // Level 20: Dual Chaser Squeeze
  {
    id: 20,
    name: "The Pincer",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: -30, y: 185, w: 30, h: 35, id: "backSaw" },
      { x: 680, y: 185, w: 30, h: 35, id: "frontSaw" }
    ],
    update: function(player) {
      const b = this.hazards.find(h => h.id === "backSaw");
      const f = this.hazards.find(h => h.id === "frontSaw");
      if (b && player.x > 60) b.x += 4.2;
      if (f && player.x > 320) f.x -= 3.5;
    }
  },

  // Level 21: Delayed Floor Crack
  {
    id: 21,
    name: "Ticking Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 200, y: 220, w: 160, h: 48, id: "delayFloor" },
      { x: 360, y: 220, w: 360, h: 48 }
    ],
    hazards: [{ x: 200, y: 250, w: 160, h: 25 }],
    timer: 0,
    update: function(player) {
      const df = this.platforms.find(p => p.id === "delayFloor");
      if (df && player.x > 210 && player.isGrounded) {
        this.timer++;
        if (this.timer > 18) df.y += 14;
      }
    }
  },

  // Level 22: Mid-air Spring launch into fleeing door
  {
    id: 22,
    name: "Fly & Catch",
    spawn: { x: 40, y: 150 },
    door: { x: 560, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 215, w: 60, h: 16, id: "spring22" },
      { x: 460, y: 140, w: 260, h: 90 }
    ],
    hazards: [{ x: 140, y: 250, w: 320, h: 25 }],
    update: function(player) {
      const sp = this.platforms.find(p => p.id === "spring22");
      if (sp && player.x > sp.x - 5 && player.x < sp.x + sp.w + 5 && player.y >= sp.y - player.height - 4) {
        player.vy = -14.0;
      }
      if (player.x > this.door.x - 70 && this.door.x < 650) this.door.x += 6;
    }
  },

  // Level 23: Low Gravity Island Hop
  {
    id: 23,
    name: "Moon Gravity",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 250, y: 190, w: 60, h: 22 },
      { x: 420, y: 170, w: 60, h: 22 },
      { x: 560, y: 170, w: 160, h: 70 }
    ],
    hazards: [{ x: 130, y: 250, w: 430, h: 25 }],
    update: function(player) {
      if (!player.isGrounded && player.vy > 0) player.vy *= 0.94; // Float
    }
  },

  // Level 24: Descending Spike Ceiling
  {
    id: 24,
    name: "The Compactor",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 160, y: 0, w: 440, h: 30, id: "roofCompactor" }],
    update: function(player) {
      const rc = this.hazards.find(h => h.id === "roofCompactor");
      if (rc && player.x > 180 && rc.y < 120) rc.y += 1.4;
    }
  },

  // Level 25: The Gauntlet Finale (Part 1 Boss Stage)
  {
    id: 25,
    name: "Sector 25 Gauntlet",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 90, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 200, y: 190, w: 70, h: 22, id: "gPlat1" },
      { x: 340, y: 160, w: 70, h: 22, id: "gPlat2" },
      { x: 500, y: 150, w: 220, h: 80 }
    ],
    hazards: [
      { x: 130, y: 250, w: 370, h: 25 },
      { x: -30, y: 185, w: 32, h: 32, id: "bossSaw" },
      { x: 340, y: -50, w: 32, h: 32, id: "bossSpike" }
    ],
    update: function(player) {
      const saw = this.hazards.find(h => h.id === "bossSaw");
      const spk = this.hazards.find(h => h.id === "bossSpike");
      const p1 = this.platforms.find(p => p.id === "gPlat1");
      if (saw && player.x > 50) saw.x += 4.4;
      if (spk && player.x > 260) spk.y += 16;
      if (p1 && player.x > 190 && player.isGrounded) p1.y += 5;
    }
  }
];
  // Level 26: Fake Safe Zone (Platform drops when you stop)
  {
    id: 26,
    name: "Don't Stop",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 260, y: 220, w: 140, h: 48, id: "idleDrop" },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [{ x: 200, y: 250, w: 260, h: 25 }],
    idleTimer: 0,
    update: function(player) {
      const p = this.platforms.find(pl => pl.id === "idleDrop");
      if (p && player.x > 260 && player.x < 400 && player.isGrounded) {
        if (Math.abs(player.vx) < 0.2) this.idleTimer++;
        if (this.idleTimer > 15) p.y += 12;
      }
    }
  },

  // Level 27: Rising Floor Lava Spike
  {
    id: 27,
    name: "Rising Lava",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 90, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 180, w: 80, h: 22 },
      { x: 320, y: 150, w: 80, h: 22 },
      { x: 460, y: 120, w: 80, h: 22 },
      { x: 580, y: 150, w: 140, h: 90 }
    ],
    hazards: [{ x: 0, y: 260, w: 720, h: 30, id: "risingLava" }],
    update: function() {
      const l = this.hazards.find(h => h.id === "risingLava");
      if (l && l.y > 170) l.y -= 0.6;
    }
  },

  // Level 28: Wall Jumper Illusion (Bouncer pushing backwards)
  {
    id: 28,
    name: "Reverse Spring",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 215, w: 60, h: 16, id: "revSpring" },
      { x: 420, y: 220, w: 300, h: 48 }
    ],
    hazards: [{ x: 180, y: 250, w: 240, h: 25 }],
    update: function(player) {
      const sp = this.platforms.find(p => p.id === "revSpring");
      if (sp && player.x > sp.x - 5 && player.x < sp.x + sp.w + 5 && player.y >= sp.y - player.height - 4) {
        player.vy = -12.0;
        player.vx = -8.0; // Pushes backwards!
      }
    }
  },

  // Level 29: Triple Drop Falling Ceiling Spikes
  {
    id: 29,
    name: "Triple Danger",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 220, y: -60, w: 28, h: 28, id: "tr1" },
      { x: 360, y: -60, w: 28, h: 28, id: "tr2" },
      { x: 500, y: -60, w: 28, h: 28, id: "tr3" }
    ],
    update: function(player) {
      const t1 = this.hazards.find(h => h.id === "tr1");
      const t2 = this.hazards.find(h => h.id === "tr2");
      const t3 = this.hazards.find(h => h.id === "tr3");
      if (t1 && player.x > 160) t1.y += 15;
      if (t2 && player.x > 300) t2.y += 16;
      if (t3 && player.x > 440) t3.y += 17;
    }
  },

  // Level 30: Invisible Platform (Appears when close)
  {
    id: 30,
    name: "Hidden Bridge",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 250, y: -500, w: 120, h: 22, id: "hiddenPlat" }, // Starts hidden
      { x: 480, y: 170, w: 240, h: 70 }
    ],
    hazards: [{ x: 150, y: 250, w: 330, h: 25 }],
    update: function(player) {
      const hp = this.platforms.find(p => p.id === "hiddenPlat");
      if (hp && player.x > 140) hp.y = 190; // Reveals
    }
  },

  // Level 31: Fast Falling Trapdoor
  {
    id: 31,
    name: "Speed Pit",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 180, y: 220, w: 160, h: 48, id: "fastTrap" },
      { x: 340, y: 220, w: 380, h: 48 }
    ],
    hazards: [{ x: 180, y: 250, w: 160, h: 25 }],
    update: function(player) {
      const ft = this.platforms.find(p => p.id === "fastTrap");
      if (ft && player.x > 160) ft.y += 20; // Super fast drop
    }
  },

  // Level 32: Bouncing Spike Barrier
  {
    id: 32,
    name: "Jumping Hazard",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 380, y: 190, w: 32, h: 32, id: "bounceHazard", vy: -6 }],
    update: function() {
      const bh = this.hazards.find(h => h.id === "bounceHazard");
      if (bh) {
        bh.y += bh.vy;
        bh.vy += 0.4;
        if (bh.y > 190) { bh.y = 190; bh.vy = -7.5; }
      }
    }
  },

  // Level 33: Two Moving Ferries in Opposite Directions
  {
    id: 33,
    name: "Opposing Ferries",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 110, h: 48 },
      { x: 150, y: 210, w: 75, h: 20, id: "f1", dir: 1 },
      { x: 350, y: 180, w: 75, h: 20, id: "f2", dir: -1 },
      { x: 540, y: 170, w: 180, h: 70 }
    ],
    hazards: [{ x: 110, y: 250, w: 430, h: 25 }],
    update: function() {
      const f1 = this.platforms.find(p => p.id === "f1");
      const f2 = this.platforms.find(p => p.id === "f2");
      if (f1) {
        f1.x += 2.5 * f1.dir;
        if (f1.x > 260) f1.dir = -1;
        if (f1.x < 140) f1.dir = 1;
      }
      if (f2) {
        f2.x += 2.8 * f2.dir;
        if (f2.x > 450) f2.dir = -1;
        if (f2.x < 320) f2.dir = 1;
      }
    }
  },

  // Level 34: Fake Door Above, Real Exit Below
  {
    id: 34,
    name: "Underground Exit",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 220, w: 36, h: 48 }, // Real door low
    platforms: [
      { x: 0, y: 220, w: 280, h: 48 },
      { x: 400, y: 140, w: 180, h: 24 }, // High fake platform
      { x: 400, y: 268, w: 320, h: 48 }
    ],
    hazards: [
      { x: 280, y: 250, w: 120, h: 25 },
      { x: 530, y: 90, w: 36, h: 50, id: "fakeDoorSpike" } // Fake door is spike
    ],
    update: function() {}
  },

  // Level 35: High Speed Chaser Saw 2.0
  {
    id: 35,
    name: "Turbo Saw",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 320, h: 48 },
      { x: 400, y: 220, w: 320, h: 48 }
    ],
    hazards: [
      { x: 320, y: 250, w: 80, h: 25 },
      { x: -40, y: 185, w: 36, h: 36, id: "turbosaw" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "turbosaw");
      if (s && player.x > 40) s.x += 5.5; // Very fast
    }
  },

  // Level 36: Double Inversion Gate
  {
    id: 36,
    name: "Confusion Gate",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 220, w: 140, h: 48 },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [
      { x: 180, y: 250, w: 80, h: 25 },
      { x: 400, y: 250, w: 80, h: 25 }
    ],
    update: function(player) {
      this.invertActive = (player.x > 180 && player.x < 360);
    }
  },

  // Level 37: Floating Crumbler into Jump Pad
  {
    id: 37,
    name: "Spring Step",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 210, y: 190, w: 75, h: 22, id: "crSpring" },
      { x: 360, y: 200, w: 55, h: 16, id: "pad37" },
      { x: 510, y: 140, w: 210, h: 90 }
    ],
    hazards: [{ x: 140, y: 250, w: 370, h: 25 }],
    update: function(player) {
      const cs = this.platforms.find(p => p.id === "crSpring");
      const pad = this.platforms.find(p => p.id === "pad37");
      if (cs && player.x > 200 && player.isGrounded) cs.y += 6;
      if (pad && player.x > pad.x - 5 && player.x < pad.x + pad.w + 5 && player.y >= pad.y - player.height - 4) {
        player.vy = -13.5;
      }
    }
  },

  // Level 38: Blinking Laser Tunnel (Double Beams)
  {
    id: 38,
    name: "Dual Lasers",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 260, y: 90, w: 20, h: 130, id: "las1" },
      { x: 440, y: 90, w: 20, h: 130, id: "las2" }
    ],
    timer: 0,
    update: function() {
      this.timer++;
      const l1 = this.hazards.find(h => h.id === "las1");
      const l2 = this.hazards.find(h => h.id === "las2");
      const tick = Math.floor(this.timer / 35);
      if (l1) l1.y = (tick % 2 === 0) ? 90 : -500;
      if (l2) l2.y = (tick % 2 !== 0) ? 90 : -500;
    }
  },

  // Level 39: Shrinking Step Bridge
  {
    id: 39,
    name: "Vanishing Bridge",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 190, w: 120, h: 22, id: "shrink1" },
      { x: 380, y: 170, w: 120, h: 22, id: "shrink2" },
      { x: 530, y: 180, w: 190, h: 70 }
    ],
    hazards: [{ x: 140, y: 250, w: 390, h: 25 }],
    update: function(player) {
      const s1 = this.platforms.find(p => p.id === "shrink1");
      const s2 = this.platforms.find(p => p.id === "shrink2");
      if (s1 && player.x > s1.x && player.x < s1.x + s1.w && player.isGrounded) {
        s1.w = Math.max(10, s1.w - 1.2);
        s1.x += 0.6;
      }
      if (s2 && player.x > s2.x && player.x < s2.x + s2.w && player.isGrounded) {
        s2.w = Math.max(10, s2.w - 1.2);
        s2.x += 0.6;
      }
    }
  },

  // Level 40: Moving Needle Bed
  {
    id: 40,
    name: "Mobile Spikes",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 300, y: 190, w: 90, h: 30, id: "needleBed", dir: 1 }],
    update: function() {
      const nb = this.hazards.find(h => h.id === "needleBed");
      if (nb) {
        nb.x += 3.8 * nb.dir;
        if (nb.x > 500) nb.dir = -1;
        if (nb.x < 240) nb.dir = 1;
      }
    }
  },

  // Level 41: Coward Door with Spike Drop combo
  {
    id: 41,
    name: "Trap Portal 2",
    spawn: { x: 40, y: 150 },
    door: { x: 550, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 50, y: -60, w: 34, h: 34, id: "retSpike" }],
    update: function(player) {
      const rs = this.hazards.find(h => h.id === "retSpike");
      if (player.x > this.door.x - 80 && this.door.x < 650) {
        this.door.x += 8;
      }
      if (this.door.x >= 650 && player.x > 500) {
        this.door.x = 40; // Flees to spawn
        if (rs) rs.y = 190; // Spike guards spawn!
      }
    }
  },

  // Level 42: Delayed Crusher Drop
  {
    id: 42,
    name: "Heavy Anvil",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 300, h: 48 },
      { x: 420, y: 220, w: 300, h: 48 }
    ],
    hazards: [
      { x: 300, y: 250, w: 120, h: 25 },
      { x: 340, y: -80, w: 50, h: 50, id: "anvil" }
    ],
    update: function(player) {
      const a = this.hazards.find(h => h.id === "anvil");
      if (a && player.x > 280) a.y += 18;
    }
  },

  // Level 43: Triple Ghost Step Staircase
  {
    id: 43,
    name: "Phantom Stairs",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 190, w: 70, h: 20, id: "ph1" },
      { x: 300, y: 160, w: 70, h: 20, id: "ph2" },
      { x: 420, y: 130, w: 70, h: 20, id: "ph3" },
      { x: 530, y: 140, w: 190, h: 90 }
    ],
    hazards: [{ x: 120, y: 250, w: 410, h: 25 }],
    timer: 0,
    update: function() {
      this.timer++;
      const p1 = this.platforms.find(p => p.id === "ph1");
      const p2 = this.platforms.find(p => p.id === "ph2");
      const p3 = this.platforms.find(p => p.id === "ph3");
      const mod = Math.floor(this.timer / 30) % 3;
      if (p1) p1.y = (mod === 0) ? 190 : -500;
      if (p2) p2.y = (mod === 1) ? 160 : -500;
      if (p3) p3.y = (mod === 2) ? 130 : -500;
    }
  },

  // Level 44: Pit Trap on Safe Looking Finish Platform
  {
    id: 44,
    name: "False Finish",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 360, h: 48 },
      { x: 360, y: 220, w: 160, h: 48, id: "endPit" },
      { x: 520, y: 220, w: 200, h: 48 }
    ],
    hazards: [{ x: 360, y: 250, w: 160, h: 25 }],
    update: function(player) {
      const ep = this.platforms.find(p => p.id === "endPit");
      if (ep && player.x > 380) ep.y += 14;
    }
  },

  // Level 45: Fast Back-Tracking Spike
  {
    id: 45,
    name: "Boomerang Spike",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 650, y: 190, w: 30, h: 30, id: "boomSpike" }],
    update: function(player) {
      const bs = this.hazards.find(h => h.id === "boomSpike");
      if (bs && player.x > 180) bs.x -= 5.2; // Rushes left towards you
    }
  },

  // Level 46: High Bounce into Inversion Zone
  {
    id: 46,
    name: "Inverted Launch",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 220, y: 215, w: 60, h: 16, id: "invSpring" },
      { x: 480, y: 140, w: 240, h: 90 }
    ],
    hazards: [{ x: 150, y: 250, w: 330, h: 25 }],
    update: function(player) {
      const sp = this.platforms.find(p => p.id === "invSpring");
      if (sp && player.x > sp.x - 5 && player.x < sp.x + sp.w + 5 && player.y >= sp.y - player.height - 4) {
        player.vy = -14.2;
      }
      this.invertActive = (player.y < 160); // Controls invert in the air!
    }
  },

  // Level 47: Descending Sinking Islands Chain
  {
    id: 47,
    name: "Sinking Chain",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 190, y: 190, w: 85, h: 22, id: "sk1" },
      { x: 340, y: 190, w: 85, h: 22, id: "sk2" },
      { x: 490, y: 180, w: 230, h: 70 }
    ],
    hazards: [{ x: 130, y: 250, w: 360, h: 25 }],
    update: function(player) {
      const s1 = this.platforms.find(p => p.id === "sk1");
      const s2 = this.platforms.find(p => p.id === "sk2");
      if (s1 && player.x > s1.x - 10 && player.x < s1.x + s1.w + 10 && player.isGrounded) s1.y += 4.0;
      if (s2 && player.x > s2.x - 10 && player.x < s2.x + s2.w + 10 && player.isGrounded) s2.y += 4.0;
    }
  },

  // Level 48: The Laser Matrix (3 Alternating Beams)
  {
    id: 48,
    name: "Triple Laser Grid",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 220, y: 90, w: 18, h: 130, id: "lz1" },
      { x: 360, y: 90, w: 18, h: 130, id: "lz2" },
      { x: 500, y: 90, w: 18, h: 130, id: "lz3" }
    ],
    timer: 0,
    update: function() {
      this.timer++;
      const z1 = this.hazards.find(h => h.id === "lz1");
      const z2 = this.hazards.find(h => h.id === "lz2");
      const z3 = this.hazards.find(h => h.id === "lz3");
      const step = Math.floor(this.timer / 28) % 3;
      if (z1) z1.y = (step === 0) ? 90 : -500;
      if (z2) z2.y = (step === 1) ? 90 : -500;
      if (z3) z3.y = (step === 2) ? 90 : -500;
    }
  },

  // Level 49: Moving Gap Floor
  {
    id: 49,
    name: "Shifting Void",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 220, w: 200, h: 48, id: "shiftFloor", dir: 1 },
      { x: 540, y: 220, w: 180, h: 48 }
    ],
    hazards: [
      { x: 180, y: 250, w: 80, h: 25 },
      { x: 460, y: 250, w: 80, h: 25 }
    ],
    update: function() {
      const sf = this.platforms.find(p => p.id === "shiftFloor");
      if (sf) {
        sf.x += 2.6 * sf.dir;
        if (sf.x > 320) sf.dir = -1;
        if (sf.x < 210) sf.dir = 1;
      }
    }
  },

  // Level 50: Halfway Boss Gauntlet (Laser + Chaser + Crumble)
  {
    id: 50,
    name: "Sector 50 Overlord",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 200, y: 190, w: 80, h: 22, id: "bossCrumble" },
      { x: 360, y: 160, w: 80, h: 22 },
      { x: 500, y: 140, w: 220, h: 90 }
    ],
    hazards: [
      { x: 130, y: 250, w: 370, h: 25 },
      { x: -40, y: 185, w: 36, h: 36, id: "boss50Saw" },
      { x: 380, y: 60, w: 20, h: 100, id: "boss50Laser" }
    ],
    timer: 0,
    update: function(player) {
      this.timer++;
      const saw = this.hazards.find(h => h.id === "boss50Saw");
      const las = this.hazards.find(h => h.id === "boss50Laser");
      const cr = this.platforms.find(p => p.id === "bossCrumble");

      if (saw && player.x > 50) saw.x += 4.5;
      if (cr && player.x > 190 && player.isGrounded) cr.y += 6;
      if (las) las.y = (Math.floor(this.timer / 35) % 2 === 0) ? 60 : -500;
    }
  }
      // Level 51: Shrinking Runway Jump
  {
    id: 51,
    name: "Shrinking Runway",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48, id: "runway" },
      { x: 420, y: 220, w: 300, h: 48 }
    ],
    hazards: [{ x: 220, y: 250, w: 200, h: 25 }],
    update: function(player) {
      const rw = this.platforms.find(p => p.id === "runway");
      if (rw && player.x > 80 && rw.w > 80) rw.w -= 1.2;
    }
  },

  // Level 52: Falling Stalactite Rain
  {
    id: 52,
    name: "Spike Rain",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 200, y: -60, w: 26, h: 30, id: "rain1" },
      { x: 340, y: -90, w: 26, h: 30, id: "rain2" },
      { x: 480, y: -70, w: 26, h: 30, id: "rain3" }
    ],
    update: function(player) {
      const r1 = this.hazards.find(h => h.id === "rain1");
      const r2 = this.hazards.find(h => h.id === "rain2");
      const r3 = this.hazards.find(h => h.id === "rain3");
      if (r1 && player.x > 140) r1.y += 14;
      if (r2 && player.x > 260) r2.y += 15;
      if (r3 && player.x > 400) r3.y += 16;
    }
  },

  // Level 53: Vertical Floating Ferry
  {
    id: 53,
    name: "Vertical Ferry",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 240, y: 210, w: 90, h: 22, id: "vFerry", dir: -1 },
      { x: 480, y: 140, w: 240, h: 90 }
    ],
    hazards: [{ x: 140, y: 250, w: 340, h: 25 }],
    update: function() {
      const vf = this.platforms.find(p => p.id === "vFerry");
      if (vf) {
        vf.y += 2.2 * vf.dir;
        if (vf.y < 120) vf.dir = 1;
        if (vf.y > 210) vf.dir = -1;
      }
    }
  },

  // Level 54: High Gravity Zone
  {
    id: 54,
    name: "Heavy Gravity",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 280, h: 48 },
      { x: 380, y: 220, w: 340, h: 48 }
    ],
    hazards: [{ x: 280, y: 250, w: 100, h: 25 }],
    update: function(player) {
      if (!player.isGrounded) player.vy += 0.35; // Heavy pull down
    }
  },

  // Level 55: The False Floor Jump
  {
    id: 55,
    name: "Cracked Earth",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 180, y: 220, w: 120, h: 48, id: "crack1" },
      { x: 300, y: 220, w: 120, h: 48 },
      { x: 420, y: 220, w: 120, h: 48, id: "crack2" },
      { x: 540, y: 220, w: 180, h: 48 }
    ],
    hazards: [
      { x: 180, y: 250, w: 120, h: 25 },
      { x: 420, y: 250, w: 120, h: 25 }
    ],
    update: function(player) {
      const c1 = this.platforms.find(p => p.id === "crack1");
      const c2 = this.platforms.find(p => p.id === "crack2");
      if (c1 && player.x > 160) c1.y += 14;
      if (c2 && player.x > 400) c2.y += 14;
    }
  },

  // Level 56: Chaser Wall + Low Ceiling
  {
    id: 56,
    name: "Crawl or Die",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 220, y: 140, w: 260, h: 24 } // Low ceiling barrier
    ],
    hazards: [{ x: -30, y: 185, w: 34, h: 35, id: "crawlSaw" }],
    update: function(player) {
      const cs = this.hazards.find(h => h.id === "crawlSaw");
      if (cs && player.x > 50) cs.x += 4.5;
    }
  },

  // Level 57: Trampoline Leap Over Spike Wall
  {
    id: 57,
    name: "Over The Needle",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 220, y: 215, w: 60, h: 16, id: "pad57" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [
      { x: 160, y: 250, w: 320, h: 25 },
      { x: 340, y: 120, w: 25, h: 100 } // Tall spike barrier in mid
    ],
    update: function(player) {
      const p = this.platforms.find(pl => pl.id === "pad57");
      if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && player.y >= p.y - player.height - 4) {
        player.vy = -14.6;
        player.vx = 4.5; // Auto-boost forward
      }
    }
  },

  // Level 58: Blinking Floor (Appears & Disappears)
  {
    id: 58,
    name: "Strobe Bridge",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 230, y: 220, w: 140, h: 24, id: "strobeFloor" },
      { x: 450, y: 220, w: 270, h: 48 }
    ],
    hazards: [{ x: 160, y: 250, w: 290, h: 25 }],
    timer: 0,
    update: function() {
      this.timer++;
      const sf = this.platforms.find(p => p.id === "strobeFloor");
      if (sf) sf.y = (Math.floor(this.timer / 35) % 2 === 0) ? 220 : -500;
    }
  },

  // Level 59: Homing Dart Duo
  {
    id: 59,
    name: "Twin Homing Needles",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 300, h: 48 },
      { x: 420, y: 220, w: 300, h: 48 }
    ],
    hazards: [
      { x: 300, y: 250, w: 120, h: 25 },
      { x: 140, y: -50, w: 28, h: 28, id: "hDart1" },
      { x: 480, y: -50, w: 28, h: 28, id: "hDart2" }
    ],
    update: function(player) {
      const d1 = this.hazards.find(h => h.id === "hDart1");
      const d2 = this.hazards.find(h => h.id === "hDart2");
      if (d1) {
        if (d1.y < 0) {
          d1.x += (player.x - d1.x) * 0.08;
          if (Math.abs(player.x - d1.x) < 20) d1.y = 1;
        } else d1.y += 15;
      }
      if (d2) {
        if (d2.y < 0 && player.x > 320) {
          d2.x += (player.x - d2.x) * 0.08;
          if (Math.abs(player.x - d2.x) < 20) d2.y = 1;
        } else if (d2.y >= 0) d2.y += 15;
      }
    }
  },

  // Level 60: Moving Laser Sweeper
  {
    id: 60,
    name: "Laser Sweeper",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 300, y: 90, w: 20, h: 130, id: "sweepLaser", dir: 1 }],
    update: function() {
      const sl = this.hazards.find(h => h.id === "sweepLaser");
      if (sl) {
        sl.x += 3.6 * sl.dir;
        if (sl.x > 560) sl.dir = -1;
        if (sl.x < 180) sl.dir = 1;
      }
    }
  },

  // Level 61: Sinking Stairs of Regret
  {
    id: 61,
    name: "Sinking Steps",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 70, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 170, y: 190, w: 75, h: 22, id: "sStep1" },
      { x: 290, y: 160, w: 75, h: 22, id: "sStep2" },
      { x: 410, y: 130, w: 75, h: 22, id: "sStep3" },
      { x: 530, y: 130, w: 190, h: 100 }
    ],
    hazards: [{ x: 120, y: 250, w: 410, h: 25 }],
    update: function(player) {
      ['sStep1', 'sStep2', 'sStep3'].forEach((id) => {
        const p = this.platforms.find(pl => pl.id === id);
        if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && player.isGrounded) p.y += 4.5;
      });
    }
  },

  // Level 62: Flying Door Over Spikes
  {
    id: 62,
    name: "Hovering Exit",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60, dir: -1 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 300, y: 215, w: 180, h: 15 }],
    update: function() {
      this.door.y += 2.0 * this.door.dir;
      if (this.door.y < 60) this.door.dir = 1;
      if (this.door.y > 140) this.door.dir = -1;
    }
  },

  // Level 63: Full Screen Inversion Zone
  {
    id: 63,
    name: "Total Reversal",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 240, h: 48 },
      { x: 340, y: 220, w: 120, h: 48 },
      { x: 540, y: 220, w: 180, h: 48 }
    ],
    hazards: [
      { x: 240, y: 250, w: 100, h: 25 },
      { x: 460, y: 250, w: 80, h: 25 }
    ],
    update: function(player) {
      this.invertActive = (player.x > 200); // Inverted till end!
    }
  },

  // Level 64: Crumbling Floor + Fast Sky Spike
  {
    id: 64,
    name: "Dual Pressure",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 200, y: 220, w: 180, h: 48, id: "dPressPlat" },
      { x: 380, y: 220, w: 340, h: 48 }
    ],
    hazards: [
      { x: 200, y: 250, w: 180, h: 25 },
      { x: 440, y: -60, w: 34, h: 34, id: "dPressSpike" }
    ],
    update: function(player) {
      const p = this.platforms.find(pl => pl.id === "dPressPlat");
      const s = this.hazards.find(h => h.id === "dPressSpike");
      if (p && player.x > 180) p.y += 12;
      if (s && player.x > 360) s.y += 17;
    }
  },

  // Level 65: High Speed Double Saw Chase
  {
    id: 65,
    name: "Dual Saw Pursuit",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 320, h: 48 },
      { x: 400, y: 220, w: 320, h: 48 }
    ],
    hazards: [
      { x: 320, y: 250, w: 80, h: 25 },
      { x: -40, y: 185, w: 34, h: 35, id: "chSaw1" },
      { x: -110, y: 185, w: 34, h: 35, id: "chSaw2" }
    ],
    update: function(player) {
      const s1 = this.hazards.find(h => h.id === "chSaw1");
      const s2 = this.hazards.find(h => h.id === "chSaw2");
      if (s1 && player.x > 40) s1.x += 4.9;
      if (s2 && player.x > 40) s2.x += 5.2;
    }
  },

  // Level 66: Tiny Island Hop
  {
    id: 66,
    name: "Needle Islands",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 190, y: 190, w: 45, h: 22 },
      { x: 300, y: 170, w: 45, h: 22 },
      { x: 410, y: 190, w: 45, h: 22 },
      { x: 520, y: 170, w: 200, h: 70 }
    ],
    hazards: [{ x: 120, y: 250, w: 400, h: 25 }],
    update: function() {}
  },

  // Level 67: Fast Shrinking Stepping Stone
  {
    id: 67,
    name: "Rapid Shrink",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 230, y: 190, w: 160, h: 22, id: "fastShrink" },
      { x: 470, y: 180, w: 250, h: 60 }
    ],
    hazards: [{ x: 150, y: 250, w: 320, h: 25 }],
    update: function(player) {
      const fs = this.platforms.find(p => p.id === "fastShrink");
      if (fs && player.x > fs.x && player.x < fs.x + fs.w && player.isGrounded) {
        fs.w = Math.max(8, fs.w - 2.2);
        fs.x += 1.1;
      }
    }
  },

  // Level 68: Sweeper Spikes Crossfire
  {
    id: 68,
    name: "Spike Crossfire",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 220, y: 190, w: 32, h: 30, id: "cross1", dir: 1 },
      { x: 520, y: 190, w: 32, h: 30, id: "cross2", dir: -1 }
    ],
    update: function() {
      const c1 = this.hazards.find(h => h.id === "cross1");
      const c2 = this.hazards.find(h => h.id === "cross2");
      if (c1) {
        c1.x += 3.8 * c1.dir;
        if (c1.x > 380) c1.dir = -1;
        if (c1.x < 180) c1.dir = 1;
      }
      if (c2) {
        c2.x += 3.8 * c2.dir;
        if (c2.x > 560) c2.dir = -1;
        if (c2.x < 390) c2.dir = 1;
      }
    }
  },

  // Level 69: Teleport Trap on Goal Step
  {
    id: 69,
    name: "The Trick Portal",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 300, h: 48 },
      { x: 400, y: 220, w: 320, h: 48 }
    ],
    hazards: [
      { x: 300, y: 250, w: 100, h: 25 },
      { x: 620, y: -60, w: 34, h: 34, id: "trickSpike" }
    ],
    update: function(player) {
      const ts = this.hazards.find(h => h.id === "trickSpike");
      if (player.x > 540) {
        if (this.door.x === 620) this.door.x = 60; // Flips to beginning
        if (ts) ts.y += 18;
      }
    }
  },

  // Level 70: Slow Falling Big Rock (Must dash beneath)
  {
    id: 70,
    name: "Indiana Boulder",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 320, y: -90, w: 60, h: 60, id: "boulder" }],
    update: function(player) {
      const b = this.hazards.find(h => h.id === "boulder");
      if (b && player.x > 220) b.y += 16;
    }
  },

  // Level 71: Double Jump Ferry Hop
  {
    id: 71,
    name: "Double Ferry Hop",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 100, h: 48 },
      { x: 160, y: 200, w: 75, h: 20, id: "hopF1", dir: 1 },
      { x: 350, y: 180, w: 75, h: 20, id: "hopF2", dir: -1 },
      { x: 530, y: 160, w: 190, h: 80 }
    ],
    hazards: [{ x: 100, y: 250, w: 430, h: 25 }],
    update: function() {
      const f1 = this.platforms.find(p => p.id === "hopF1");
      const f2 = this.platforms.find(p => p.id === "hopF2");
      if (f1) {
        f1.x += 2.6 * f1.dir;
        if (f1.x > 260) f1.dir = -1;
        if (f1.x < 140) f1.dir = 1;
      }
      if (f2) {
        f2.x += 2.6 * f2.dir;
        if (f2.x > 450) f2.dir = -1;
        if (f2.x < 330) f2.dir = 1;
      }
    }
  },

  // Level 72: Reverse Trampoline into Spikes
  {
    id: 72,
    name: "Spike Trampoline",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 230, y: 215, w: 60, h: 16, id: "badSpring" },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [
      { x: 160, y: 250, w: 300, h: 25 },
      { x: 210, y: 20, w: 100, h: 25 } // Ceiling trap above spring
    ],
    update: function(player) {
      const bs = this.platforms.find(p => p.id === "badSpring");
      if (bs && player.x > bs.x - 5 && player.x < bs.x + bs.w + 5 && player.y >= bs.y - player.height - 4) {
        player.vy = -14.8; // High launch right into ceiling spikes
      }
    }
  },

  // Level 73: Ghost Door (Appears only on mid step)
  {
    id: 73,
    name: "Appearing Portal",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: -500, w: 36, h: 60 }, // Starts hidden offscreen
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 300, y: 180, w: 110, h: 24, id: "keyPlat" },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [{ x: 200, y: 250, w: 300, h: 25 }],
    update: function(player) {
      const kp = this.platforms.find(p => p.id === "keyPlat");
      if (kp && player.x > kp.x && player.x < kp.x + kp.w && player.isGrounded) {
        this.door.y = 140; // Door appears
      }
    }
  },

  // Level 74: Blinking Laser Tunnel (Triple Pulse)
  {
    id: 74,
    name: "Pulse Tunnel",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 240, y: 90, w: 18, h: 130, id: "pulse1" },
      { x: 420, y: 90, w: 18, h: 130, id: "pulse2" }
    ],
    timer: 0,
    update: function() {
      this.timer++;
      const p1 = this.hazards.find(h => h.id === "pulse1");
      const p2 = this.hazards.find(h => h.id === "pulse2");
      const t = Math.floor(this.timer / 30);
      if (p1) p1.y = (t % 2 === 0) ? 90 : -500;
      if (p2) p2.y = (t % 2 !== 0) ? 90 : -500;
    }
  },

  // Level 75: Sector 75 Mega Gauntlet (Boss 3)
  {
    id: 75,
    name: "Sector 75 Inferno",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 190, w: 75, h: 22, id: "b75Step1" },
      { x: 320, y: 160, w: 75, h: 22, id: "b75Step2" },
      { x: 480, y: 140, w: 240, h: 90 }
    ],
    hazards: [
      { x: 120, y: 250, w: 360, h: 25 },
      { x: -30, y: 185, w: 34, h: 35, id: "b75Saw" },
      { x: 330, y: -60, w: 32, h: 32, id: "b75Drop" }
    ],
    update: function(player) {
      const saw = this.hazards.find(h => h.id === "b75Saw");
      const dr = this.hazards.find(h => h.id === "b75Drop");
      const s1 = this.platforms.find(p => p.id === "b75Step1");
      const s2 = this.platforms.find(p => p.id === "b75Step2");

      if (saw && player.x > 40) saw.x += 4.6;
      if (dr && player.x > 250) dr.y += 16;
      if (s1 && player.x > s1.x - 5 && player.isGrounded) s1.y += 5.5;
      if (s2 && player.x > s2.x - 5 && player.isGrounded) s2.y += 5.5;
    }
      }
        // Level 76: Floor Fakeout to High Platform
  {
    id: 76,
    name: "Climb or Fall",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 180, y: 220, w: 180, h: 48, id: "climbDrop" },
      { x: 260, y: 150, w: 90, h: 22 },
      { x: 440, y: 140, w: 280, h: 90 }
    ],
    hazards: [{ x: 180, y: 250, w: 180, h: 25 }],
    update: function(player) {
      const cd = this.platforms.find(p => p.id === "climbDrop");
      if (cd && player.x > 180 && player.y > 170) cd.y += 12;
    }
  },

  // Level 77: Reverse Momentum Ferry
  {
    id: 77,
    name: "Jerky Ferry",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 200, y: 200, w: 80, h: 20, id: "jerkFerry", dir: 1 },
      { x: 480, y: 180, w: 240, h: 60 }
    ],
    hazards: [{ x: 130, y: 250, w: 350, h: 25 }],
    update: function(player) {
      const jf = this.platforms.find(p => p.id === "jerkFerry");
      if (jf) {
        jf.x += 3.4 * jf.dir;
        if (jf.x > 380) jf.dir = -1;
        if (jf.x < 180) jf.dir = 1;
        if (player.x > jf.x && player.x < jf.x + jf.w && player.isGrounded) {
          player.x += 1.8 * jf.dir; // Carries player
        }
      }
    }
  },

  // Level 78: Ceiling Squeeze Gap
  {
    id: 78,
    name: "Narrow Crawl",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 260, y: 110, w: 200, h: 65 } // Low overhead ceiling
    ],
    hazards: [{ x: 300, y: 215, w: 120, h: 15 }], // Must jump strictly between low ceiling and floor
    update: function() {}
  },

  // Level 79: Quad Crumble Runner
  {
    id: 79,
    name: "Quad Crumbles",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 90, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 110, h: 48 },
      { x: 150, y: 200, w: 65, h: 20, id: "qc1" },
      { x: 255, y: 180, w: 65, h: 20, id: "qc2" },
      { x: 360, y: 160, w: 65, h: 20, id: "qc3" },
      { x: 465, y: 140, w: 65, h: 20, id: "qc4" },
      { x: 570, y: 150, w: 150, h: 90 }
    ],
    hazards: [{ x: 110, y: 250, w: 460, h: 25 }],
    update: function(player) {
      ['qc1', 'qc2', 'qc3', 'qc4'].forEach((id) => {
        const p = this.platforms.find(pl => pl.id === id);
        if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && player.isGrounded) p.y += 6.5;
      });
    }
  },

  // Level 80: High-Speed Falling Dart Row
  {
    id: 80,
    name: "Dart Rain",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 220, y: -50, w: 26, h: 30, id: "dr1" },
      { x: 340, y: -50, w: 26, h: 30, id: "dr2" },
      { x: 460, y: -50, w: 26, h: 30, id: "dr3" },
      { x: 560, y: -50, w: 26, h: 30, id: "dr4" }
    ],
    update: function(player) {
      const d1 = this.hazards.find(h => h.id === "dr1");
      const d2 = this.hazards.find(h => h.id === "dr2");
      const d3 = this.hazards.find(h => h.id === "dr3");
      const d4 = this.hazards.find(h => h.id === "dr4");
      if (d1 && player.x > 150) d1.y += 16;
      if (d2 && player.x > 270) d2.y += 16;
      if (d3 && player.x > 390) d3.y += 16;
      if (d4 && player.x > 490) d4.y += 16;
    }
  },

  // Level 81: High Trampoline over Dual Needles
  {
    id: 81,
    name: "Sky Rocket",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 60, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 210, y: 215, w: 60, h: 16, id: "skyPad" },
      { x: 500, y: 120, w: 220, h: 120 }
    ],
    hazards: [
      { x: 140, y: 250, w: 360, h: 25 },
      { x: 340, y: 100, w: 30, h: 120 }
    ],
    update: function(player) {
      const sp = this.platforms.find(p => p.id === "skyPad");
      if (sp && player.x > sp.x - 5 && player.x < sp.x + sp.w + 5 && player.y >= sp.y - player.height - 4) {
        player.vy = -15.2;
      }
    }
  },

  // Level 82: The Vanishing Floor Sequence
  {
    id: 82,
    name: "Alternating Bridge",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 200, y: 210, w: 110, h: 22, id: "alt1" },
      { x: 370, y: 190, w: 110, h: 22, id: "alt2" },
      { x: 530, y: 190, w: 190, h: 60 }
    ],
    hazards: [{ x: 140, y: 250, w: 390, h: 25 }],
    timer: 0,
    update: function() {
      this.timer++;
      const a1 = this.platforms.find(p => p.id === "alt1");
      const a2 = this.platforms.find(p => p.id === "alt2");
      const phase = Math.floor(this.timer / 32) % 2;
      if (a1) a1.y = (phase === 0) ? 210 : -500;
      if (a2) a2.y = (phase === 1) ? 190 : -500;
    }
  },

  // Level 83: Chaser Saw + Inverted Control Finish
  {
    id: 83,
    name: "Pursuit Chaos",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 350, h: 48 },
      { x: 450, y: 220, w: 270, h: 48 }
    ],
    hazards: [
      { x: 350, y: 250, w: 100, h: 25 },
      { x: -30, y: 185, w: 34, h: 35, id: "chaosSaw" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "chaosSaw");
      if (s && player.x > 40) s.x += 4.7;
      this.invertActive = (player.x > 380); // Inverted right at final jump!
    }
  },

  // Level 84: Sinking Pillar Sequence
  {
    id: 84,
    name: "Sinking Pillars",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 100, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 190, w: 70, h: 26, id: "pil1" },
      { x: 310, y: 170, w: 70, h: 26, id: "pil2" },
      { x: 440, y: 150, w: 70, h: 26, id: "pil3" },
      { x: 560, y: 160, w: 160, h: 80 }
    ],
    hazards: [{ x: 120, y: 250, w: 440, h: 25 }],
    update: function(player) {
      ['pil1', 'pil2', 'pil3'].forEach((id) => {
        const p = this.platforms.find(pl => pl.id === id);
        if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && player.isGrounded) p.y += 4.8;
      });
    }
  },

  // Level 85: Teleport Portal on False Exit
  {
    id: 85,
    name: "Looping Portal",
    spawn: { x: 40, y: 150 },
    door: { x: 580, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 360, y: 190, w: 30, h: 30, id: "midSpike85" }],
    update: function(player) {
      if (player.x > this.door.x - 80 && this.door.x < 650) this.door.x += 8;
      if (this.door.x >= 650 && player.x > 540) this.door.x = 40;
    }
  },

  // Level 86: Moving Platform with Dropping Spike
  {
    id: 86,
    name: "Hazardous Ride",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 190, y: 210, w: 85, h: 22, id: "ridePlat", dir: 1 },
      { x: 480, y: 190, w: 240, h: 60 }
    ],
    hazards: [
      { x: 140, y: 250, w: 340, h: 25 },
      { x: 330, y: -60, w: 32, h: 32, id: "rideSpike" }
    ],
    update: function(player) {
      const rp = this.platforms.find(p => p.id === "ridePlat");
      const rs = this.hazards.find(h => h.id === "rideSpike");
      if (rp) {
        rp.x += 3.0 * rp.dir;
        if (rp.x > 380) rp.dir = -1;
        if (rp.x < 170) rp.dir = 1;
      }
      if (rs && player.x > 260) rs.y += 17;
    }
  },

  // Level 87: Quad Laser Interlock
  {
    id: 87,
    name: "Quad Laser Maze",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 200, y: 90, w: 16, h: 130, id: "ql1" },
      { x: 320, y: 90, w: 16, h: 130, id: "ql2" },
      { x: 440, y: 90, w: 16, h: 130, id: "ql3" },
      { x: 540, y: 90, w: 16, h: 130, id: "ql4" }
    ],
    timer: 0,
    update: function() {
      this.timer++;
      const step = Math.floor(this.timer / 25) % 4;
      ['ql1', 'ql2', 'ql3', 'ql4'].forEach((id, idx) => {
        const l = this.hazards.find(h => h.id === id);
        if (l) l.y = (step === idx) ? 90 : -500;
      });
    }
  },

  // Level 88: Rapid Shrink + Fast Drop
  {
    id: 88,
    name: "Micro Ledge",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 190, w: 150, h: 22, id: "microPlat" },
      { x: 480, y: 170, w: 240, h: 70 }
    ],
    hazards: [{ x: 140, y: 250, w: 340, h: 25 }],
    update: function(player) {
      const mp = this.platforms.find(p => p.id === "microPlat");
      if (mp && player.x > mp.x && player.x < mp.x + mp.w && player.isGrounded) {
        mp.w = Math.max(6, mp.w - 2.8);
        mp.x += 1.4;
      }
    }
  },

  // Level 89: Triple Sweeper Wall
  {
    id: 89,
    name: "Triple Sweepers",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 200, y: 190, w: 26, h: 30, id: "sw1", dir: 1 },
      { x: 360, y: 190, w: 26, h: 30, id: "sw2", dir: -1 },
      { x: 520, y: 190, w: 26, h: 30, id: "sw3", dir: 1 }
    ],
    update: function() {
      const s1 = this.hazards.find(h => h.id === "sw1");
      const s2 = this.hazards.find(h => h.id === "sw2");
      const s3 = this.hazards.find(h => h.id === "sw3");
      if (s1) {
        s1.x += 3.2 * s1.dir;
        if (s1.x > 300) s1.dir = -1;
        if (s1.x < 170) s1.dir = 1;
      }
      if (s2) {
        s2.x += 3.2 * s2.dir;
        if (s2.x > 460) s2.dir = -1;
        if (s2.x < 330) s2.dir = 1;
      }
      if (s3) {
        s3.x += 3.2 * s3.dir;
        if (s3.x > 600) s3.dir = -1;
        if (s3.x < 480) s3.dir = 1;
      }
    }
  },

  // Level 90: Heavy Gravity Trap + Spikes
  {
    id: 90,
    name: "Crush Zone",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 250, y: 200, w: 80, h: 22 },
      { x: 420, y: 180, w: 80, h: 22 },
      { x: 570, y: 180, w: 150, h: 60 }
    ],
    hazards: [{ x: 160, y: 250, w: 410, h: 25 }],
    update: function(player) {
      if (!player.isGrounded) player.vy += 0.45; // Extreme heavy gravity
    }
  },

  // Level 91: High Bounce to Floating Key Portal
  {
    id: 91,
    name: "Sky Leap 2",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 50, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 215, w: 55, h: 16, id: "pad91" },
      { x: 490, y: 110, w: 230, h: 130 }
    ],
    hazards: [
      { x: 140, y: 250, w: 350, h: 25 },
      { x: 220, y: 0, w: 130, h: 20 } // Roof hazard
    ],
    update: function(player) {
      const p = this.platforms.find(pl => pl.id === "pad91");
      if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && player.y >= p.y - player.height - 4) {
        player.vy = -14.6;
      }
    }
  },

  // Level 92: Ghost Stairs + Delayed Drop
  {
    id: 92,
    name: "Spectral Steps",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 190, w: 70, h: 20, id: "spStep1" },
      { x: 300, y: 160, w: 70, h: 20, id: "spStep2" },
      { x: 420, y: 130, w: 70, h: 20, id: "spStep3" },
      { x: 530, y: 140, w: 190, h: 90 }
    ],
    hazards: [{ x: 120, y: 250, w: 410, h: 25 }],
    timer: 0,
    update: function(player) {
      this.timer++;
      const p1 = this.platforms.find(p => p.id === "spStep1");
      const p2 = this.platforms.find(p => p.id === "spStep2");
      const p3 = this.platforms.find(p => p.id === "spStep3");
      const mod = Math.floor(this.timer / 26) % 3;
      if (p1) p1.y = (mod === 0) ? 190 : -500;
      if (p2) p2.y = (mod === 1) ? 160 : -500;
      if (p3) p3.y = (mod === 2) ? 130 : -500;
    }
  },

  // Level 93: Double Anvil Smash
  {
    id: 93,
    name: "Dual Anvils",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 260, y: -80, w: 45, h: 45, id: "anv1" },
      { x: 460, y: -80, w: 45, h: 45, id: "anv2" }
    ],
    update: function(player) {
      const a1 = this.hazards.find(h => h.id === "anv1");
      const a2 = this.hazards.find(h => h.id === "anv2");
      if (a1 && player.x > 200) a1.y += 18;
      if (a2 && player.x > 400) a2.y += 18;
    }
  },

  // Level 94: Super Chaser Pursuit over Moving Pit
  {
    id: 94,
    name: "Nitro Pursuit",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 260, h: 48 },
      { x: 380, y: 220, w: 340, h: 48 }
    ],
    hazards: [
      { x: 260, y: 250, w: 120, h: 25 },
      { x: -40, y: 185, w: 35, h: 35, id: "nitroSaw" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "nitroSaw");
      if (s && player.x > 40) s.x += 5.6; // High speed sprint
    }
  },

  // Level 95: Complete Inversion Gauntlet
  {
    id: 95,
    name: "Upside Down Brain",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 220, y: 190, w: 80, h: 22 },
      { x: 370, y: 170, w: 80, h: 22 },
      { x: 520, y: 180, w: 200, h: 60 }
    ],
    hazards: [{ x: 150, y: 250, w: 370, h: 25 }],
    update: function() {
      this.invertActive = true; // Permanently inverted for entire level
    }
  },

  // Level 96: Crumble into Sinking Island Combo
  {
    id: 96,
    name: "Double Collapse",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 190, y: 190, w: 75, h: 22, id: "cCombo1" },
      { x: 340, y: 180, w: 100, h: 24, id: "sCombo2" },
      { x: 500, y: 170, w: 220, h: 70 }
    ],
    hazards: [{ x: 130, y: 250, w: 370, h: 25 }],
    update: function(player) {
      const c1 = this.platforms.find(p => p.id === "cCombo1");
      const s2 = this.platforms.find(p => p.id === "sCombo2");
      if (c1 && player.x > c1.x - 5 && player.isGrounded) c1.y += 6.5;
      if (s2 && player.x > s2.x - 5 && player.isGrounded) s2.y += 4.2;
    }
  },

  // Level 97: Five Laser Barrage
  {
    id: 97,
    name: "Laser Barrage",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [
      { x: 180, y: 90, w: 16, h: 130, id: "lb1" },
      { x: 280, y: 90, w: 16, h: 130, id: "lb2" },
      { x: 380, y: 90, w: 16, h: 130, id: "lb3" },
      { x: 480, y: 90, w: 16, h: 130, id: "lb4" },
      { x: 580, y: 90, w: 16, h: 130, id: "lb5" }
    ],
    timer: 0,
    update: function() {
      this.timer++;
      const step = Math.floor(this.timer / 20) % 5;
      ['lb1', 'lb2', 'lb3', 'lb4', 'lb5'].forEach((id, idx) => {
        const l = this.hazards.find(h => h.id === id);
        if (l) l.y = (step === idx) ? 90 : -500;
      });
    }
  },

  // Level 98: Falling Roof Compactor 2.0
  {
    id: 98,
    name: "Ceiling Guillotine",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [{ x: 0, y: 220, w: 720, h: 48 }],
    hazards: [{ x: 150, y: -40, w: 460, h: 40, id: "guillotine" }],
    update: function(player) {
      const g = this.hazards.find(h => h.id === "guillotine");
      if (g && player.x > 140 && g.y < 125) g.y += 2.0;
    }
  },

  // Level 99: Master Decoy Trap
  {
    id: 99,
    name: "The False Crown",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 300, h: 48 },
      { x: 400, y: 220, w: 320, h: 48 }
    ],
    hazards: [
      { x: 300, y: 250, w: 100, h: 25 },
      { x: 620, y: -60, w: 36, h: 36, id: "crownSpike" }
    ],
    update: function(player) {
      const cs = this.hazards.find(h => h.id === "crownSpike");
      if (player.x > 530) {
        if (this.door.x === 620) this.door.x = 50; // Teleports all the way back
        if (cs) cs.y += 18;
      }
    }
  },

  // Level 100: The Final Grandmaster Gauntlet
  {
    id: 100,
    name: "Grandmaster Vortex 100",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 70, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 190, w: 70, h: 22, id: "finStep1" },
      { x: 310, y: 160, w: 70, h: 22, id: "finStep2" },
      { x: 450, y: 130, w: 60, h: 16, id: "finPad" },
      { x: 560, y: 130, w: 160, h: 90 }
    ],
    hazards: [
      { x: 120, y: 250, w: 440, h: 25 },
      { x: -40, y: 185, w: 36, h: 36, id: "finBossSaw" },
      { x: 320, y: -60, w: 32, h: 32, id: "finBossDrop" },
      { x: 480, y: 40, w: 18, h: 70, id: "finLaser" }
    ],
    timer: 0,
    update: function(player) {
      this.timer++;
      const saw = this.hazards.find(h => h.id === "finBossSaw");
      const drop = this.hazards.find(h => h.id === "finBossDrop");
      const laser = this.hazards.find(h => h.id === "finLaser");
      const s1 = this.platforms.find(p => p.id === "finStep1");
      const s2 = this.platforms.find(p => p.id === "finStep2");
      const pad = this.platforms.find(p => p.id === "finPad");

      if (saw && player.x > 40) saw.x += 4.8;
      if (drop && player.x > 240) drop.y += 17;
      if (laser) laser.y = (Math.floor(this.timer / 30) % 2 === 0) ? 40 : -500;
      if (s1 && player.x > s1.x - 5 && player.isGrounded) s1.y += 5.5;
      if (s2 && player.x > s2.x - 5 && player.isGrounded) s2.y += 5.5;

      if (pad && player.x > pad.x - 5 && player.x < pad.x + pad.w + 5 && player.y >= pad.y - player.height - 4) {
        player.vy = -14.2;
      }
    }
  }
];
    

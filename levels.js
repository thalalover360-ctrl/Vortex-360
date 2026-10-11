// ==========================================
// VORTEX-360 FULL 100 HANDMADE TROLL LEVELS
// ==========================================

const levels = [
  // Level 1: Watch Your Step
  {
    id: 1,
    name: "Watch Your Step",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 300, h: 48 },
      { x: 400, y: 220, w: 320, h: 48 }
    ],
    hazards: [ { x: 300, y: 250, w: 100, h: 25 } ],
    update: function(player) {}
  },

  // Level 2: Ceiling Bonk (Invisible troll block)
  {
    id: 2,
    name: "Ceiling Bonk",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 300, y: 110, w: 40, h: 20 },
      { x: 440, y: 220, w: 280, h: 48 }
    ],
    hazards: [ { x: 220, y: 255, w: 220, h: 20 } ],
    update: function(player) {}
  },

  // Level 3: Crumbling Trust
  {
    id: 3,
    name: "Crumbling Trust",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 190, y: 200, w: 80, h: 20, id: "trap3" },
      { x: 330, y: 175, w: 80, h: 20 },
      { x: 470, y: 160, w: 250, h: 60 }
    ],
    hazards: [ { x: 140, y: 255, w: 330, h: 20 } ],
    update: function(player) {
      const p = this.platforms.find(x => x.id === "trap3");
      if (p && player.x > p.x - 10 && player.x < p.x + p.w + 10) {
        if (p.y < 260) p.y += 2.5;
      }
    }
  },

  // Level 4: Leap of Faith
  {
    id: 4,
    name: "Blind Faith",
    spawn: { x: 40, y: 100 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 180, w: 120, h: 48 },
      { x: 230, y: 215, w: 70, h: 20 },
      { x: 410, y: 185, w: 70, h: 20 },
      { x: 570, y: 215, w: 150, h: 50 }
    ],
    hazards: [ { x: 120, y: 255, w: 450, h: 20 } ],
    update: function(player) {}
  },

  // Level 5: Running Door (Troll run-away)
  {
    id: 5,
    name: "Running Door",
    spawn: { x: 40, y: 150 },
    door: { x: 380, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [],
    update: function(player) {
      if (player.x > 280 && this.door.x < 640) {
        this.door.x += 3.5;
      }
    }
  },

  // Level 6: Claustrophobia
  {
    id: 6,
    name: "Claustrophobia",
    spawn: { x: 40, y: 160 },
    door: { x: 620, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 180, y: 130, w: 320, h: 30 }
    ],
    hazards: [ { x: 290, y: 210, w: 40, h: 10 } ],
    update: function(player) {}
  },

  // Level 7: Spike Wave
  {
    id: 7,
    name: "Spike Wave",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 90, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 185, w: 75, h: 20 },
      { x: 310, y: 155, w: 75, h: 20 },
      { x: 440, y: 125, w: 75, h: 20 },
      { x: 560, y: 150, w: 160, h: 90 }
    ],
    hazards: [ { x: 120, y: 250, w: 440, h: 25, id: "spk7" } ],
    update: function(player) {
      const h = this.hazards.find(x => x.id === "spk7");
      if (h && h.y > 220) h.y -= 0.15;
    }
  },

  // Level 8: Elevator Shaft
  {
    id: 8,
    name: "Elevator Shaft",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 230, y: 140, w: 90, h: 20, id: "lift8" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 130, y: 255, w: 350, h: 20 } ],
    liftDir: 1,
    update: function(player) {
      const lift = this.platforms.find(x => x.id === "lift8");
      if (lift) {
        lift.y += (this.liftDir || 1) * 1.5;
        if (lift.y > 210) this.liftDir = -1;
        if (lift.y < 100) this.liftDir = 1;
      }
    }
  },

  // Level 9: Twin Daggers
  {
    id: 9,
    name: "Twin Daggers",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 270, y: -60, w: 30, h: 30, id: "d1" },
      { x: 460, y: -60, w: 30, h: 30, id: "d2" }
    ],
    update: function(player) {
      const d1 = this.hazards.find(h => h.id === "d1");
      const d2 = this.hazards.find(h => h.id === "d2");
      if (d1 && player.x > 210 && d1.y < 210) d1.y += 14;
      if (d2 && player.x > 400 && d2.y < 210) d2.y += 14;
    }
  },

  // Level 10: Stepping Stones (Solid, perfectly balanced, no crash)
  {
    id: 10,
    name: "Stepping Stones",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 170, y: 195, w: 80, h: 20 },
      { x: 290, y: 170, w: 80, h: 20 },
      { x: 410, y: 145, w: 80, h: 20 },
      { x: 520, y: 170, w: 200, h: 80 }
    ],
    hazards: [ { x: 130, y: 260, w: 390, h: 25 } ],
    update: function(player) {}
  },
    // Level 11: Brain Reversal (Inverted controls mid-air)
  {
    id: 11,
    name: "Brain Reversal",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 450, y: 220, w: 270, h: 48 }
    ],
    hazards: [ { x: 220, y: 255, w: 230, h: 20 } ],
    update: function(player) {
      // Beech me jump lene par controls ulti chalenge
      this.invertActive = (player.x > 220 && player.x < 450);
    }
  },

  // Level 12: Shrinking Island (Platform shrinks on standing)
  {
    id: 12,
    name: "Melting Ice",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 250, y: 190, w: 130, h: 22, id: "meltPlat" },
      { x: 480, y: 180, w: 240, h: 60 }
    ],
    hazards: [ { x: 140, y: 255, w: 340, h: 20 } ],
    update: function(player) {
      const m = this.platforms.find(p => p.id === "meltPlat");
      if (m && player.x > m.x - 5 && player.x < m.x + m.w + 5) {
        if (m.w > 20) {
          m.w -= 0.6;
          m.x += 0.3; // Dono side se chhota hoga
        }
      }
    }
  },

  // Level 13: Timed Laser Wall
  {
    id: 13,
    name: "Red Laser Barrier",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 340, y: 60, w: 20, h: 160, id: "laser13" }
    ],
    timer: 0,
    update: function() {
      this.timer = (this.timer || 0) + 1;
      const l = this.hazards.find(h => h.id === "laser13");
      if (l) {
        // Har 45 frames me laser on/off hoga
        l.y = (Math.floor(this.timer / 45) % 2 === 0) ? 60 : -400;
      }
    }
  },

  // Level 14: The Phantom Floor (Floor falls from behind)
  {
    id: 14,
    name: "Crumbling Runway",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 120, y: 220, w: 100, h: 48, id: "f1" },
      { x: 220, y: 220, w: 100, h: 48, id: "f2" },
      { x: 320, y: 220, w: 100, h: 48, id: "f3" },
      { x: 420, y: 220, w: 100, h: 48, id: "f4" },
      { x: 520, y: 220, w: 200, h: 48 }
    ],
    hazards: [ { x: 120, y: 260, w: 400, h: 20 } ],
    update: function(player) {
      ['f1', 'f2', 'f3', 'f4'].forEach((id, idx) => {
        const blk = this.platforms.find(p => p.id === id);
        if (blk && player.x > blk.x + 40) {
          blk.y += 10; // Peeche ka rasta girta jayega
        }
      });
    }
  },

  // Level 15: The Reverse Troll (Door is at the starting position)
  {
    id: 15,
    name: "Look Behind You",
    spawn: { x: 180, y: 150 },
    door: { x: 20, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 600, y: 190, w: 50, h: 30 } // Aage fake reward trap
    ],
    update: function() {}
  },

  // Level 16: Flying Guillotine
  {
    id: 16,
    name: "Guillotine Rush",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 500, y: -40, w: 40, h: 80, id: "guillotine" }
    ],
    update: function(player) {
      const g = this.hazards.find(h => h.id === "guillotine");
      if (g && player.x > 320 && g.y < 140) {
        g.y += 16; // Fast drop hammer
      }
    }
  },

  // Level 17: Floating Islands with Sneaky Spikes
  {
    id: 17,
    name: "Minefield Isles",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 90, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 100, h: 48 },
      { x: 180, y: 190, w: 70, h: 20 },
      { x: 310, y: 160, w: 70, h: 20 },
      { x: 440, y: 130, w: 70, h: 20 },
      { x: 560, y: 150, w: 160, h: 90 }
    ],
    hazards: [
      { x: 100, y: 255, w: 460, h: 20 },
      { x: 330, y: 145, w: 20, h: 15 } // Island ke theek upar hidden spike
    ],
    update: function() {}
  },

  // Level 18: Anti-Gravity Zone (High float jumps)
  {
    id: 18,
    name: "Zero G Shaft",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 550, y: 140, w: 170, h: 100 }
    ],
    hazards: [ { x: 150, y: 255, w: 400, h: 20 } ],
    update: function(player) {
      // Floating region: jump boost simulation
      if (player.x > 200 && player.x < 500 && player.vy > 1) {
        player.vy = 0.8; // Slow moon gravity fall
      }
    }
  },

  // Level 19: Troll Ceiling Drop
  {
    id: 19,
    name: "The Crushing Roof",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 260, y: 30, w: 180, h: 40, id: "crusher" }
    ],
    hazards: [],
    update: function(player) {
      const c = this.platforms.find(p => p.id === "crusher");
      if (c && player.x > 230 && c.y < 160) {
        c.y += 2.5; // Chhat neeche dabane aayegi
      }
    }
  },

  // Level 20: The Triple Jump Dilemma (Milestone troll)
  {
    id: 20,
    name: "Patience Test",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 190, y: 200, w: 60, h: 20 },
      { x: 310, y: 180, w: 60, h: 20 },
      { x: 430, y: 160, w: 60, h: 20 },
      { x: 530, y: 170, w: 190, h: 80 }
    ],
    hazards: [
      { x: 120, y: 255, w: 410, h: 20 },
      { x: 435, y: -40, w: 25, h: 25, id: "dropRock" }
    ],
    update: function(player) {
      const rock = this.hazards.find(h => h.id === "dropRock");
      if (rock && player.x > 380 && rock.y < 155) {
        rock.y += 12; // 3rd step par aate hi upar se patthar girega
      }
    }
  },
    // Level 21: The Fake Springboard (Launch into ceiling spikes)
  {
    id: 21,
    name: "Troll Trampoline",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 260, y: 215, w: 50, h: 15, id: "pad" },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [
      { x: 140, y: 255, w: 360, h: 20 },
      { x: 250, y: 40, w: 70, h: 20 } // Trampoline ke theek upar ceiling spike
    ],
    update: function(player) {
      const pad = this.platforms.find(p => p.id === "pad");
      if (pad && player.x > pad.x - 5 && player.x < pad.x + pad.w + 5 && Math.abs(player.y - (pad.y - 20)) < 10) {
        player.vy = -16; // Super high launch seedha ceiling me
      }
    }
  },

  // Level 22: Blink Platforms (Alternate vanishing act)
  {
    id: 22,
    name: "Blinking Light",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 200, y: 200, w: 80, h: 20, id: "b1" },
      { x: 360, y: 180, w: 80, h: 20, id: "b2" },
      { x: 520, y: 200, w: 200, h: 48 }
    ],
    hazards: [ { x: 120, y: 255, w: 400, h: 20 } ],
    tick: 0,
    update: function() {
      this.tick = (this.tick || 0) + 1;
      const b1 = this.platforms.find(p => p.id === "b1");
      const b2 = this.platforms.find(p => p.id === "b2");
      if (b1 && b2) {
        const toggle = Math.floor(this.tick / 50) % 2 === 0;
        b1.y = toggle ? 200 : -500;
        b2.y = toggle ? -500 : 180;
      }
    }
  },

  // Level 23: Slippery Runway
  {
    id: 23,
    name: "Zero Friction",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 340, y: 195, w: 40, h: 25 } // Beech me spike
    ],
    update: function(player) {
      // Ice sliding inertia boost
      if (player.vx && Math.abs(player.vx) > 0.1) {
        player.x += player.vx > 0 ? 1.2 : -1.2;
      }
    }
  },

  // Level 24: Descending Ceiling Corridor
  {
    id: 24,
    name: "The Squeeze",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 180, y: 80, w: 360, h: 30, id: "roof24" }
    ],
    hazards: [ { x: 300, y: 215, w: 30, h: 10 } ],
    update: function(player) {
      const r = this.platforms.find(p => p.id === "roof24");
      if (r && player.x > 160 && r.y < 150) {
        r.y += 0.4; // Slowly descends
      }
    }
  },

  // Level 25: The Phantom Door (Fake door spawns spikes, real door behind)
  {
    id: 25,
    name: "Mirage Door",
    spawn: { x: 40, y: 150 },
    door: { x: 50, y: 160, w: 36, h: 60 }, // Real door is at spawn
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 580, y: 170, w: 36, h: 50, id: "fakeDoorTrap" } // Fake door area has trap
    ],
    update: function() {}
  },

  // Level 26: The Chasing Wall of Spikes
  {
    id: 26,
    name: "The Pursuer",
    spawn: { x: 100, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 0, y: 60, w: 25, h: 170, id: "pursuer" },
      { x: 320, y: 215, w: 35, h: 12 }
    ],
    update: function() {
      const w = this.hazards.find(h => h.id === "pursuer");
      if (w && w.x < 560) {
        w.x += 1.4; // Spikes chase the player from the left
      }
    }
  },

  // Level 27: Double Jump Trap
  {
    id: 27,
    name: "Don't Double Jump",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 240, h: 48 },
      { x: 440, y: 220, w: 280, h: 48 }
    ],
    hazards: [
      { x: 240, y: 255, w: 200, h: 20 },
      { x: 310, y: 60, w: 60, h: 20 } // Spikes hit if jumping too high
    ],
    update: function() {}
  },

  // Level 28: Horizontal Missile Barrage
  {
    id: 28,
    name: "Incoming Fire",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 740, y: 180, w: 30, h: 15, id: "bullet1" }
    ],
    update: function(player) {
      const b = this.hazards.find(h => h.id === "bullet1");
      if (b) {
        b.x -= 5;
        if (b.x < -40) b.x = 740; // Infinite loop projectile
      }
    }
  },

  // Level 29: Staggered Crumble
  {
    id: 29,
    name: "Precision Dash",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 100, h: 48 },
      { x: 160, y: 200, w: 65, h: 20, id: "sc1" },
      { x: 280, y: 180, w: 65, h: 20, id: "sc2" },
      { x: 400, y: 160, w: 65, h: 20, id: "sc3" },
      { x: 520, y: 160, w: 200, h: 80 }
    ],
    hazards: [ { x: 100, y: 255, w: 420, h: 20 } ],
    update: function(player) {
      ['sc1', 'sc2', 'sc3'].forEach((id) => {
        const p = this.platforms.find(x => x.id === id);
        if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5) {
          if (p.y < 260) p.y += 1.8;
        }
      });
    }
  },

  // Level 30: Boss Corridor (The Pendulum Spike)
  {
    id: 30,
    name: "The Pendulum",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 340, y: 120, w: 35, h: 35, id: "pendulum" }
    ],
    angle: 0,
    update: function() {
      this.angle = (this.angle || 0) + 0.05;
      const pen = this.hazards.find(h => h.id === "pendulum");
      if (pen) {
        pen.x = 340 + Math.sin(this.angle) * 140; // Swings left and right smoothly
      }
    }
  },
      // Level 31: False Ceiling Drop
  {
    id: 31,
    name: "Crumbling Attic",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 260, y: 40, w: 120, h: 30, id: "attic" }
    ],
    hazards: [
      { x: 260, y: 70, w: 120, h: 15, id: "atticSpike" }
    ],
    update: function(player) {
      const a = this.platforms.find(p => p.id === "attic");
      const s = this.hazards.find(h => h.id === "atticSpike");
      if (a && s && player.x > 220 && a.y < 150) {
        a.y += 6;
        s.y += 6;
      }
    }
  },

  // Level 32: The Speed Trap (Forced fast running into sudden pit)
  {
    id: 32,
    name: "Hyper Dash",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 380, h: 48 },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [ { x: 380, y: 255, w: 120, h: 20 } ],
    update: function(player) {
      if (player.x > 150 && player.x < 360) {
        player.x += 2.5; // Automatic wind push towards pit
      }
    }
  },

  // Level 33: Stalactite Rain
  {
    id: 33,
    name: "Icicle Fall",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 200, y: -40, w: 20, h: 30, id: "ice1" },
      { x: 350, y: -40, w: 20, h: 30, id: "ice2" },
      { x: 500, y: -40, w: 20, h: 30, id: "ice3" }
    ],
    update: function(player) {
      ['ice1', 'ice2', 'ice3'].forEach((id, idx) => {
        const ice = this.hazards.find(h => h.id === id);
        if (ice && player.x > 150 + idx * 140 && ice.y < 210) {
          ice.y += 12;
        }
      });
    }
  },

  // Level 34: Elevator to Nowhere (Platform goes straight into ceiling spike)
  {
    id: 34,
    name: "Death Elevator",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 240, y: 210, w: 80, h: 20, id: "trapLift" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [
      { x: 140, y: 255, w: 340, h: 20 },
      { x: 240, y: 30, w: 80, h: 20 } // Spike on ceiling right above lift
    ],
    update: function(player) {
      const l = this.platforms.find(p => p.id === "trapLift");
      if (l && player.x > l.x - 5 && player.x < l.x + l.w + 5 && l.y > 60) {
        l.y -= 3; // Rises too fast into spikes if player stays on it
      }
    }
  },

  // Level 35: The Mirage Floor
  {
    id: 35,
    name: "Hollow Ground",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 380, y: 220, w: 340, h: 48 }
    ],
    hazards: [ { x: 180, y: 255, w: 200, h: 20 } ],
    update: function() {}
  },

  // Level 36: Double Sided Compactor
  {
    id: 36,
    name: "The Compactor",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 500, y: 120, w: 30, h: 100, id: "wallRight" }
    ],
    hazards: [],
    update: function(player) {
      const w = this.platforms.find(p => p.id === "wallRight");
      if (w && player.x > 250 && w.x > 350) {
        w.x -= 2; // Wall charges left to crush player
      }
    }
  },

  // Level 37: Floating Stair Disconnect
  {
    id: 37,
    name: "Broken Steps",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 100, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 110, h: 48 },
      { x: 170, y: 190, w: 70, h: 20 },
      { x: 300, y: 160, w: 70, h: 20, id: "ghostStep" },
      { x: 430, y: 130, w: 70, h: 20 },
      { x: 540, y: 150, w: 180, h: 80 }
    ],
    hazards: [ { x: 110, y: 255, w: 430, h: 20 } ],
    update: function(player) {
      const g = this.platforms.find(p => p.id === "ghostStep");
      if (g && player.x > 270) {
        g.y = -500; // Middle step vanishes when approached
      }
    }
  },

  // Level 38: Rolling Boulder
  {
    id: 38,
    name: "Indiana Troll",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 700, y: 175, w: 40, h: 45, id: "boulder" }
    ],
    update: function(player) {
      const b = this.hazards.find(h => h.id === "boulder");
      if (b && player.x > 180) {
        b.x -= 4.5; // Rolls towards the player
      }
    }
  },

  // Level 39: Shrinking Jump Pads
  {
    id: 39,
    name: "Needle Eye",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 200, y: 200, w: 40, h: 20 },
      { x: 340, y: 175, w: 35, h: 20 },
      { x: 470, y: 150, w: 30, h: 20 },
      { x: 560, y: 170, w: 160, h: 70 }
    ],
    hazards: [ { x: 120, y: 255, w: 440, h: 20 } ],
    update: function() {}
  },

  // Level 40: Boss Level - Bullet Wave & Sinking Island
  {
    id: 40,
    name: "The Crucible",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 240, y: 210, w: 180, h: 20, id: "sinkingArena" },
      { x: 500, y: 200, w: 220, h: 60 }
    ],
    hazards: [
      { x: 140, y: 255, w: 360, h: 20 },
      { x: 720, y: 160, w: 25, h: 15, id: "bullet40" }
    ],
    update: function(player) {
      const arena = this.platforms.find(p => p.id === "sinkingArena");
      if (arena && player.x > arena.x && player.x < arena.x + arena.w && arena.y < 240) {
        arena.y += 0.3; // Very slow sink under weight
      }
      const b = this.hazards.find(h => h.id === "bullet40");
      if (b) {
        b.x -= 4;
        if (b.x < -30) b.x = 720;
      }
    }
  },
   // Level 41: Conveyor Belt Push
  {
    id: 41,
    name: "Treadmill Run",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [ { x: 380, y: 200, w: 35, h: 20 } ],
    update: function(player) {
      // Platform push player back towards hazards
      if (player.x > 180 && player.x < 520) {
        player.x -= 1.8;
      }
    }
  },

  // Level 42: The Bait Spike (Floating coin trap)
  {
    id: 42,
    name: "Curiosity Kills",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [
      { x: 220, y: 255, w: 240, h: 20 },
      { x: 340, y: 90, w: 20, h: 20, id: "baitSpike" }
    ],
    update: function(player) {
      const spk = this.hazards.find(h => h.id === "baitSpike");
      if (spk && player.x > 280 && spk.y < 210) {
        spk.y += 10; // Mid-jump trap
      }
    }
  },

  // Level 43: Double Drop Pillars
  {
    id: 43,
    name: "Dual Crumbles",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 220, y: 190, w: 75, h: 20, id: "p1" },
      { x: 380, y: 170, w: 75, h: 20, id: "p2" },
      { x: 520, y: 180, w: 200, h: 70 }
    ],
    hazards: [ { x: 120, y: 255, w: 400, h: 20 } ],
    update: function(player) {
      const p1 = this.platforms.find(p => p.id === "p1");
      const p2 = this.platforms.find(p => p.id === "p2");
      if (p1 && player.x > p1.x - 5 && player.x < p1.x + p1.w + 5 && p1.y < 260) {
        p1.y += 2.2;
      }
      if (p2 && player.x > p2.x - 5 && player.x < p2.x + p2.w + 5 && p2.y < 260) {
        p2.y += 2.2;
      }
    }
  },

  // Level 44: Rising Lava Tide
  {
    id: 44,
    name: "Lava Surging",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 90, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 100, h: 48 },
      { x: 160, y: 185, w: 65, h: 20 },
      { x: 280, y: 155, w: 65, h: 20 },
      { x: 400, y: 125, w: 65, h: 20 },
      { x: 520, y: 150, w: 200, h: 90 }
    ],
    hazards: [ { x: 100, y: 260, w: 420, h: 25, id: "lava44" } ],
    update: function() {
      const l = this.hazards.find(h => h.id === "lava44");
      if (l && l.y > 210) l.y -= 0.12;
    }
  },

  // Level 45: Teleport Trap (Stepping forward nudges player backward)
  {
    id: 45,
    name: "Spatial Distortion",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [ { x: 460, y: 200, w: 30, h: 20 } ],
    update: function(player) {
      if (player.x > 320 && player.x < 330) {
        player.x = 240; // Glitch loop setback
      }
    }
  },

  // Level 46: The Hammer Slam
  {
    id: 46,
    name: "Hammer Time",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 360, y: -20, w: 45, h: 90, id: "slammer" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "slammer");
      if (s && player.x > 260 && s.y < 130) {
        s.y += 18; // Super fast slam
      }
    }
  },

  // Level 47: The Vanishing Bridge
  {
    id: 47,
    name: "Fade to Nothing",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 200, y: 200, w: 260, h: 20, id: "vanishPlat" },
      { x: 520, y: 200, w: 200, h: 48 }
    ],
    hazards: [ { x: 120, y: 255, w: 400, h: 20 } ],
    update: function(player) {
      const v = this.platforms.find(p => p.id === "vanishPlat");
      if (v && player.x > 280) {
        v.y = -600; // Whole bridge disappears once player commits
      }
    }
  },

  // Level 48: Sine Wave Platforms
  {
    id: 48,
    name: "Wavy Waters",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 200, y: 190, w: 70, h: 20, id: "wave1" },
      { x: 350, y: 190, w: 70, h: 20, id: "wave2" },
      { x: 500, y: 190, w: 220, h: 60 }
    ],
    hazards: [ { x: 120, y: 255, w: 380, h: 20 } ],
    angle: 0,
    update: function() {
      this.angle = (this.angle || 0) + 0.05;
      const w1 = this.platforms.find(p => p.id === "wave1");
      const w2 = this.platforms.find(p => p.id === "wave2");
      if (w1) w1.y = 190 + Math.sin(this.angle) * 30;
      if (w2) w2.y = 190 + Math.cos(this.angle) * 30;
    }
  },

  // Level 49: False Roof Trap
  {
    id: 49,
    name: "Low Clearance",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 260, y: 110, w: 180, h: 25 }
    ],
    hazards: [
      { x: 320, y: 205, w: 40, h: 15 } // Must crouch or jump with minimal power
    ],
    update: function() {}
  },

  // Level 50: Halfway Gauntlet (Boss Troll)
  {
    id: 50,
    name: "Midway Menace",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 80, h: 20, id: "mid1" },
      { x: 380, y: 170, w: 80, h: 20, id: "mid2" },
      { x: 520, y: 190, w: 200, h: 60 }
    ],
    hazards: [
      { x: 140, y: 255, w: 380, h: 20 },
      { x: 740, y: 150, w: 30, h: 15, id: "bossBullet" }
    ],
    update: function() {
      const b = this.hazards.find(h => h.id === "bossBullet");
      if (b) {
        b.x -= 4.2;
        if (b.x < -30) b.x = 740;
      }
    }
  },
      // Level 51: Low Gravity High Stakes
  {
    id: 51,
    name: "Moon Bounce",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 260, y: 220, w: 80, h: 20 },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [
      { x: 140, y: 255, w: 340, h: 20 },
      { x: 250, y: 50, w: 100, h: 20 }
    ],
    update: function(player) {
      if (player.x > 140 && player.x < 480 && player.vy > 0) {
        player.vy *= 0.85; // Low-gravity float
      }
    }
  },

  // Level 52: The Bait Pit
  {
    id: 52,
    name: "Greed Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 240, h: 48 },
      { x: 300, y: 240, w: 80, h: 20, id: "pitStep" },
      { x: 440, y: 220, w: 280, h: 48 }
    ],
    hazards: [
      { x: 240, y: 260, w: 200, h: 20 },
      { x: 320, y: 100, w: 40, h: 20, id: "pitCeiling" }
    ],
    update: function(player) {
      const c = this.hazards.find(h => h.id === "pitCeiling");
      if (c && player.x > 280 && player.x < 400 && c.y < 220) {
        c.y += 10;
      }
    }
  },

  // Level 53: Collapsing Bridge Sequence
  {
    id: 53,
    name: "Domino Steps",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 100, h: 48 },
      { x: 160, y: 205, w: 60, h: 20, id: "dm1" },
      { x: 270, y: 185, w: 60, h: 20, id: "dm2" },
      { x: 380, y: 165, w: 60, h: 20, id: "dm3" },
      { x: 490, y: 170, w: 230, h: 70 }
    ],
    hazards: [ { x: 100, y: 255, w: 390, h: 20 } ],
    update: function(player) {
      ['dm1', 'dm2', 'dm3'].forEach((id, idx) => {
        const p = this.platforms.find(item => item.id === id);
        if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && p.y < 270) {
          p.y += 2.4 + idx * 0.4;
        }
      });
    }
  },

  // Level 54: The Phantom Ceiling
  {
    id: 54,
    name: "Ghost Roof",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 280, y: 80, w: 160, h: 30, id: "ghostRoof" }
    ],
    hazards: [ { x: 330, y: 205, w: 30, h: 15 } ],
    update: function(player) {
      const gr = this.platforms.find(p => p.id === "ghostRoof");
      if (gr && player.x > 240 && gr.y < 140) {
        gr.y += 1.5;
      }
    }
  },

  // Level 55: The Door Swap Troll
  {
    id: 55,
    name: "Fake Destination",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 610, y: 180, w: 50, h: 40, id: "fakeDoorSpike" }
    ],
    swapped: false,
    update: function(player) {
      if (player.x > 450 && !this.swapped) {
        this.door.x = 40; // Door peeche spawn par teleport ho jayega
        this.swapped = true;
      }
    }
  },

  // Level 56: Speed Squeeze
  {
    id: 56,
    name: "Fast Lane",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 220, y: 130, w: 260, h: 25 }
    ],
    hazards: [
      { x: 300, y: 205, w: 35, h: 15 },
      { x: 420, y: 205, w: 35, h: 15 }
    ],
    update: function(player) {
      if (player.x > 180 && player.x < 500) {
        player.x += 1.6; // Wind drag pushing forward
      }
    }
  },

  // Level 57: The Elevator Deception
  {
    id: 57,
    name: "Deceptive Lift",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 130, h: 48 },
      { x: 240, y: 200, w: 80, h: 20, id: "fakeLift" },
      { x: 470, y: 220, w: 250, h: 48 }
    ],
    hazards: [ { x: 130, y: 255, w: 340, h: 20 } ],
    update: function(player) {
      const fl = this.platforms.find(p => p.id === "fakeLift");
      if (fl && player.x > fl.x - 5 && player.x < fl.x + fl.w + 5) {
        fl.y += 14; // Stand karte hi seedha deep drop
      }
    }
  },

  // Level 58: Pendulum Gauntlet
  {
    id: 58,
    name: "Twin Pendulums",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 250, y: 140, w: 30, h: 30, id: "pen1" },
      { x: 450, y: 140, w: 30, h: 30, id: "pen2" }
    ],
    angle: 0,
    update: function() {
      this.angle = (this.angle || 0) + 0.06;
      const p1 = this.hazards.find(h => h.id === "pen1");
      const p2 = this.hazards.find(h => h.id === "pen2");
      if (p1) p1.x = 250 + Math.sin(this.angle) * 70;
      if (p2) p2.x = 450 + Math.cos(this.angle) * 70;
    }
  },

  // Level 59: The Rising Slabs
  {
    id: 59,
    name: "Ascending Steps",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 90, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 180, w: 70, h: 20 },
      { x: 310, y: 150, w: 70, h: 20 },
      { x: 440, y: 120, w: 70, h: 20 },
      { x: 550, y: 140, w: 170, h: 90 }
    ],
    hazards: [
      { x: 120, y: 255, w: 430, h: 20 },
      { x: 330, y: -40, w: 25, h: 30, id: "fallingSpike59" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "fallingSpike59");
      if (s && player.x > 270 && s.y < 145) {
        s.y += 12;
      }
    }
  },

  // Level 60: Boss Milestone - Compactor Runway
  {
    id: 60,
    name: "The Pincer Run",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: -50, y: 60, w: 30, h: 160, id: "leftWall" },
      { x: 740, y: 160, w: 25, h: 20, id: "rocket60" }
    ],
    update: function() {
      const lw = this.hazards.find(h => h.id === "leftWall");
      if (lw && lw.x < 520) {
        lw.x += 1.5;
      }
      const r = this.hazards.find(h => h.id === "rocket60");
      if (r) {
        r.x -= 4.5;
        if (r.x < -30) r.x = 740;
      }
    }
  },
      // ==========================================
  // PART 7: LEVELS 61 - 70
  // ==========================================

  // Level 61: The Shifting Void
  {
    id: 61,
    name: "Shifting Void",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 220, y: 190, w: 75, h: 20, id: "sv1" },
      { x: 380, y: 170, w: 75, h: 20, id: "sv2" },
      { x: 520, y: 180, w: 200, h: 60 }
    ],
    hazards: [ { x: 120, y: 255, w: 400, h: 20 } ],
    shiftDir: 1,
    update: function() {
      const sv1 = this.platforms.find(p => p.id === "sv1");
      const sv2 = this.platforms.find(p => p.id === "sv2");
      if (sv1 && sv2) {
        sv1.x += (this.shiftDir || 1) * 1.2;
        sv2.x -= (this.shiftDir || 1) * 1.2;
        if (sv1.x > 260) this.shiftDir = -1;
        if (sv1.x < 180) this.shiftDir = 1;
      }
    }
  },

  // Level 62: False Landing Pad
  {
    id: 62,
    name: "Ghost Platform",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 260, y: 200, w: 100, h: 20, id: "ghost62" },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 160, y: 255, w: 300, h: 20 } ],
    update: function(player) {
      const g = this.platforms.find(p => p.id === "ghost62");
      if (g && player.x > 240) {
        g.y = -600;
      }
    }
  },

  // Level 63: Rapid Pulser Laser
  {
    id: 63,
    name: "Pulse Frequency",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 300, y: 50, w: 20, h: 170, id: "pulse1" },
      { x: 460, y: 50, w: 20, h: 170, id: "pulse2" }
    ],
    pCount: 0,
    update: function() {
      this.pCount = (this.pCount || 0) + 1;
      const p1 = this.hazards.find(h => h.id === "pulse1");
      const p2 = this.hazards.find(h => h.id === "pulse2");
      if (p1 && p2) {
        p1.y = (Math.floor(this.pCount / 35) % 2 === 0) ? 50 : -400;
        p2.y = (Math.floor(this.pCount / 35) % 2 !== 0) ? 50 : -400;
      }
    }
  },

  // Level 64: Falling Bridge Chain
  {
    id: 64,
    name: "Falling Line",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 100, h: 48 },
      { x: 130, y: 220, w: 80, h: 48, id: "fChain1" },
      { x: 240, y: 220, w: 80, h: 48, id: "fChain2" },
      { x: 350, y: 220, w: 80, h: 48, id: "fChain3" },
      { x: 460, y: 220, w: 80, h: 48, id: "fChain4" },
      { x: 570, y: 220, w: 150, h: 48 }
    ],
    hazards: [ { x: 100, y: 260, w: 470, h: 20 } ],
    update: function(player) {
      ['fChain1', 'fChain2', 'fChain3', 'fChain4'].forEach(id => {
        const p = this.platforms.find(item => item.id === id);
        if (p && player.x > p.x && player.x < p.x + p.w && p.y < 280) {
          p.y += 3.5;
        }
      });
    }
  },

  // Level 65: Inverted Wind Funnel
  {
    id: 65,
    name: "Gale Force",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 260, h: 48 },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 260, y: 255, w: 200, h: 20 } ],
    update: function(player) {
      if (player.x > 200 && player.x < 480) {
        player.x -= 2.2;
      }
    }
  },

  // Level 66: Ceiling Spikes Drop
  {
    id: 66,
    name: "Cave Collapse",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 220, y: -40, w: 30, h: 40, id: "cSpike1" },
      { x: 400, y: -40, w: 30, h: 40, id: "cSpike2" }
    ],
    update: function(player) {
      const c1 = this.hazards.find(h => h.id === "cSpike1");
      const c2 = this.hazards.find(h => h.id === "cSpike2");
      if (c1 && player.x > 180 && c1.y < 190) c1.y += 14;
      if (c2 && player.x > 360 && c2.y < 190) c2.y += 14;
    }
  },

  // Level 67: Sinking Stepping Stones
  {
    id: 67,
    name: "Quick Sand Steps",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 200, w: 70, h: 20, id: "qs1" },
      { x: 300, y: 180, w: 70, h: 20, id: "qs2" },
      { x: 420, y: 160, w: 70, h: 20, id: "qs3" },
      { x: 530, y: 180, w: 190, h: 60 }
    ],
    hazards: [ { x: 120, y: 255, w: 410, h: 20 } ],
    update: function(player) {
      ['qs1', 'qs2', 'qs3'].forEach(id => {
        const p = this.platforms.find(item => item.id === id);
        if (p && player.x > p.x && player.x < p.x + p.w && p.y < 250) {
          p.y += 1.5;
        }
      });
    }
  },

  // Level 68: The Decoy Exit
  {
    id: 68,
    name: "Wrong Turn",
    spawn: { x: 40, y: 150 },
    door: { x: 50, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 0, y: 140, w: 120, h: 20 }
    ],
    hazards: [
      { x: 620, y: 180, w: 40, h: 40 }
    ],
    update: function() {}
  },

  // Level 69: The Dual Blade Churn
  {
    id: 69,
    name: "Buzzsaw Alley",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 300, y: 185, w: 30, h: 35, id: "saw1" },
      { x: 460, y: 185, w: 30, h: 35, id: "saw2" }
    ],
    sawTick: 0,
    update: function() {
      this.sawTick = (this.sawTick || 0) + 0.06;
      const s1 = this.hazards.find(h => h.id === "saw1");
      const s2 = this.hazards.find(h => h.id === "saw2");
      if (s1 && s2) {
        s1.x = 300 + Math.sin(this.sawTick) * 40;
        s2.x = 460 + Math.cos(this.sawTick) * 40;
      }
    }
  },

  // Level 70: Zone 7 Master Troll
  {
    id: 70,
    name: "The Grand Illusion",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 80, h: 20, id: "il1" },
      { x: 380, y: 170, w: 80, h: 20, id: "il2" },
      { x: 520, y: 190, w: 200, h: 60 }
    ],
    hazards: [
      { x: 140, y: 255, w: 380, h: 20 },
      { x: 740, y: 145, w: 25, h: 15, id: "shell70" }
    ],
    update: function(player) {
      const il1 = this.platforms.find(p => p.id === "il1");
      if (il1 && player.x > 200 && il1.y < 230) il1.y += 0.8;
      const s = this.hazards.find(h => h.id === "shell70");
      if (s) {
        s.x -= 4.4;
        if (s.x < -30) s.x = 740;
      }
    }
  },
             // ==========================================
  // PART 8: LEVELS 71 - 80
  // ==========================================

  // Level 71: Rapid Rocket Alley
  {
    id: 71,
    name: "Rocket Alley",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 740, y: 175, w: 25, h: 15, id: "rkt1" },
      { x: 900, y: 175, w: 25, h: 15, id: "rkt2" }
    ],
    update: function() {
      const r1 = this.hazards.find(h => h.id === "rkt1");
      const r2 = this.hazards.find(h => h.id === "rkt2");
      if (r1) {
        r1.x -= 5.5;
        if (r1.x < -30) r1.x = 740;
      }
      if (r2) {
        r2.x -= 5.5;
        if (r2.x < -30) r2.x = 740;
      }
    }
  },

  // Level 72: Vanishing Steps of Doom
  {
    id: 72,
    name: "Phantom Stairway",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 180, y: 195, w: 75, h: 20, id: "pst1" },
      { x: 300, y: 170, w: 75, h: 20, id: "pst2" },
      { x: 420, y: 145, w: 75, h: 20, id: "pst3" },
      { x: 530, y: 170, w: 190, h: 80 }
    ],
    hazards: [ { x: 120, y: 255, w: 410, h: 20 } ],
    update: function(player) {
      const p2 = this.platforms.find(p => p.id === "pst2");
      if (p2 && player.x > 260) {
        p2.y = -600; // Middle step gayab ho jata hai
      }
    }
  },

  // Level 73: The Guillotine Drop II
  {
    id: 73,
    name: "Iron Jaw",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 320, y: -50, w: 40, h: 100, id: "ironJaw1" },
      { x: 480, y: -50, w: 40, h: 100, id: "ironJaw2" }
    ],
    update: function(player) {
      const j1 = this.hazards.find(h => h.id === "ironJaw1");
      const j2 = this.hazards.find(h => h.id === "ironJaw2");
      if (j1 && player.x > 240 && j1.y < 120) j1.y += 18;
      if (j2 && player.x > 400 && j2.y < 120) j2.y += 18;
    }
  },

  // Level 74: Conveyor Into Spikes
  {
    id: 74,
    name: "Conveyor Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [ { x: 500, y: 195, w: 40, h: 25 } ],
    update: function(player) {
      if (player.x > 150 && player.x < 500) {
        player.x += 1.6; // Tez speed se spikes ki taraf dhakelta hai
      }
    }
  },

  // Level 75: Backwards Run
  {
    id: 75,
    name: "Mirror Dimension",
    spawn: { x: 600, y: 150 },
    door: { x: 40, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 260, h: 48 },
      { x: 380, y: 220, w: 340, h: 48 }
    ],
    hazards: [ { x: 260, y: 255, w: 120, h: 20 } ],
    update: function() {}
  },

  // Level 76: Descending Sky Crusher
  {
    id: 76,
    name: "Falling Ceiling",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 200, y: 40, w: 320, h: 40, id: "crush76" }
    ],
    hazards: [],
    update: function(player) {
      const c = this.platforms.find(p => p.id === "crush76");
      if (c && player.x > 180 && c.y < 155) {
        c.y += 1.2;
      }
    }
  },

  // Level 77: Staggered Laser Grid
  {
    id: 77,
    name: "Laser Grid",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 260, y: 50, w: 18, h: 170, id: "gridL1" },
      { x: 420, y: 50, w: 18, h: 170, id: "gridL2" },
      { x: 560, y: 50, w: 18, h: 170, id: "gridL3" }
    ],
    gridTick: 0,
    update: function() {
      this.gridTick = (this.gridTick || 0) + 1;
      const l1 = this.hazards.find(h => h.id === "gridL1");
      const l2 = this.hazards.find(h => h.id === "gridL2");
      const l3 = this.hazards.find(h => h.id === "gridL3");
      const state = Math.floor(this.gridTick / 30) % 3;
      if (l1) l1.y = (state === 0) ? 50 : -400;
      if (l2) l2.y = (state === 1) ? 50 : -400;
      if (l3) l3.y = (state === 2) ? 50 : -400;
    }
  },

  // Level 78: Bouncy Trap Pad
  {
    id: 78,
    name: "Springboard Betrayal",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 280, y: 215, w: 50, h: 15, id: "bPad78" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [
      { x: 140, y: 255, w: 340, h: 20 },
      { x: 270, y: 30, w: 70, h: 25 }
    ],
    update: function(player) {
      const pad = this.platforms.find(p => p.id === "bPad78");
      if (pad && player.x > pad.x - 5 && player.x < pad.x + pad.w + 5 && Math.abs(player.y - (pad.y - 20)) < 10) {
        player.vy = -17; // Jump se ceiling spike me lagta hai
      }
    }
  },

  // Level 79: Shrinking Platforms Gauntlet
  {
    id: 79,
    name: "Erosion",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 120, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 200, y: 190, w: 100, h: 20, id: "ero1" },
      { x: 360, y: 170, w: 100, h: 20, id: "ero2" },
      { x: 520, y: 180, w: 200, h: 60 }
    ],
    hazards: [ { x: 120, y: 255, w: 400, h: 20 } ],
    update: function(player) {
      ['ero1', 'ero2'].forEach(id => {
        const p = this.platforms.find(item => item.id === id);
        if (p && player.x > p.x && player.x < p.x + p.w && p.w > 20) {
          p.w -= 0.5;
          p.x += 0.25;
        }
      });
    }
  },

  // Level 80: Boss Chamber 8
  {
    id: 80,
    name: "The Dual Turret",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 80, h: 20 },
      { x: 380, y: 170, w: 80, h: 20 },
      { x: 520, y: 190, w: 200, h: 60 }
    ],
    hazards: [
      { x: 140, y: 255, w: 380, h: 20 },
      { x: 740, y: 180, w: 25, h: 15, id: "b80Low" },
      { x: 740, y: 120, w: 25, h: 15, id: "b80High" }
    ],
    update: function() {
      const b1 = this.hazards.find(h => h.id === "b80Low");
      const b2 = this.hazards.find(h => h.id === "b80High");
      if (b1) {
        b1.x -= 4.6;
        if (b1.x < -30) b1.x = 740;
      }
      if (b2) {
        b2.x -= 3.8;
        if (b2.x < -30) b2.x = 740;
      }
    }
  },
            // ==========================================
  // PART 9: LEVELS 81 - 90
  // ==========================================

  // Level 81: High Altitude Leap
  {
    id: 81,
    name: "Sky Bound",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 80, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 260, y: 160, w: 60, h: 20 },
      { x: 440, y: 120, w: 60, h: 20 },
      { x: 560, y: 140, w: 160, h: 100 }
    ],
    hazards: [ { x: 140, y: 255, w: 420, h: 20 } ],
    update: function() {}
  },

  // Level 82: The Fast Faller
  {
    id: 82,
    name: "Panic Drop",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 140, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 190, y: 200, w: 75, h: 20, id: "drop82_1" },
      { x: 330, y: 180, w: 75, h: 20, id: "drop82_2" },
      { x: 470, y: 160, w: 75, h: 20, id: "drop82_3" },
      { x: 570, y: 200, w: 150, h: 50 }
    ],
    hazards: [ { x: 120, y: 255, w: 450, h: 20 } ],
    update: function(player) {
      ['drop82_1', 'drop82_2', 'drop82_3'].forEach(id => {
        const p = this.platforms.find(item => item.id === id);
        if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && p.y < 280) {
          p.y += 2.8;
        }
      });
    }
  },

  // Level 83: Rolling Spikes Barrage
  {
    id: 83,
    name: "Spike Wheels",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 740, y: 180, w: 35, h: 35, id: "wheel83" }
    ],
    update: function(player) {
      const w = this.hazards.find(h => h.id === "wheel83");
      if (w) {
        w.x -= 4.2;
        if (w.x < -40) w.x = 740;
      }
    }
  },

  // Level 84: Squeeze Tunnel
  {
    id: 84,
    name: "Tight Squeeze",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 220, y: 90, w: 300, h: 35 }
    ],
    hazards: [
      { x: 340, y: 205, w: 35, h: 15 }
    ],
    update: function() {}
  },

  // Level 85: The Glitch Teleport
  {
    id: 85,
    name: "Warp Point",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [ { x: 460, y: 195, w: 40, h: 25 } ],
    update: function(player) {
      if (player.x > 340 && player.x < 350) {
        player.x = 220; // Troll loop
      }
    }
  },

  // Level 86: Moving Ceiling Spikes
  {
    id: 86,
    name: "Descending Roof",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 240, y: 50, w: 260, h: 30, id: "roof86" }
    ],
    hazards: [],
    update: function(player) {
      const r = this.platforms.find(p => p.id === "roof86");
      if (r && player.x > 220 && r.y < 150) {
        r.y += 0.8;
      }
    }
  },

  // Level 87: Oscillating Island Gap
  {
    id: 87,
    name: "Oscillator",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 240, y: 190, w: 80, h: 20, id: "osc87" },
      { x: 480, y: 190, w: 240, h: 60 }
    ],
    hazards: [ { x: 120, y: 255, w: 360, h: 20 } ],
    oscDir: 1,
    update: function() {
      const o = this.platforms.find(p => p.id === "osc87");
      if (o) {
        o.x += (this.oscDir || 1) * 1.5;
        if (o.x > 360) this.oscDir = -1;
        if (o.x < 220) this.oscDir = 1;
      }
    }
  },

  // Level 88: Fake Door Ambush
  {
    id: 88,
    name: "Troll Haven",
    spawn: { x: 40, y: 150 },
    door: { x: 30, y: 160, w: 36, h: 60 }, // Door is at spawn
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 590, y: 170, w: 45, h: 50 } // Fake door location trap
    ],
    update: function() {}
  },

  // Level 89: Triple Blade Sweep
  {
    id: 89,
    name: "Triple Blades",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 260, y: 185, w: 25, h: 35, id: "tb1" },
      { x: 380, y: 185, w: 25, h: 35, id: "tb2" },
      { x: 500, y: 185, w: 25, h: 35, id: "tb3" }
    ],
    tbAngle: 0,
    update: function() {
      this.tbAngle = (this.tbAngle || 0) + 0.05;
      const b1 = this.hazards.find(h => h.id === "tb1");
      const b2 = this.hazards.find(h => h.id === "tb2");
      const b3 = this.hazards.find(h => h.id === "tb3");
      if (b1) b1.x = 260 + Math.sin(this.tbAngle) * 30;
      if (b2) b2.x = 380 + Math.sin(this.tbAngle + 1) * 30;
      if (b3) b3.x = 500 + Math.sin(this.tbAngle + 2) * 30;
    }
  },

  // Level 90: Sector 9 Boss Trap
  {
    id: 90,
    name: "Bullet Hell Alley",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 240, y: 190, w: 80, h: 20 },
      { x: 400, y: 160, w: 80, h: 20 },
      { x: 540, y: 180, w: 180, h: 60 }
    ],
    hazards: [
      { x: 140, y: 255, w: 400, h: 20 },
      { x: 740, y: 155, w: 25, h: 15, id: "b90" }
    ],
    update: function() {
      const b = this.hazards.find(h => h.id === "b90");
      if (b) {
        b.x -= 5.0;
        if (b.x < -30) b.x = 740;
      }
    }
  },
    // ==========================================
  // PART 10: LEVELS 91 - 100 (THE GRAND FINALE)
  // ==========================================

  // Level 91: The Gravity Flip Illusion
  {
    id: 91,
    name: "Anti-Climax",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 200, y: 255, w: 280, h: 20 } ],
    update: function(player) {
      if (player.x > 240 && player.x < 440) {
        player.y -= 1.2; // Float trap towards top ceiling
      }
    }
  },

  // Level 92: Crumbling Skyways
  {
    id: 92,
    name: "Skyway Collapse",
    spawn: { x: 40, y: 150 },
    door: { x: 620, y: 100, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 100, h: 48 },
      { x: 160, y: 190, w: 60, h: 20, id: "skc1" },
      { x: 280, y: 165, w: 60, h: 20, id: "skc2" },
      { x: 400, y: 140, w: 60, h: 20, id: "skc3" },
      { x: 520, y: 160, w: 200, h: 80 }
    ],
    hazards: [ { x: 100, y: 255, w: 420, h: 20 } ],
    update: function(player) {
      ['skc1', 'skc2', 'skc3'].forEach(id => {
        const p = this.platforms.find(item => item.id === id);
        if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && p.y < 280) {
          p.y += 3.0;
        }
      });
    }
  },

  // Level 93: Laser Crossfire
  {
    id: 93,
    name: "Crossfire",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 250, y: 50, w: 18, h: 170, id: "cf1" },
      { x: 450, y: 50, w: 18, h: 170, id: "cf2" }
    ],
    cfTick: 0,
    update: function() {
      this.cfTick = (this.cfTick || 0) + 1;
      const c1 = this.hazards.find(h => h.id === "cf1");
      const c2 = this.hazards.find(h => h.id === "cf2");
      if (c1 && c2) {
        c1.y = (Math.floor(this.cfTick / 35) % 2 === 0) ? 50 : -400;
        c2.y = (Math.floor(this.cfTick / 35) % 2 !== 0) ? 50 : -400;
      }
    }
  },

  // Level 94: Slippery Wind Tunnel
  {
    id: 94,
    name: "Blizzard Rush",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [ { x: 380, y: 195, w: 35, h: 25 } ],
    update: function(player) {
      if (player.x > 140 && player.x < 500) {
        player.x += 1.8; // Heavy storm push
      }
    }
  },

  // Level 95: Disappearing Destination
  {
    id: 95,
    name: "Ghost Goal",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 260, y: 200, w: 100, h: 20, id: "ghost95" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 160, y: 255, w: 320, h: 20 } ],
    update: function(player) {
      const g = this.platforms.find(p => p.id === "ghost95");
      if (g && player.x > 230) {
        g.y = -600;
      }
    }
  },

  // Level 96: Ceiling Dropper Rush
  {
    id: 96,
    name: "Falling Slabs",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 280, y: -40, w: 35, h: 60, id: "slab1" },
      { x: 460, y: -40, w: 35, h: 60, id: "slab2" }
    ],
    update: function(player) {
      const s1 = this.hazards.find(h => h.id === "slab1");
      const s2 = this.hazards.find(h => h.id === "slab2");
      if (s1 && player.x > 220 && s1.y < 160) s1.y += 15;
      if (s2 && player.x > 400 && s2.y < 160) s2.y += 15;
    }
  },

  // Level 97: Oscillating Twin Bridges
  {
    id: 97,
    name: "Sync or Sink",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 130, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 200, y: 190, w: 75, h: 20, id: "sync1" },
      { x: 380, y: 190, w: 75, h: 20, id: "sync2" },
      { x: 520, y: 190, w: 200, h: 60 }
    ],
    hazards: [ { x: 120, y: 255, w: 400, h: 20 } ],
    syncTick: 0,
    update: function() {
      this.syncTick = (this.syncTick || 0) + 0.05;
      const s1 = this.platforms.find(p => p.id === "sync1");
      const s2 = this.platforms.find(p => p.id === "sync2");
      if (s1) s1.y = 190 + Math.sin(this.syncTick) * 25;
      if (s2) s2.y = 190 + Math.cos(this.syncTick) * 25;
    }
  },

  // Level 98: High Tension Gap
  {
    id: 98,
    name: "Penultimate Leap",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 110, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 110, h: 48 },
      { x: 180, y: 190, w: 60, h: 20 },
      { x: 300, y: 165, w: 60, h: 20 },
      { x: 420, y: 140, w: 60, h: 20 },
      { x: 530, y: 160, w: 190, h: 80 }
    ],
    hazards: [ { x: 110, y: 255, w: 420, h: 20 } ],
    update: function() {}
  },

  // Level 99: The Ultimate Troll (Door flees back to spawn)
  {
    id: 99,
    name: "Psychological Damage",
    spawn: { x: 40, y: 150 },
    door: { x: 600, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [],
    update: function(player) {
      if (player.x > 450 && this.door.x > 80) {
        this.door.x -= 8; // Player aage aate hi door peeche bhagega
      }
    }
  },

  // Level 100: Grand Finale Trophy Arena
  {
    id: 100,
    name: "VORTEX CONQUEROR",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 260, y: 140, w: 200, h: 25 } // Victor pedestal
    ],
    hazards: [],
    update: function() {}
  }
]; // Array closure complete

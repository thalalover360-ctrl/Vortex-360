// ==========================================
// VORTEX-360: BLUEPRINT EDITION (LEVELS 1 - 100)
// WORLD 1: FAKE BASICS (LEVELS 1 - 10)
// ==========================================

const levels = [
  // Level 1: Pehli Nazar Ka Dhoka (Floor collapse on first step)
  {
    id: 1,
    name: "Pehli Nazar Ka Dhoka",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48, id: "trapFloor1" },
      { x: 280, y: 220, w: 140, h: 48 },
      { x: 520, y: 220, w: 200, h: 48 }
    ],
    hazards: [
      { x: 0, y: 310, w: 720, h: 30 } // Maut ka kuan
    ],
    update: function(player) {
      const p = this.platforms.find(item => item.id === "trapFloor1");
      // Player pehla kadam aage badhayega aur zameen sink
      if (p && player.x > 70 && p.y < 350) {
        p.y += 6;
      }
    }
  },

  // Level 2: Havaai Hamla (Air drop block bonks player into pit)
  {
    id: 2,
    name: "Havaai Hamla",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: -50, w: 50, h: 30, id: "airDropBlock" }, // Invisible block jo upar se girega
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [
      { x: 180, y: 255, w: 280, h: 20 }
    ],
    update: function(player) {
      const b = this.platforms.find(p => p.id === "airDropBlock");
      // Mid air jump trigger
      if (b && player.x > 210 && b.y < 130) {
        b.y += 18;
      }
    }
  },

  // Level 3: Reverse Gravity Fakeout (Fake flip, ultra heavy drop)
  {
    id: 3,
    name: "Reverse Gravity Fakeout",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 320, y: 220, w: 120, h: 48 },
      { x: 540, y: 220, w: 180, h: 48 }
    ],
    hazards: [
      { x: 200, y: 255, w: 120, h: 20 },
      { x: 440, y: 255, w: 100, h: 20 }
    ],
    update: function(player, input) {
      // Jump dabane par gravity ulta hone ke bajay player smash ho jata hai
      if (input && input.jump && player.x > 180 && player.x < 320) {
        player.vy += 2.5; // Fast downward force
      }
    }
  },

  // Level 4: Chalta Firta Spike (Spike charges toward landing spot)
  {
    id: 4,
    name: "Chalta Firta Spike",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 380, y: 190, w: 35, h: 30, id: "chargingSpike" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "chargingSpike");
      // Player jump lete hi spike left bhagega uski landing block karne
      if (s && player.y < 200 && player.x > 160 && s.x > 220) {
        s.x -= 4.2;
      }
    }
  },

  // Level 5: Fake Checkpoint (Checkpoint blasts and removes floor)
  {
    id: 5,
    name: "Fake Checkpoint",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 260, h: 48 },
      { x: 260, y: 220, w: 140, h: 48, id: "flagFloor" },
      { x: 400, y: 220, w: 320, h: 48 }
    ],
    hazards: [
      { x: 320, y: 180, w: 20, h: 40, id: "fakeFlag" } // Looks like flag, acts as proximity bomb
    ],
    update: function(player) {
      const fl = this.hazards.find(h => h.id === "fakeFlag");
      const floor = this.platforms.find(p => p.id === "flagFloor");
      if (fl && floor && player.x > 270 && player.x < 360) {
        floor.y += 12; // Zameen blast hoke gayab
        fl.w = 50; // Explosion area grows
      }
    }
  },

  // Level 6: Safe Zone Trap (Spring board catapults into ceiling spikes)
  {
    id: 6,
    name: "Safe Zone Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 280, y: 220, w: 60, h: 20, id: "springFloor" }, // Looks like safe rest spot
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [
      { x: 140, y: 255, w: 340, h: 20 }, // Ground spikes
      { x: 250, y: 20, w: 120, h: 30 }   // Ceiling spikes
    ],
    update: function(player) {
      const pad = this.platforms.find(p => p.id === "springFloor");
      if (pad && player.x > pad.x - 5 && player.x < pad.x + pad.w + 5 && Math.abs(player.y - (pad.y - 20)) < 8) {
        player.vy = -18; // Super launch seedha upar spikes me
      }
    }
  },

   // Level 7: Sarakti Zameen (Floor scrolls left into void)
  {
    id: 7,
    name: "Sarakti Zameen",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48, id: "movingFloor7" }
    ],
    hazards: [
      { x: -100, y: 220, w: 100, h: 48 } // Offscreen edge hazard
    ],
    update: function(player) {
      const fl = this.platforms.find(p => p.id === "movingFloor7");
      // Drag speed ko 1.5 kiya taaki running speed (approx 3.0+) se overpower na ho
      if (fl && player.x > 80) {
        player.x -= 1.5;
        fl.x -= 1.5;
      }
    }
  },
  
   // Level 8: Dushman Ya Dost (Cute bug enlarges and crushes screen)
  {
    id: 8,
    name: "Dushman Ya Dost",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      // Safe high leap ledge jo creature ke upar se nikalne ke liye spawn hoti hai
      { x: 300, y: 120, w: 60, h: 16, id: "escapeStep8", hidden: true }
    ],
    hazards: [
      { x: 420, y: 195, w: 24, h: 25, id: "cuteCreature" }
    ],
    update: function(player) {
      const c = this.hazards.find(h => h.id === "cuteCreature");
      const step = this.platforms.find(p => p.id === "escapeStep8");

      // Player aate hi creature bada hoga, par ek max beatable height tak
      if (c && player.x > 280) {
        if (c.w < 90) {
          c.w += 2.5;
          c.h += 2;
          c.y -= 2;
        }
      }

      // Jab player creature ko trigger karke peeche retreat karega, hidden high ledge reveal ho jayegi
      if (step && player.x > 260) {
        step.hidden = false;
      }
    }
  },
  
  // Level 9: Falling Ceiling (Ceiling crushes path, retreat to spawn bunker)
  {
    id: 9,
    name: "Falling Ceiling",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 120, y: 40, w: 600, h: 40, id: "crushCeiling9" } // Heavy roof
    ],
    hazards: [],
    update: function(player) {
      const roof = this.platforms.find(p => p.id === "crushCeiling9");
      if (roof && player.x > 360 && roof.y < 165) {
        roof.y += 3.2; // Fast drop near door
      } else if (roof && player.x < 100 && roof.y > 40) {
        roof.y -= 1.5; // Resets only if player runs back to spawn!
      }
    }
  },

  // Level 10: Bhul Bhulaiya Door (2 fake teleports, 1 true exit)
  {
    id: 10,
    name: "Bhul Bhulaiya Door",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 }, // Real broken door
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 260, y: 160, w: 36, h: 60, id: "fakeDoor1" },
      { x: 450, y: 160, w: 36, h: 60, id: "fakeDoor2" }
    ],
    update: function(player) {
      // Fake doors are lethal traps
    }
  },
          // Level 11: Jump Timer (Continuous timer tick, falling hazard on failure)
  {
    id: 11,
    name: "Jump Timer",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 300, y: -40, w: 30, h: 30, id: "timerRock" }
    ],
    timerTicks: 0,
    update: function(player, input) {
      this.timerTicks = (this.timerTicks || 0) + 1;
      const rock = this.hazards.find(h => h.id === "timerRock");
      // Agar 180 frames (~3 sec) tak player jump nahi kare toh boulder crash
      if (input && input.jump) {
        this.timerTicks = 0;
      }
      if (this.timerTicks > 180 && rock && rock.y < 200) {
        rock.y += 12;
      }
    }
  },

  // Level 12: Elastic Platform (Rubber stretch sink into floor spikes)
  {
    id: 12,
    name: "Elastic Platform",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 260, y: 220, w: 120, h: 20, id: "rubberPlat" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [
      { x: 160, y: 265, w: 320, h: 20 }
    ],
    update: function(player) {
      const rp = this.platforms.find(p => p.id === "rubberPlat");
      if (rp && player.x > rp.x && player.x < rp.x + rp.w && rp.y < 265) {
        rp.y += 2.8; // Rubber stretch downward into spikes
      }
    }
  },

  // Level 13: Flashlight Nightmare (Vanishing dynamic safe path)
  {
    id: 13,
    name: "Flashlight Nightmare",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 220, w: 90, h: 20, id: "nightStep1" },
      { x: 380, y: 220, w: 90, h: 20, id: "nightStep2" },
      { x: 540, y: 220, w: 180, h: 48 }
    ],
    hazards: [ { x: 140, y: 260, w: 400, h: 20 } ],
    update: function(player) {
      const s1 = this.platforms.find(p => p.id === "nightStep1");
      const s2 = this.platforms.find(p => p.id === "nightStep2");
      // Step tabhi reveal honge jab player extreme close range me ho
      if (s1) s1.hidden = (player.x < 150 || player.x > 320);
      if (s2) s2.hidden = (player.x < 310 || player.x > 480);
    }
  },

  // Level 14: Weight Trap (Pressure plate triggers roof boulder)
  {
    id: 14,
    name: "Weight Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 420, y: -50, w: 50, h: 50, id: "boulder14" }
    ],
    update: function(player) {
      const b = this.hazards.find(h => h.id === "boulder14");
      // Pressure step aate hi boulder fast speed se head par smash hota hai
      if (b && player.x > 360 && b.y < 175) {
        b.y += 15;
      }
    }
  },

  // Level 15: Teleport Pit (Pit warps to roof, high leap blocked by wall)
  {
    id: 15,
    name: "Teleport Pit",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 80, w: 40, h: 100, id: "invisWall" }, // Invisible wall blocking high jump
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [],
    update: function(player) {
      // Pit me girne par player safely ceiling se right side drop hoga
      if (player.y > 280 && player.x > 180 && player.x < 440) {
        player.x = 500;
        player.y = 60;
        player.vy = 0;
      }
    }
  },

  // Level 16: Slippery Slope (Sudden oil acceleration off-screen)
  {
    id: 16,
    name: "Slippery Slope",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 200, y: 220, w: 260, h: 48, id: "oilSlope" },
      { x: 540, y: 220, w: 180, h: 48 }
    ],
    hazards: [
      { x: 460, y: 255, w: 80, h: 20 }
    ],
    update: function(player) {
      // Oil section me ghuste hi extreme forward launch
      if (player.x > 200 && player.x < 460) {
        player.x += 4.5;
      }
    }
  },

  // Level 17: Ghost Blocks (Visible blocks fall, invisible blocks solid)
  {
    id: 17,
    name: "Ghost Blocks",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 80, h: 20, id: "gb1" },
      { x: 380, y: 200, w: 80, h: 20, id: "gb2" },
      { x: 520, y: 220, w: 200, h: 48 }
    ],
    hazards: [ { x: 140, y: 255, w: 380, h: 20 } ],
    gTick: 0,
    update: function() {
      this.gTick = (this.gTick || 0) + 1;
      const b1 = this.platforms.find(p => p.id === "gb1");
      const b2 = this.platforms.find(p => p.id === "gb2");
      // Platforms blink cycle
      const phase = Math.floor(this.gTick / 40) % 2;
      if (b1) b1.hidden = (phase === 0);
      if (b2) b2.hidden = (phase !== 0);
    }
  },

  // Level 18: Speedrunner's Doom (Chasing lethal wall from spawn)
  {
    id: 18,
    name: "Speedrunner's Doom",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: -80, y: 0, w: 50, h: 260, id: "chaseWall" }
    ],
    update: function() {
      const wall = this.hazards.find(h => h.id === "chaseWall");
      if (wall) {
        wall.x += 1.8; // Lagatar peeche se crush karti hui wall
      }
    }
  },

  // Level 19: Fragile Bridge (Alternate tiles vanish at midpoint)
  {
    id: 19,
    name: "Fragile Bridge",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 120, h: 48 },
      { x: 150, y: 220, w: 60, h: 48, id: "alt1" },
      { x: 240, y: 220, w: 60, h: 48, id: "alt2" },
      { x: 330, y: 220, w: 60, h: 48, id: "alt3" },
      { x: 420, y: 220, w: 60, h: 48, id: "alt4" },
      { x: 510, y: 220, w: 210, h: 48 }
    ],
    hazards: [ { x: 120, y: 265, w: 390, h: 20 } ],
    update: function(player) {
      const a1 = this.platforms.find(p => p.id === "alt1");
      const a3 = this.platforms.find(p => p.id === "alt3");
      // Player center me aate hi alternate blocks drop
      if (player.x > 260) {
        if (a1 && a1.y < 350) a1.y += 10;
        if (a3 && a3.y < 350) a3.y += 10;
      }
    }
  },

  // Level 20: Boss Fake Out (Monster morphs into exit door, fireballs freeze)
  {
    id: 20,
    name: "Boss Fake Out",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60, id: "bossDoor" },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 480, y: 170, w: 50, h: 50, id: "bossEntity" },
      { x: 300, y: 185, w: 25, h: 25, id: "frozenFireball" }
    ],
    update: function(player) {
      const boss = this.hazards.find(h => h.id === "bossEntity");
      // Player attack range me aate hi boss door me convert
      if (boss && player.x > 380) {
        boss.y = -600; // Monster vanishes
        this.door.x = 500;
        this.door.y = 160;
      }
    }
  },
    // ==========================================
  // WORLD 2: UI & INPUT BETRAYALS (LEVELS 21 - 30)
  // ==========================================

  // Level 21: Ulte Haath Ka Khel (Inverted controls + quick fall)
  {
    id: 21,
    name: "Ulte Haath Ka Khel",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 280, y: 200, w: 140, h: 20 },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [ { x: 200, y: 255, w: 300, h: 20 } ],
    invertActive: true,
    update: function(player, input) {
      this.invertActive = true;
      // Jump hold karne par fast downward landing
      if (input && input.jump && player.vy > 0) {
        player.vy += 1.8;
      }
    }
  },

  // Level 22: Lag Simulator (Artificial frame freeze vs moving hazard)
  {
    id: 22,
    name: "Lag Simulator",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 740, y: 185, w: 30, h: 35, id: "lagSpike22" }
    ],
    lagTicks: 0,
    update: function(player) {
      this.lagTicks = (this.lagTicks || 0) + 1;
      const s = this.hazards.find(h => h.id === "lagSpike22");
      if (s) {
        s.x -= 3.5;
        if (s.x < -30) s.x = 740;
      }
      // Har 120 frames (~2 sec) par player ka movement momentarily zero lock
      if (this.lagTicks % 120 > 95) {
        player.vx = 0;
      }
    }
  },

  // Level 23: Paused But Dead (Stillness triggers moving floor traps)
  {
    id: 23,
    name: "Paused But Dead",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 300, y: 220, w: 120, h: 48, id: "movePlat23" },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [ { x: 220, y: 255, w: 280, h: 20 } ],
    update: function(player, input) {
      const p = this.platforms.find(item => item.id === "movePlat23");
      // Player ruka toh background traps use chasm me drop kar denge
      if (input && !input.left && !input.right && p && p.y < 340) {
        p.y += 1.5;
      }
    }
  },
  // Level 24: Fake Loading Screen (Loading bar block + sinking floor troll)
  {
    id: 24,
    name: "Fake Loading Screen",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 240, y: 200, w: 140, h: 20, id: "sinkStep24" }, // Pair padte hi dissolve hoga
      { x: 480, y: 220, w: 240, h: 48 },
      // Fake loading obstacle bar
      { x: 380, y: -200, w: 50, h: 180, id: "loadingBar24" }
    ],
    hazards: [ { x: 180, y: 255, w: 300, h: 20 } ],
    loadingTimer: 0,
    update: function(player) {
      const bar = this.platforms.find(p => p.id === "loadingBar24");
      const step = this.platforms.find(p => p.id === "sinkStep24");

      // Player aage badhte hi loading bar samne tapak padti hai
      if (bar && player.x > 200 && bar.y < 40) {
        bar.y = 40;
      }

      // Agar player island par ruk ke wait karega, toh zameen chasm me dubegi
      if (player.x > 230 && player.x < 370) {
        this.loadingTimer = (this.loadingTimer || 0) + 1;
        if (this.loadingTimer > 35 && step && step.y < 350) {
          step.y += 4; // Floor collapses!
        }
      }
    }
  },
  
  // Level 25: Low Battery Alert (Sudden panic lurch forward into spikes)
  {
    id: 25,
    name: "Low Battery Alert",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 300, h: 48 },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 300, y: 255, w: 160, h: 20 } ],
    update: function(player) {
      // Screen ke 260x pe aate hi sudden fake popup push
      if (player.x > 250 && player.x < 270) {
        player.x += 45; // Direct spike pit me fling
      }
    }
  },

  // Level 26: Chatpatate Buttons (Deflection barrier repels player)
  {
    id: 26,
    name: "Chatpatate Buttons",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 240, y: 190, w: 80, h: 20, id: "chatPlat1" },
      { x: 400, y: 170, w: 80, h: 20, id: "chatPlat2" },
      { x: 540, y: 220, w: 180, h: 48 }
    ],
    hazards: [ { x: 160, y: 255, w: 380, h: 20 } ],
    update: function(player) {
      const cp1 = this.platforms.find(p => p.id === "chatPlat1");
      const cp2 = this.platforms.find(p => p.id === "chatPlat2");
      // Landing ke time platform apni coordinate jagah dodge karega
      if (cp1 && player.x > 210 && player.x < 260) cp1.x = 290;
      if (cp2 && player.x > 370 && player.x < 420) cp2.x = 450;
    }
  },

  // Level 27: Shuffling Controls (Polarity switches on every jump)
  {
    id: 27,
    name: "Shuffling Controls",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 90, h: 20 },
      { x: 380, y: 180, w: 90, h: 20 },
      { x: 520, y: 220, w: 200, h: 48 }
    ],
    hazards: [ { x: 140, y: 255, w: 380, h: 20 } ],
    jumpCount: 0,
    wasJumping: false,
    update: function(player, input) {
      if (input && input.jump && !this.wasJumping) {
        this.jumpCount = (this.jumpCount || 0) + 1;
        this.invertActive = (this.jumpCount % 2 !== 0);
      }
      this.wasJumping = (input && input.jump);
    }
  },

  // Level 28: UI Covering View (Massive UI block drops over screen center)
  {
    id: 28,
    name: "UI Covering View",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      // Huge banner blocking view of player and spikes
      { x: 200, y: -200, w: 320, h: 220, id: "uiBanner" }
    ],
    hazards: [
      { x: 320, y: 195, w: 50, h: 25 }
    ],
    update: function(player) {
      const banner = this.platforms.find(p => p.id === "uiBanner");
      // Player enter karte hi UI banner screen par drop
      if (banner && player.x > 180 && banner.y < 30) {
        banner.y += 18;
      }
    }
  },

  // Level 29: Settings Menu Troll (Resolution shrink fakeout)
  {
    id: 29,
    name: "Settings Menu Troll",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 200, w: 40, h: 20, id: "tinyKeyPlat" }, // Ultra small pixel platform
      { x: 420, y: 220, w: 300, h: 48 }
    ],
    hazards: [ { x: 180, y: 255, w: 240, h: 20 } ],
    update: function(player) {
      const k = this.platforms.find(p => p.id === "tinyKeyPlat");
      if (k && player.x > 240 && player.x < 320) {
        k.w = 15; // Shrunk into 144p pixel width
      }
    }
  },

  // Level 30: Health Bar Betrayal (Sprint leads to spikes, wait deactivates all)
  {
    id: 30,
    name: "Health Bar Betrayal",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 240, y: 190, w: 260, h: 30, id: "deathGauntlet30" }
    ],
    waitTimer: 0,
    update: function(player) {
      this.waitTimer = (this.waitTimer || 0) + 1;
      const g = this.hazards.find(h => h.id === "deathGauntlet30");
      // Agar player 150 frames (~2.5 sec) shanti se wait kare, toh trap khud hat jata hai
      if (this.waitTimer > 150 && g) {
        g.y = -600; // Hazard deactivated!
      }
    }
  },
    // Level 31: Sticky Keys Intro (Rapid jumps freeze character mid-air)
  {
    id: 31,
    name: "Sticky Keys Intro",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 200, w: 100, h: 20 },
      { x: 440, y: 220, w: 280, h: 48 }
    ],
    hazards: [ { x: 180, y: 255, w: 260, h: 20 } ],
    rapidTaps: 0,
    update: function(player, input) {
      if (input && input.jump) {
        this.rapidTaps = (this.rapidTaps || 0) + 1;
      }
      // Sticky keys lock: velocity freeze mid-air
      if (this.rapidTaps > 35 && player.y < 200) {
        player.vx = 0;
        player.vy += 1.5;
      }
    }
  },

  // Level 32: Volume Up Destruction (Ultra fast soundwave spike launch)
  {
    id: 32,
    name: "Volume Up Destruction",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 730, y: 185, w: 45, h: 35, id: "sonicSpike" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "sonicSpike");
      // Player enter karte hi super high speed projectile dash
      if (s && player.x > 140) {
        s.x -= 8.5;
      }
    }
  },

  // Level 33: Adware Attack (Fake popup block spawns right in jump path)
  {
    id: 33,
    name: "Adware Attack",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 240, y: 100, w: 140, h: 100, id: "adBlock" }, // Fake ad wall
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 220, y: 255, w: 240, h: 20 } ],
    update: function(player) {
      const ad = this.platforms.find(p => p.id === "adBlock");
      // Close karne ki jagah ad block path ko block karta hai
      if (ad && player.x > 200 && player.x < 360 && player.y < 120) {
        player.vx = -4;
      }
    }
  },

  // Level 34: Cursor Trapper (Magnetic sensitivity jitter)
  {
    id: 34,
    name: "Cursor Trapper",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 260, y: 190, w: 100, h: 20 },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 160, y: 255, w: 300, h: 20 } ],
    jitTick: 0,
    update: function(player) {
      this.jitTick = (this.jitTick || 0) + 1;
      // High/Low sensitivity jitter drag
      if (player.x > 180 && player.x < 440) {
        player.x += Math.sin(this.jitTick * 0.25) * 2.8;
      }
    }
  },

  // Level 35: Font Size Chaos (Gigantic letter obstacle blocks view)
  {
    id: 35,
    name: "Font Size Chaos",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 300, y: -250, w: 120, h: 260, id: "giantLetter" }
    ],
    hazards: [ { x: 320, y: 195, w: 40, h: 25 } ],
    update: function(player) {
      const l = this.platforms.find(p => p.id === "giantLetter");
      if (l && player.x > 160 && l.y < -20) {
        l.y += 16; // Massive letter slammed down
      }
    }
  },

  // Level 36: Double Click Danger (Choppy crawl unless rapid jumping)
  {
    id: 36,
    name: "Double Click Danger",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 300, y: 180, w: 100, h: 20 },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 220, y: 255, w: 260, h: 20 } ],
    update: function(player, input) {
      // Choppy step speed penalty
      if (input && (input.left || input.right) && !input.jump) {
        player.x -= 0.6;
      }
    }
  },

  // Level 37: Resolution Swapper (Physical hitboxes shift off visual)
  {
    id: 37,
    name: "Resolution Swapper",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 240, y: 190, w: 140, h: 20, id: "stretchPlat" },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [ { x: 150, y: 255, w: 350, h: 20 } ],
    update: function(player) {
      const sp = this.platforms.find(p => p.id === "stretchPlat");
      // Player jump aate hi platform hitbox horizontally distort
      if (sp && player.x > 200 && sp.w > 40) {
        sp.w -= 1.5;
        sp.x += 1.5;
      }
    }
  },

  // Level 38: Language Roulette (Reversed trajectory chaos)
  {
    id: 38,
    name: "Language Roulette",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 280, y: 200, w: 120, h: 20 },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 180, y: 255, w: 300, h: 20 } ],
    invertActive: true,
    update: function() {
      this.invertActive = true;
    }
  },

  // Level 39: Quick Time Event Fake (Pressing jump causes ceiling crush)
  {
    id: 39,
    name: "Quick Time Event Fake",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 240, y: -80, w: 220, h: 50, id: "qteRoof" }
    ],
    update: function(player, input) {
      const roof = this.hazards.find(h => h.id === "qteRoof");
      // Jump dabate hi ceiling crushes directly down
      if (input && input.jump && roof && player.x > 200 && player.x < 480) {
        roof.y = 150;
      }
    }
  },

  // Level 40: Credit Roll Scam (False ending slide pushes towards pit)
  {
    id: 40,
    name: "Credit Roll Scam",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 250, h: 48 },
      { x: 380, y: 220, w: 340, h: 48 }
    ],
    hazards: [ { x: 250, y: 260, w: 130, h: 20 } ],
    update: function(player) {
      // Level 40 center aate hi fake credit drag backwards
      if (player.x > 180 && player.x < 360) {
        player.x -= 1.8;
      }
    }
  },
        // ==========================================
  // WORLD 3: OBJECT MALFUNCTIONS (LEVELS 41 - 50)
  // ==========================================

  // Level 41: Bhaagti Hui Chaabi (Fleeing target door)
  {
    id: 41,
    name: "Bhaagti Hui Chaabi",
    spawn: { x: 40, y: 150 },
    door: { x: 500, y: 160, w: 36, h: 60, id: "fleeKey" },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [],
    update: function(player) {
      // Player paas aate hi door right side bhagta hai
      if (player.x > this.door.x - 120 && this.door.x < 650) {
        this.door.x += 3.2;
      }
    }
  },

  // Level 42: Hologram Door (Front door is a fake projection over pit)
  {
    id: 42,
    name: "Hologram Door",
    spawn: { x: 40, y: 150 },
    door: { x: 60, y: 60, w: 36, h: 60 }, // Real door is hidden in ceiling at spawn
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 460, y: 220, w: 260, h: 48 },
      // Step to reach ceiling exit
      { x: 20, y: 130, w: 80, h: 20 }
    ],
    hazards: [
      { x: 220, y: 255, w: 240, h: 20 },
      // Hologram fake door that lures player into the pit
      { x: 560, y: 160, w: 36, h: 60, id: "holoDoor" }
    ],
    update: function(player) {
      const holo = this.hazards.find(h => h.id === "holoDoor");
      if (holo && player.x > 500) {
        holo.y = -600; // Poof! Disappears revealing pit trap
      }
    }
  },

  // Level 43: Magnetic Spikes (Spikes pull towards player jump trajectory)
  {
    id: 43,
    name: "Magnetic Spikes",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 300, y: 200, w: 100, h: 20 },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [
      { x: 340, y: 260, w: 30, h: 30, id: "magSpike" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "magSpike");
      // Jump lete hi magnetic spike ceiling ki taraf uth kar attract hota hai
      if (s && player.y < 190 && player.x > 220 && player.x < 460) {
        s.y -= 3.5;
        s.x += (player.x - s.x) * 0.05;
      }
    }
  },

  // Level 44: Bhari Pather Halka Patthar (Massive block flies away, tiny is heavy)
  {
    id: 44,
    name: "Bhari Pather Halka Patthar",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      // Massive looking fake obstacle that flies away
      { x: 320, y: 140, w: 90, h: 80, id: "balloonRock" }
    ],
    hazards: [ { x: 460, y: 195, w: 30, h: 25 } ],
    update: function(player) {
      const b = this.platforms.find(p => p.id === "balloonRock");
      // Touch karte hi gubbare ki tarah hawa me gayab
      if (b && player.x > 280) {
        b.y -= 7;
      }
    }
  },

  // Level 45: Elastic Trampoline (Absorbs jump velocity completely)
  {
    id: 45,
    name: "Elastic Trampoline",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 220, w: 80, h: 20, id: "gluePad" }, // Fake jump pad
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 180, y: 260, w: 280, h: 20 } ],
    update: function(player) {
      const pad = this.platforms.find(p => p.id === "gluePad");
      // Landing karte hi velocity completely zero karke stick kar deta hai
      if (pad && player.x > pad.x && player.x < pad.x + pad.w && Math.abs(player.y - (pad.y - 20)) < 6) {
        player.vy = 4; // Pulls down, blocks upward bounce
      }
    }
  },

  // Level 46: Fake Powerup (Collecting item strips jump capacity)
  {
    id: 46,
    name: "Fake Powerup",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 280, h: 48 },
      { x: 440, y: 220, w: 280, h: 48 }
    ],
    hazards: [
      { x: 280, y: 255, w: 160, h: 20 },
      // Shiny bait object
      { x: 200, y: 190, w: 20, h: 20, id: "fakeBoot" }
    ],
    hasItem: false,
    update: function(player, input) {
      const b = this.hazards.find(h => h.id === "fakeBoot");
      if (b && player.x > 190 && player.x < 220) {
        b.y = -600; // Collected!
        this.hasItem = true;
      }
      // Jump capacity becomes zero
      if (this.hasItem && input && input.jump) {
        player.vy = 2; // Jump blocked
      }
    }
  },

  // Level 47: Disappearing Key (Timed rush before exit drops into abyss)
  {
    id: 47,
    name: "Disappearing Key",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 280, y: 220, w: 120, h: 48, id: "timedBridge" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 200, y: 260, w: 280, h: 20 } ],
    rushTimer: 0,
    update: function(player) {
      const br = this.platforms.find(p => p.id === "timedBridge");
      if (player.x > 180) {
        this.rushTimer = (this.rushTimer || 0) + 1;
      }
      // 120 frames (~2 sec) ke baad bridge collapses
      if (this.rushTimer > 110 && br && br.y < 350) {
        br.y += 8;
      }
    }
  },

  // Level 48: Light Bulb Puzzle (Spikes activate in sudden dark trigger)
  {
    id: 48,
    name: "Light Bulb Puzzle",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 360, y: -80, w: 60, h: 30, id: "darkSpike48" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "darkSpike48");
      // Player center cross karte hi sudden dark drop
      if (s && player.x > 300 && s.y < 190) {
        s.y += 18;
      }
    }
  },

  // Level 49: Moving Goalpost (Door shifts off-screen unless player walks back)
  {
    id: 49,
    name: "Moving Goalpost",
    spawn: { x: 40, y: 150 },
    door: { x: 560, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [],
    update: function(player) {
      // Door bhaagta hai jab player forward sprint karta hai
      if (player.x > 400 && this.door.x < 670) {
        this.door.x += 3.5;
      }
    }
  },

  // Level 50: Mirror Block (Rigid collision block moves towards player)
  {
    id: 50,
    name: "Mirror Block",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 600, y: 170, w: 40, h: 50, id: "mirrorRock50" }
    ],
    hazards: [],
    update: function(player, input) {
      const r = this.platforms.find(p => p.id === "mirrorRock50");
      // Player right jayega toh block mirror karke left bhagega
      if (r && input && input.right && r.x > 260) {
        r.x -= 3.2;
      }
    }
  },
      // Level 51: Exploding Coin (Proximity mine disguised as gold coin)
  {
    id: 51,
    name: "Exploding Coin",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 340, y: 195, w: 18, h: 18, id: "explodingCoin" }
    ],
    update: function(player) {
      const c = this.hazards.find(h => h.id === "explodingCoin");
      // Touch karte hi mine radius blast
      if (c && Math.abs(player.x - c.x) < 30) {
        c.w = 90;
        c.h = 90;
        c.x -= 35;
        c.y -= 35;
      }
    }
  },

  // Level 52: Heavy Boot Trap (Tilting platform slide)
  {
    id: 52,
    name: "Heavy Boot Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 240, y: 220, w: 160, h: 20, id: "tiltBridge" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 180, y: 260, w: 300, h: 20 } ],
    update: function(player) {
      const tb = this.platforms.find(p => p.id === "tiltBridge");
      // Weight padte hi platform violently sink
      if (tb && player.x > 250 && player.x < 400 && tb.y < 340) {
        tb.y += 3.8;
      }
    }
  },

  // Level 53: Teleporting Platforms (Swapping rhythm safe blocks)
  {
    id: 53,
    name: "Teleporting Platforms",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 80, h: 20, id: "swapPlatA" },
      { x: 380, y: 200, w: 80, h: 20, id: "swapPlatB" },
      { x: 520, y: 220, w: 200, h: 48 }
    ],
    hazards: [ { x: 140, y: 255, w: 380, h: 20 } ],
    tick53: 0,
    update: function() {
      this.tick53 = (this.tick53 || 0) + 1;
      const pa = this.platforms.find(p => p.id === "swapPlatA");
      const pb = this.platforms.find(p => p.id === "swapPlatB");
      if (this.tick53 % 90 === 0) {
        if (pa && pb) {
          const tempX = pa.x;
          pa.x = pb.x;
          pb.x = tempX;
        }
      }
    }
  },

  // Level 54: Fake Exit Scam (Exit teleports player to trap chamber)
  {
    id: 54,
    name: "Fake Exit Scam",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 580, y: 195, w: 35, h: 25, id: "trapFakeExit" }
    ],
    update: function(player) {
      // Exit ke theek muh par hidden pit spike reveal
      if (player.x > 540) {
        this.door.y = -600; // Fake door poof!
      }
    }
  },

  // Level 55: Ice Block Meltdown (Melting floor on touch)
  {
    id: 55,
    name: "Ice Block Meltdown",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 240, y: 210, w: 140, h: 20, id: "iceMelt" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 160, y: 260, w: 320, h: 20 } ],
    update: function(player) {
      const ice = this.platforms.find(p => p.id === "iceMelt");
      if (ice && player.x > 240 && player.x < 380) {
        if (ice.w > 20) ice.w -= 1.8;
        if (ice.y < 320) ice.y += 2.2;
      }
    }
  },

  // Level 56: Growing Spikes (Spikes expand vertically at jump apex)
  {
    id: 56,
    name: "Growing Spikes",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 260, h: 48 },
      { x: 440, y: 220, w: 280, h: 48 }
    ],
    hazards: [
      { x: 300, y: 240, w: 50, h: 20, id: "growSpike" }
    ],
    update: function(player) {
      const s = this.hazards.find(h => h.id === "growSpike");
      // Player hawa me aate hi spikes khinch ke lambe
      if (s && player.y < 180 && player.x > 260 && s.y > 150) {
        s.y -= 7;
        s.h += 7;
      }
    }
  },

  // Level 57: Disappearing Act (Player turns invisible near center)
  {
    id: 57,
    name: "Disappearing Act",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [ { x: 350, y: 195, w: 40, h: 25 } ],
    update: function(player) {
      // Lever trigger: character blind running
      if (player.x > 220 && player.x < 550) {
        player.hidden = true;
      } else {
        player.hidden = false;
      }
    }
  },

  // Level 58: Wind Tunnel Mess (Continuous drag pushing back)
  {
    id: 58,
    name: "Wind Tunnel Mess",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 300, y: 200, w: 100, h: 20 },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 220, y: 255, w: 260, h: 20 } ],
    update: function(player) {
      // Powerful backward draft
      if (player.x > 180) {
        player.x -= 2.4;
      }
    }
  },

  // Level 59: Shaking Camera Bridge (Tremor instability)
  {
    id: 59,
    name: "Shaking Camera Bridge",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 200, y: 210, w: 70, h: 20, id: "shk1" },
      { x: 330, y: 200, w: 70, h: 20, id: "shk2" },
      { x: 460, y: 190, w: 70, h: 20, id: "shk3" },
      { x: 570, y: 220, w: 150, h: 48 }
    ],
    hazards: [ { x: 140, y: 260, w: 430, h: 20 } ],
    shkTick: 0,
    update: function(player) {
      this.shkTick = (this.shkTick || 0) + 1;
      const s1 = this.platforms.find(p => p.id === "shk1");
      const s2 = this.platforms.find(p => p.id === "shk2");
      // Violent tremors jittering platforms
      if (s1) s1.y = 210 + Math.sin(this.shkTick * 0.4) * 12;
      if (s2) s2.y = 200 + Math.cos(this.shkTick * 0.4) * 12;
    }
  },

  // Level 60: Key Combination Chaos (Multi-lock trap gate)
  {
    id: 60,
    name: "Key Combination Chaos",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 260, y: 195, w: 25, h: 25, id: "fakeLockKey" },
      { x: 420, y: 195, w: 25, h: 25 }
    ],
    update: function(player) {
      const k = this.hazards.find(h => h.id === "fakeLockKey");
      if (k && player.x > 240) {
        k.w = 50; // Wrong key explodes hazard area
      }
    }
  },
                 // ==========================================
  // WORLD 4: CAMERA & VISUAL TROLLS (LEVELS 61 - 70)
  // ==========================================

  // Level 61: Upside Down World (Flipped vertical layout)
  {
    id: 61,
    name: "Upside Down World",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 70, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 240, y: 130, w: 100, h: 20 },
      { x: 400, y: 90, w: 100, h: 20 },
      { x: 540, y: 130, w: 180, h: 48 }
    ],
    hazards: [ { x: 180, y: 260, w: 360, h: 20 } ],
    update: function() {}
  },

  // Level 62: Zoom In Panic (Blind short-range hazards)
  {
    id: 62,
    name: "Zoom In Panic",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 280, y: 195, w: 30, h: 25, id: "hiddenCloser1" },
      { x: 450, y: 195, w: 30, h: 25, id: "hiddenCloser2" }
    ],
    update: function(player) {
      const h1 = this.hazards.find(h => h.id === "hiddenCloser1");
      const h2 = this.hazards.find(h => h.id === "hiddenCloser2");
      // Sirf close range pe reveal honge
      if (h1) h1.hidden = (Math.abs(player.x - h1.x) > 80);
      if (h2) h2.hidden = (Math.abs(player.x - h2.x) > 80);
    }
  },

  // Level 63: Cinematic Bars Crush (Squeezing boundary bars)
  {
    id: 63,
    name: "Cinematic Bars Crush",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 0, y: -100, w: 720, h: 80, id: "topBarCrush" }
    ],
    hazards: [],
    update: function(player) {
      const bar = this.platforms.find(p => p.id === "topBarCrush");
      // Center me aate hi cinematic black bar crashes downwards
      if (bar && player.x > 200 && bar.y < 80) {
        bar.y += 2.5;
      }
    }
  },

  // Level 64: Fake Dead Pixels (Disguised stationary traps)
  {
    id: 64,
    name: "Fake Dead Pixels",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 300, y: 200, w: 100, h: 20 },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [
      { x: 220, y: 255, w: 260, h: 20 },
      { x: 340, y: 175, w: 18, h: 25, id: "deadPixelTrap" }
    ],
    update: function() {}
  },

  // Level 65: Color Blind Mode (Disappearing flat monochrome steps)
  {
    id: 65,
    name: "Color Blind Mode",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 220, w: 100, h: 48, id: "monoTrap" },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 180, y: 260, w: 280, h: 20 } ],
    update: function(player) {
      const m = this.platforms.find(p => p.id === "monoTrap");
      if (m && player.x > 240 && m.y < 350) {
        m.y += 5; // Instant trap fall
      }
    }
  },

  // Level 66: Rotating Camera Lens (Continuous centrifugal pull)
  {
    id: 66,
    name: "Rotating Camera Lens",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 240, y: 190, w: 100, h: 20 },
      { x: 420, y: 170, w: 100, h: 20 },
      { x: 560, y: 220, w: 160, h: 48 }
    ],
    hazards: [ { x: 160, y: 255, w: 400, h: 20 } ],
    lensTick: 0,
    update: function(player) {
      this.lensTick = (this.lensTick || 0) + 1;
      // Rotational wobble drift
      player.x += Math.sin(this.lensTick * 0.08) * 1.6;
    }
  },

  // Level 67: Screen Blur Shock (Jump apex momentum disruption)
  {
    id: 67,
    name: "Screen Blur Shock",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 300, y: 200, w: 100, h: 20 },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [ { x: 200, y: 255, w: 300, h: 20 } ],
    update: function(player, input) {
      // Jump lete hi velocity forward flip/stutter
      if (input && input.jump && player.y < 180) {
        player.x -= 0.8;
      }
    }
  },

  // Level 68: Mirror Image Illusion (Fake double hazards)
  {
    id: 68,
    name: "Mirror Image Illusion",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 280, y: 195, w: 30, h: 25 },
      { x: 460, y: 195, w: 30, h: 25, id: "mirrorHazard68" }
    ],
    update: function(player) {
      const mh = this.hazards.find(h => h.id === "mirrorHazard68");
      // Real hazard mirror shifts as player moves
      if (mh && player.x > 320 && mh.x > 360) {
        mh.x -= 1.8;
      }
    }
  },

  // Level 69: VHS Glitch Effect (Horizontal frame displacement)
  {
    id: 69,
    name: "VHS Glitch Effect",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 240, y: 200, w: 110, h: 20, id: "vhsPlat" },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 150, y: 255, w: 310, h: 20 } ],
    vhsTick: 0,
    update: function() {
      this.vhsTick = (this.vhsTick || 0) + 1;
      const vp = this.platforms.find(p => p.id === "vhsPlat");
      // Dynamic shift glitch
      if (vp && this.vhsTick % 30 === 0) {
        vp.x = (vp.x === 240) ? 290 : 240;
      }
    }
  },

  // Level 70: Flashbang Flash (Bright white blind bar dropping down)
  {
    id: 70,
    name: "Flashbang Flash",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 300, y: -200, w: 180, h: 220, id: "flashBlock70" }
    ],
    hazards: [ { x: 360, y: 195, w: 35, h: 25 } ],
    update: function(player) {
      const fb = this.platforms.find(p => p.id === "flashBlock70");
      if (fb && player.x > 220 && fb.y < 20) {
        fb.y += 20; // Sudden flash blind drop
      }
    }
  },
                  // Level 71: Screen Melting Trap (Melting visual illusion, static actual collider)
  {
    id: 71,
    name: "Screen Melting Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 200, w: 120, h: 20, id: "meltIllusion" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 180, y: 260, w: 300, h: 20 } ],
    meltTick: 0,
    update: function() {
      this.meltTick = (this.meltTick || 0) + 1;
      const m = this.platforms.find(p => p.id === "meltIllusion");
      if (m) {
        m.h = 20 + Math.sin(this.meltTick * 0.1) * 6;
      }
    }
  },

  // Level 72: Deep Fog Mystery (Tight visibility blind dash)
  {
    id: 72,
    name: "Deep Fog Mystery",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 240, y: 200, w: 90, h: 20, id: "fogStep1" },
      { x: 400, y: 180, w: 90, h: 20, id: "fogStep2" },
      { x: 550, y: 220, w: 170, h: 48 }
    ],
    hazards: [ { x: 160, y: 260, w: 390, h: 20 } ],
    update: function(player) {
      const f1 = this.platforms.find(p => p.id === "fogStep1");
      const f2 = this.platforms.find(p => p.id === "fogStep2");
      if (f1) f1.hidden = (Math.abs(player.x - f1.x) > 70);
      if (f2) f2.hidden = (Math.abs(player.x - f2.x) > 70);
    }
  },

  // Level 73: Fake Error Message (Background rolling hazard)
  {
    id: 73,
    name: "Fake Error Message",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 220, y: 60, w: 280, h: 140, id: "fakeErrorPopup" } // Massive error window
    ],
    hazards: [
      { x: 740, y: 190, w: 35, h: 30, id: "rollingStone73" }
    ],
    update: function(player) {
      const stone = this.hazards.find(h => h.id === "rollingStone73");
      if (stone && player.x > 120) {
        stone.x -= 4.2;
      }
    }
  },

  // Level 74: Font Distortion Mess (Jittering symbol blocks)
  {
    id: 74,
    name: "Font Distortion Mess",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 220, y: 200, w: 110, h: 20, id: "fontBlock1" },
      { x: 400, y: 200, w: 110, h: 20, id: "fontBlock2" },
      { x: 570, y: 220, w: 150, h: 48 }
    ],
    hazards: [ { x: 150, y: 260, w: 420, h: 20 } ],
    fTick: 0,
    update: function() {
      this.fTick = (this.fTick || 0) + 1;
      const b1 = this.platforms.find(p => p.id === "fontBlock1");
      const b2 = this.platforms.find(p => p.id === "fontBlock2");
      if (b1) b1.w = 110 + Math.sin(this.fTick * 0.2) * 15;
      if (b2) b2.x = 400 + Math.cos(this.fTick * 0.2) * 15;
    }
  },

  // Level 75: Static Cam Detach (Blind off-screen run)
  {
    id: 75,
    name: "Static Cam Detach",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 300, h: 48 },
      { x: 420, y: 220, w: 300, h: 48 }
    ],
    hazards: [ { x: 300, y: 260, w: 120, h: 20 } ],
    update: function(player) {
      if (player.x > 320 && player.x < 460) {
        player.hidden = true; // Offscreen blind leap
      } else {
        player.hidden = false;
      }
    }
  },

  // Level 76: Disco Light Blindness (High speed projectile in flash intervals)
  {
    id: 76,
    name: "Disco Light Blindness",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: 740, y: 185, w: 25, h: 35, id: "discoBullet" }
    ],
    update: function(player) {
      const b = this.hazards.find(h => h.id === "discoBullet");
      if (b && player.x > 100) {
        b.x -= 6.5;
        if (b.x < -30) b.x = 740;
      }
    }
  },

  // Level 77: Upside Down Reflection (Real traps render below)
  {
    id: 77,
    name: "Upside Down Reflection",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 280, y: 220, w: 120, h: 48, id: "waterFallTile" },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 200, y: 260, w: 280, h: 20 } ],
    update: function(player) {
      const w = this.platforms.find(p => p.id === "waterFallTile");
      if (w && player.x > 270 && w.y < 350) {
        w.y += 6;
      }
    }
  },

  // Level 78: Pixel Expansion Troll (Block expands 10x horizontally)
  {
    id: 78,
    name: "Pixel Expansion Troll",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 380, y: 160, w: 20, h: 60, id: "expandingWall" }
    ],
    hazards: [],
    update: function(player) {
      const wall = this.platforms.find(p => p.id === "expandingWall");
      if (wall && player.x > 260) {
        if (wall.w < 160) {
          wall.w += 5;
          wall.x -= 3;
        }
      }
    }
  },

  // Level 79: Negative Contrast Flip (Inverse safe path)
  {
    id: 79,
    name: "Negative Contrast Flip",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 260, y: 200, w: 100, h: 20, id: "fakeSafeTile" },
      { x: 440, y: 220, w: 280, h: 48 }
    ],
    hazards: [ { x: 200, y: 260, w: 240, h: 20 } ],
    update: function(player) {
      const fs = this.platforms.find(p => p.id === "fakeSafeTile");
      if (fs && player.x > 250 && fs.y < 350) {
        fs.y += 8;
      }
    }
  },

  // Level 80: Split Screen Illusion (Physics desync time step)
  {
    id: 80,
    name: "Split Screen Illusion",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 260, y: 190, w: 100, h: 20 },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 160, y: 260, w: 300, h: 20 } ],
    splitTick: 0,
    update: function(player) {
      this.splitTick = (this.splitTick || 0) + 1;
      if (player.x > 180 && player.x < 420) {
        player.x += (this.splitTick % 2 === 0 ? 1 : -1) * 2;
      }
    }
  },
      // ==========================================
  // WORLD 5: MATRIX GLITCHES (LEVELS 81 - 90)
  // ==========================================

  // Level 81: Zero Gravity Drift (Float up velocity dampening)
  {
    id: 81,
    name: "Zero Gravity Drift",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 }
    ],
    hazards: [
      { x: 180, y: 20, w: 360, h: 25 } // Ceiling hazard
    ],
    update: function(player, input) {
      if (input && input.jump) {
        player.vy -= 1.2; // Float up towards ceiling spikes
      }
    }
  },

  // Level 82: Wall Walk Glitch (Climbing narrow corridor walls)
  {
    id: 82,
    name: "Wall Walk Glitch",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 90, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 170, w: 30, h: 100 },
      { x: 380, y: 120, w: 30, h: 120 },
      { x: 520, y: 160, w: 200, h: 48 }
    ],
    hazards: [
      { x: 140, y: 260, w: 380, h: 20 }
    ],
    update: function() {}
  },

  // Level 83: Shadow Clone Attack (Trailing lethal shadow clone)
  {
    id: 83,
    name: "Shadow Clone Attack",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: -50, y: 195, w: 20, h: 25, id: "shadowClone" }
    ],
    update: function(player) {
      const clone = this.hazards.find(h => h.id === "shadowClone");
      if (clone && player.x > 80) {
        clone.x += (player.x - clone.x) * 0.04;
      }
    }
  },

  // Level 84: Infinity Loop Corridor (True exit hidden on left edge)
  {
    id: 84,
    name: "Infinity Loop Corridor",
    spawn: { x: 80, y: 150 },
    door: { x: 10, y: 160, w: 36, h: 60 }, // Hidden at left boundary
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [],
    update: function(player) {
      // Loop warp if running right endlessly
      if (player.x > 680) {
        player.x = 120;
      }
    }
  },

  // Level 85: Matrix Code Fall (Dynamic dropping code stream tiles)
  {
    id: 85,
    name: "Matrix Code Fall",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 150, h: 48 },
      { x: 220, y: 190, w: 80, h: 20, id: "codePlat1" },
      { x: 380, y: 170, w: 80, h: 20, id: "codePlat2" },
      { x: 530, y: 220, w: 190, h: 48 }
    ],
    hazards: [ { x: 150, y: 260, w: 380, h: 20 } ],
    codeTick: 0,
    update: function() {
      this.codeTick = (this.codeTick || 0) + 1;
      const c1 = this.platforms.find(p => p.id === "codePlat1");
      const c2 = this.platforms.find(p => p.id === "codePlat2");
      if (c1) c1.y = 190 + Math.sin(this.codeTick * 0.15) * 20;
      if (c2) c2.y = 170 + Math.cos(this.codeTick * 0.15) * 20;
    }
  },

  // Level 86: Glitched Jump Height (Randomized jump power)
  {
    id: 86,
    name: "Glitched Jump Height",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 200, w: 120, h: 20 },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 180, y: 260, w: 280, h: 20 } ],
    update: function(player, input) {
      if (input && input.jump && player.vy < 0) {
        player.vy *= (Math.random() > 0.5 ? 1.4 : 0.6); // Glitched velocity
      }
    }
  },

  // Level 87: Rewind Time Trap (Status rewinds position)
  {
    id: 87,
    name: "Rewind Time Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [ { x: 380, y: 195, w: 40, h: 25 } ],
    rewindTimer: 0,
    update: function(player) {
      this.rewindTimer = (this.rewindTimer || 0) + 1;
      // Har 180 frames par rewind jump back
      if (this.rewindTimer % 180 === 0 && player.x > 200) {
        player.x -= 100;
      }
    }
  },

  // Level 88: Invisible Matrix Path (Materialize on near touch)
  {
    id: 88,
    name: "Invisible Matrix Path",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 210, w: 70, h: 20, hidden: true, id: "invisNode1" },
      { x: 360, y: 200, w: 70, h: 20, hidden: true, id: "invisNode2" },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [ { x: 140, y: 260, w: 360, h: 20 } ],
    update: function(player) {
      const n1 = this.platforms.find(p => p.id === "invisNode1");
      const n2 = this.platforms.find(p => p.id === "invisNode2");
      if (n1 && Math.abs(player.x - n1.x) < 60) n1.hidden = false;
      if (n2 && Math.abs(player.x - n2.x) < 60) n2.hidden = false;
    }
  },

  // Level 89: Double Speed Desperation (2x hyper acceleration)
  {
    id: 89,
    name: "Double Speed Desperation",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 280, y: 190, w: 80, h: 20 },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 200, y: 260, w: 260, h: 20 } ],
    update: function(player, input) {
      if (input && input.right) {
        player.x += 4; // 2x Turbo dash
      }
    }
  },

  // Level 90: Fake Crash Loop (Blue alert override)
  {
    id: 90,
    name: "Fake Crash Loop",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 180, y: 40, w: 360, h: 180, id: "fakeCrashBox" }
    ],
    hazards: [],
    update: function(player) {
      const box = this.platforms.find(p => p.id === "fakeCrashBox");
      if (box && player.x > 300) {
        box.y = -600; // Clears away once pushed through
      }
    }
  },
         // ==========================================
  // WORLD 5: MATRIX GLITCHES (LEVELS 81 - 100)
  // ==========================================

  // Level 81: Zero Gravity Drift (Float upward into ceiling hazards)
  {
    id: 81,
    name: "Zero Gravity Drift",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 300, y: 200, w: 100, h: 20 },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [
      { x: 200, y: 255, w: 300, h: 20 },
      { x: 260, y: 20, w: 200, h: 25 } // Ceiling spikes
    ],
    update: function(player, input) {
      if (input && input.jump && player.y > 60) {
        player.vy -= 1.8; // Antigravity float
      }
    }
  },

  // Level 82: Wall Walk Glitch (Wall projection hazards)
  {
    id: 82,
    name: "Wall Walk Glitch",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 60, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 220, y: 160, w: 40, h: 120 },
      { x: 380, y: 120, w: 40, h: 120 },
      { x: 540, y: 120, w: 180, h: 48 }
    ],
    hazards: [ { x: 180, y: 260, w: 360, h: 20 } ],
    update: function() {}
  },

  // Level 83: Shadow Clone Attack (Clone chases previous steps)
  {
    id: 83,
    name: "Shadow Clone Attack",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [
      { x: -50, y: 195, w: 20, h: 25, id: "shadowClone" }
    ],
    update: function(player) {
      const clone = this.hazards.find(h => h.id === "shadowClone");
      if (clone && player.x > 80) {
        clone.x += (player.x - clone.x) * 0.04;
      }
    }
  },

  // Level 84: Infinity Loop Corridor (Wrap-around illusion; walk left to win)
  {
    id: 84,
    name: "Infinity Loop Corridor",
    spawn: { x: 100, y: 150 },
    door: { x: 20, y: 160, w: 36, h: 60 }, // Exit is actually behind at left
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [],
    update: function(player) {
      // Running right loops player back
      if (player.x > 680) {
        player.x = 80;
      }
    }
  },

  // Level 85: Matrix Code Fall (Falling floor stream)
  {
    id: 85,
    name: "Matrix Code Fall",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 70, h: 20, id: "codeBlock1" },
      { x: 380, y: 200, w: 70, h: 20, id: "codeBlock2" },
      { x: 540, y: 220, w: 180, h: 48 }
    ],
    hazards: [ { x: 140, y: 260, w: 400, h: 20 } ],
    codeTick: 0,
    update: function() {
      this.codeTick = (this.codeTick || 0) + 1;
      const b1 = this.platforms.find(p => p.id === "codeBlock1");
      const b2 = this.platforms.find(p => p.id === "codeBlock2");
      if (b1) b1.y = 200 + Math.sin(this.codeTick * 0.1) * 18;
      if (b2) b2.y = 200 + Math.cos(this.codeTick * 0.1) * 18;
    }
  },

  // Level 86: Glitched Jump Height (Unstable vertical velocity)
  {
    id: 86,
    name: "Glitched Jump Height",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 280, y: 200, w: 120, h: 20 },
      { x: 480, y: 220, w: 240, h: 48 }
    ],
    hazards: [ { x: 180, y: 255, w: 300, h: 20 } ],
    update: function(player, input) {
      if (input && input.jump && player.vy < -4) {
        player.vy -= 1.2; // Extra crazy air boost
      }
    }
  },

  // Level 87: Rewind Time Trap (Periodic coordinate snapback)
  {
    id: 87,
    name: "Rewind Time Trap",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [ { x: 380, y: 195, w: 40, h: 25 } ],
    rewindTimer: 0,
    update: function(player) {
      this.rewindTimer = (this.rewindTimer || 0) + 1;
      if (this.rewindTimer % 180 === 0 && player.x > 160) {
        player.x -= 80; // Rewind snap
      }
    }
  },

  // Level 88: Invisible Matrix Path (Invisible bridges reveal on contact)
  {
    id: 88,
    name: "Invisible Matrix Path",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 100, h: 20, hidden: true, id: "invisMat1" },
      { x: 400, y: 200, w: 100, h: 20, hidden: true, id: "invisMat2" },
      { x: 560, y: 220, w: 160, h: 48 }
    ],
    hazards: [ { x: 140, y: 260, w: 420, h: 20 } ],
    update: function(player) {
      const m1 = this.platforms.find(p => p.id === "invisMat1");
      const m2 = this.platforms.find(p => p.id === "invisMat2");
      if (m1 && player.x > 200) m1.hidden = false;
      if (m2 && player.x > 380) m2.hidden = false;
    }
  },

  // Level 89: Double Speed Desperation (2x hyper speed drift)
  {
    id: 89,
    name: "Double Speed Desperation",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 300, y: 190, w: 100, h: 20 },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [ { x: 200, y: 255, w: 300, h: 20 } ],
    update: function(player, input) {
      if (input && input.right) player.x += 2.2;
      if (input && input.left) player.x -= 2.2;
    }
  },

  // Level 90: Fake Crash Loop (Blue alert window, keep walking forward)
  {
    id: 90,
    name: "Fake Crash Loop",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 180, y: 40, w: 360, h: 180, id: "bsodBox" }
    ],
    hazards: [],
    update: function() {}
  },

  // Level 91: Dimension Swap Portal (Active grid switches)
  {
    id: 91,
    name: "Dimension Swap Portal",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 200, w: 100, h: 20, id: "dimPlatA" },
      { x: 420, y: 180, w: 100, h: 20, id: "dimPlatB" },
      { x: 580, y: 220, w: 140, h: 48 }
    ],
    hazards: [ { x: 180, y: 260, w: 400, h: 20 } ],
    dimTick: 0,
    update: function() {
      this.dimTick = (this.dimTick || 0) + 1;
      const pa = this.platforms.find(p => p.id === "dimPlatA");
      const pb = this.platforms.find(p => p.id === "dimPlatB");
      const phase = Math.floor(this.dimTick / 45) % 2;
      if (pa) pa.hidden = (phase === 0);
      if (pb) pb.hidden = (phase !== 0);
    }
  },

  // Level 92: Clipping Glitch Danger (Corner clip void pit)
  {
    id: 92,
    name: "Clipping Glitch Danger",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 220, h: 48 },
      { x: 220, y: 220, w: 140, h: 48, id: "clipTile" },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [ { x: 360, y: 260, w: 100, h: 20 } ],
    update: function(player) {
      const ct = this.platforms.find(p => p.id === "clipTile");
      if (ct && player.x > 240 && ct.y < 350) {
        ct.y += 9; // Disintegrates on slide
      }
    }
  },

  // Level 93: Text String Platforms (Stepping on danger word triggers drop)
  {
    id: 93,
    name: "Text String Platforms",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 160, h: 48 },
      { x: 240, y: 200, w: 100, h: 20, id: "wordDrop" },
      { x: 420, y: 200, w: 100, h: 20 },
      { x: 560, y: 220, w: 160, h: 48 }
    ],
    hazards: [ { x: 160, y: 260, w: 400, h: 20 } ],
    update: function(player) {
      const wd = this.platforms.find(p => p.id === "wordDrop");
      if (wd && player.x > 250 && wd.y < 340) {
        wd.y += 4;
      }
    }
  },

  // Level 94: Tile Shifter Randomizer (Block positions relocate on jump)
  {
    id: 94,
    name: "Tile Shifter Randomizer",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 240, y: 190, w: 90, h: 20, id: "shiftBlock" },
      { x: 420, y: 190, w: 90, h: 20 },
      { x: 560, y: 220, w: 160, h: 48 }
    ],
    hazards: [ { x: 140, y: 260, w: 420, h: 20 } ],
    didShift: false,
    update: function(player, input) {
      const sb = this.platforms.find(p => p.id === "shiftBlock");
      if (input && input.jump && sb && !this.didShift) {
        sb.x = 280; // Shifter snap
        this.didShift = true;
      }
    }
  },

  // Level 95: Lag Teleportation Mesh (Jitter packet loss simulation)
  {
    id: 95,
    name: "Lag Teleportation Mesh",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 200, h: 48 },
      { x: 300, y: 200, w: 100, h: 20 },
      { x: 500, y: 220, w: 220, h: 48 }
    ],
    hazards: [ { x: 200, y: 255, w: 300, h: 20 } ],
    meshTick: 0,
    update: function(player) {
      this.meshTick = (this.meshTick || 0) + 1;
      if (this.meshTick % 20 === 0 && player.x > 180 && player.x < 460) {
        player.x += (Math.random() > 0.5 ? 8 : -8);
      }
    }
  },

  // Level 96: Low Poly Decimation (Extreme thin wireframe platforms)
  {
    id: 96,
    name: "Low Poly Decimation",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 140, h: 48 },
      { x: 220, y: 200, w: 45, h: 10 },
      { x: 360, y: 180, w: 45, h: 10 },
      { x: 500, y: 160, w: 45, h: 10 },
      { x: 600, y: 220, w: 120, h: 48 }
    ],
    hazards: [ { x: 140, y: 260, w: 460, h: 20 } ],
    update: function() {}
  },

  // Level 97: Memory Leak Slowdown (Speed penalty, rush before frozen)
  {
    id: 97,
    name: "Memory Leak Slowdown",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [ { x: 0, y: 220, w: 720, h: 48 } ],
    hazards: [ { x: 380, y: 195, w: 30, h: 25 } ],
    leakTimer: 0,
    update: function(player) {
      this.leakTimer = (this.leakTimer || 0) + 1;
      if (this.leakTimer > 80 && player.vx !== 0) {
        player.vx *= 0.94; // Incremental crawl
      }
    }
  },

  // Level 98: Corrupted Save State (Checkpoint trap)
  {
    id: 98,
    name: "Corrupted Save State",
    spawn: { x: 40, y: 150 },
    door: { x: 630, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 260, h: 48 },
      { x: 420, y: 220, w: 300, h: 48 }
    ],
    hazards: [
      { x: 260, y: 255, w: 160, h: 20 },
      { x: 210, y: 180, w: 25, h: 40, id: "corruptFlag" }
    ],
    update: function(player) {
      const f = this.hazards.find(h => h.id === "corruptFlag");
      if (f && player.x > 190) {
        f.w = 60; // Flag explodes hazard radius
      }
    }
  },

  // Level 99: Developer Console Override (Code block obstructions)
  {
    id: 99,
    name: "Developer Console Override",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 720, h: 48 },
      { x: 260, y: -200, w: 200, h: 220, id: "consoleBlock" }
    ],
    hazards: [ { x: 480, y: 195, w: 40, h: 25 } ],
    update: function(player) {
      const cb = this.platforms.find(p => p.id === "consoleBlock");
      if (cb && player.x > 200 && cb.y < 30) {
        cb.y += 18; // Console window crashes down
      }
    }
  },

  // Level 100: Demon King Core Glitch (Grand Finale Boss Core Encounter)
  {
    id: 100,
    name: "Demon King Core Glitch",
    spawn: { x: 40, y: 150 },
    door: { x: 640, y: 160, w: 36, h: 60 },
    platforms: [
      { x: 0, y: 220, w: 180, h: 48 },
      { x: 260, y: 200, w: 100, h: 20, id: "bossCorePlat" },
      { x: 460, y: 220, w: 260, h: 48 }
    ],
    hazards: [
      { x: 180, y: 260, w: 280, h: 20 },
      { x: 380, y: 120, w: 40, h: 40, id: "demonCore" }
    ],
    bossTick: 0,
    update: function(player) {
      this.bossTick = (this.bossTick || 0) + 1;
      const core = this.hazards.find(h => h.id === "demonCore");
      const bp = this.platforms.find(p => p.id === "bossCorePlat");
      // Final Boss Core phase transitions
      if (core) {
        core.y = 120 + Math.sin(this.bossTick * 0.15) * 35;
        core.x = 380 + Math.cos(this.bossTick * 0.15) * 45;
      }
      if (bp && player.x > 250 && bp.y < 320) {
        bp.y += 1.8; // Final platform crumbling test
      }
    }
  }
];
        
  

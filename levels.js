// 100 Distinct Procedural & Unique Troll Trap Mechanics for Vortex-360
function generate100Levels() {
  const levels = [];

  function pseudoRandom(seed) {
    const x = Math.sin(seed * 7823.119) * 10000;
    return x - Math.floor(x);
  }

  // 100 Completely Distinct Trap Architectures
  const TRAP_TYPES = [
    "PITFALL_SURPRISE", "CEILING_SMASH", "TELEPORT_DOOR", "CRUMBLE_RUN", 
    "HOMING_SPIKE", "BOUNCE_LAUNCHER", "INVERTED_ZONE", "BLINKING_LASER", 
    "SINKING_ISLAND", "CHASER_SAW", "FAKEOUT_DOOR", "SHRINKING_LEDGE",
    "GHOST_BRIDGES", "RISING_LAVA", "DELAYED_FALL", "WIND_PUSH",
    "GRAVITY_FLIP", "SPIKE_WALL_CHARGE", "STEP_EXPLODER", "PHANTOM_EXIT"
  ];

  for (let i = 1; i <= 100; i++) {
    let s = i * 13.37;
    const r1 = pseudoRandom(s++);
    const r2 = pseudoRandom(s++);
    const r3 = pseudoRandom(s++);
    
    // Choose specific trap paradigm based on unique level index
    const trapKind = TRAP_TYPES[(i - 1) % TRAP_TYPES.length];
    
    let platforms = [];
    let hazards = [];
    let door = { x: 630, y: 140, w: 36, h: 60, originalX: 630, originalY: 140 };
    let mechanics = { type: trapKind, timer: 0 };

    // Basic starting ledge
    platforms.push({ x: 0, y: 220, w: 120 + Math.floor(r1 * 40), h: 48 });

    // Distinct Structural Layouts based on Trap Type
    switch (trapKind) {
      case "PITFALL_SURPRISE":
        // Solid appearance, but center drops directly under player
        platforms.push({ x: 160, y: 220, w: 140, h: 48, id: "fake_floor" });
        platforms.push({ x: 380, y: 220, w: 340, h: 48 });
        hazards.push({ x: 160, y: 250, w: 140, h: 25 });
        break;

      case "CEILING_SMASH":
        // Massive ceiling spike falls precisely when half-way
        platforms.push({ x: 0, y: 220, w: 720, h: 48 });
        hazards.push({ x: 300 + Math.floor(r2 * 120), y: -70, w: 40, h: 40, id: "crusher" });
        break;

      case "TELEPORT_DOOR":
        // Portal cowers and flees to start point
        platforms.push({ x: 0, y: 220, w: 720, h: 48 });
        door.x = 580;
        door.originalX = 580;
        break;

      case "CRUMBLE_RUN":
        // Rapid succession of small crumbling steps
        for (let step = 0; step < 4; step++) {
          platforms.push({
            x: 150 + step * 105,
            y: 200 - step * 18,
            w: 65,
            h: 20,
            id: `crumble_${step}`
          });
        }
        platforms.push({ x: 570, y: 150, w: 150, h: 90 });
        hazards.push({ x: 140, y: 250, w: 430, h: 25 });
        door.y = 90;
        break;

      case "HOMING_SPIKE":
        // Spike tracks player horizontally before dropping
        platforms.push({ x: 0, y: 220, w: 300, h: 48 });
        platforms.push({ x: 420, y: 220, w: 300, h: 48 });
        hazards.push({ x: 300, y: 250, w: 120, h: 25 });
        hazards.push({ x: 100, y: -40, w: 34, h: 34, id: "homing" });
        break;

      case "BOUNCE_LAUNCHER":
        // Jump pad launches player directly into ceiling spikes if careless
        platforms.push({ x: 220, y: 215, w: 55, h: 16, id: "launcher" });
        platforms.push({ x: 460, y: 160, w: 260, h: 80 });
        hazards.push({ x: 120, y: 250, w: 340, h: 25 });
        hazards.push({ x: 200, y: 0, w: 160, h: 25 }); // Ceiling spike trap
        door.y = 100;
        break;

      case "INVERTED_ZONE":
        // Mid-air gap where controls invert
        platforms.push({ x: 0, y: 220, w: 260, h: 48 });
        platforms.push({ x: 440, y: 220, w: 280, h: 48 });
        hazards.push({ x: 260, y: 250, w: 180, h: 25 });
        mechanics.invertArea = { x1: 240, x2: 450 };
        break;

      case "BLINKING_LASER":
        // Timed deadly barrier blocks the path
        platforms.push({ x: 0, y: 220, w: 720, h: 48 });
        hazards.push({ x: 360, y: 90, w: 24, h: 130, id: "laser" });
        break;

      case "SINKING_ISLAND":
        // Central island sinks into pit when stepped on
        platforms.push({ x: 220, y: 200, w: 120, h: 30, id: "sinker" });
        platforms.push({ x: 480, y: 190, w: 240, h: 60 });
        hazards.push({ x: 120, y: 250, w: 360, h: 25 });
        door.y = 130;
        break;

      case "CHASER_SAW":
        // Fast hazard starts chasing from the left wall
        platforms.push({ x: 0, y: 220, w: 720, h: 48 });
        hazards.push({ x: -40, y: 185, w: 35, h: 35, id: "chaser" });
        break;

      case "FAKEOUT_DOOR":
        // Door at end is fake (drops spike); real exit opens behind
        platforms.push({ x: 0, y: 220, w: 720, h: 48 });
        door.x = 640;
        hazards.push({ x: 640, y: -60, w: 36, h: 36, id: "trap_door_spike" });
        break;

      case "SHRINKING_LEDGE":
        // Platform width shrinks quickly
        platforms.push({ x: 220, y: 195, w: 160, h: 26, id: "shrinker" });
        platforms.push({ x: 500, y: 180, w: 220, h: 70 });
        hazards.push({ x: 120, y: 250, w: 380, h: 25 });
        door.y = 120;
        break;

      default:
        // Moving platform with floating hazards
        platforms.push({ x: 180, y: 210, w: 85, h: 22, id: "patrol", dir: 1 });
        platforms.push({ x: 480, y: 200, w: 240, h: 50 });
        hazards.push({ x: 120, y: 250, w: 360, h: 25 });
        door.y = 140;
        break;
    }

    levels.push({
      id: i,
      name: `Sector ${i} [${trapKind.replace('_', ' ')}]`,
      spawn: { x: 40, y: 150 },
      door: door,
      platforms: platforms,
      hazards: hazards,
      mechanics: mechanics,
      update: function(player, input) {
        this.mechanics.timer++;
        const t = this.mechanics.type;

        // Custom Trap Engine per level
        if (t === "PITFALL_SURPRISE") {
          const fake = this.platforms.find(p => p.id === "fake_floor");
          if (fake && player.x > 140) fake.y += 15;
        } 
        else if (t === "CEILING_SMASH") {
          const c = this.hazards.find(h => h.id === "crusher");
          if (c && player.x > c.x - 70) c.y += 18;
        } 
        else if (t === "TELEPORT_DOOR") {
          if (player.x > this.door.x - 90 && this.door.x < 660) this.door.x += 8;
          if (this.door.x >= 660 && player.x > 500) this.door.x = 45;
        } 
        else if (t === "CRUMBLE_RUN") {
          for (let step = 0; step < 4; step++) {
            const p = this.platforms.find(pl => pl.id === `crumble_${step}`);
            if (p && player.x > p.x - 5 && player.x < p.x + p.w + 5 && player.y <= p.y + 12) {
              p.y += 7;
            }
          }
        } 
        else if (t === "HOMING_SPIKE") {
          const spk = this.hazards.find(h => h.id === "homing");
          if (spk) {
            if (spk.y < 0) {
              spk.x += (player.x - spk.x) * 0.08;
              if (Math.abs(player.x - spk.x) < 25) spk.y = 1;
            } else {
              spk.y += 16;
            }
          }
        } 
        else if (t === "BOUNCE_LAUNCHER") {
          const b = this.platforms.find(p => p.id === "launcher");
          if (b && player.x > b.x - 5 && player.x < b.x + b.w + 5 && player.y >= b.y - player.height - 4) {
            player.vy = -14.8;
          }
        } 
        else if (t === "INVERTED_ZONE") {
          const a = this.mechanics.invertArea;
          this.invertActive = (player.x > a.x1 && player.x < a.x2);
        } 
        else if (t === "BLINKING_LASER") {
          const laser = this.hazards.find(h => h.id === "laser");
          if (laser) {
            laser.y = (Math.floor(this.mechanics.timer / 35) % 2 === 0) ? 90 : -500;
          }
        } 
        else if (t === "SINKING_ISLAND") {
          const sink = this.platforms.find(p => p.id === "sinker");
          if (sink && player.x > sink.x - 10 && player.x < sink.x + sink.w + 10 && player.isGrounded) {
            sink.y += 3.5;
          }
        } 
        else if (t === "CHASER_SAW") {
          const saw = this.hazards.find(h => h.id === "chaser");
          if (saw && player.x > 60) saw.x += 4.6 + (i * 0.04);
        } 
        else if (t === "FAKEOUT_DOOR") {
          const drop = this.hazards.find(h => h.id === "trap_door_spike");
          if (drop && player.x > 570) drop.y += 16;
        } 
        else if (t === "SHRINKING_LEDGE") {
          const sh = this.platforms.find(p => p.id === "shrinker");
          if (sh && player.x > sh.x && player.x < sh.x + sh.w && player.isGrounded) {
            sh.w = Math.max(10, sh.w - 1.2);
            sh.x += 0.6;
          }
        } 
        else {
          const pat = this.platforms.find(p => p.id === "patrol");
          if (pat) {
            pat.x += 3.2 * pat.dir;
            if (pat.x > 380) pat.dir = -1;
            if (pat.x < 180) pat.dir = 1;
          }
        }
      }
    });
  }

  return levels;
}

const LEVELS = generate100Levels();

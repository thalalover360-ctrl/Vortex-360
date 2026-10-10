// Dynamic 100 Unique Levels Engine for Vortex-360
const LEVEL_TITLES = [
  "Watch Your Step", "Skyfall", "Fleeing Portal", "The Bait", "Crumble Path",
  "Spike Hunter", "Fake Exit", "Low Gravity", "Lava Pit", "Invisible Path",
  "Crusher Ceiling", "Double Cross", "The Launcher", "Laser Alley", "Ghost Steps",
  "Narrow Gap", "The Decoy", "Speed Trap", "Troll Drop", "Grand Gauntlet"
];

function generate100Levels() {
  const levels = [];

  for (let i = 1; i <= 100; i++) {
    const titleIndex = (i - 1) % LEVEL_TITLES.length;
    const tier = Math.ceil(i / 20);
    const name = `${LEVEL_TITLES[titleIndex]} ${tier > 1 ? '#' + tier : ''}`.trim();

    let platforms = [];
    let hazards = [];
    let door = { x: 620, y: 150, w: 38, h: 60, originalX: 620 };
    let mechanics = {};

    // 10 distinct level categories with variable layout math based on level id
    const type = (i - 1) % 10;

    switch (type) {
      case 0: // Pitfall Floor
        platforms = [
          { x: 0, y: 220, w: 200 + (i % 5) * 15, h: 48 },
          { x: 200 + (i % 5) * 15, y: 220, w: 110 + (i % 4) * 10, h: 48, id: "pit" },
          { x: 310 + (i % 5) * 15 + (i % 4) * 10, y: 220, w: 300, h: 48 }
        ];
        mechanics.pitTrigger = 180 + (i % 5) * 15;
        mechanics.update = function(player) {
          const pit = this.platforms.find(p => p.id === "pit");
          if (pit && player.x > this.pitTrigger) pit.y += 14;
        };
        break;

      case 1: // Falling Ceiling Spikes
        platforms = [{ x: 0, y: 220, w: 720, h: 48 }];
        hazards = [
          { x: 250 + (i % 6) * 30, y: -60, w: 32, h: 32, id: "drop1" },
          { x: 380 + (i % 4) * 25, y: -80, w: 32, h: 32, id: "drop2" }
        ];
        mechanics.update = function(player) {
          const d1 = this.hazards.find(h => h.id === "drop1");
          const d2 = this.hazards.find(h => h.id === "drop2");
          if (d1 && player.x > d1.x - 70) d1.y += 15;
          if (d2 && player.x > d2.x - 70) d2.y += 17;
        };
        break;

      case 2: // Escaping Door (Coward Portal)
        platforms = [{ x: 0, y: 220, w: 720, h: 48 }];
        door.x = 540;
        door.originalX = 540;
        mechanics.update = function(player) {
          if (player.x > this.door.x - 80 && this.door.x < 650) this.door.x += 8;
          if (this.door.x >= 650 && player.x > 520) this.door.x = 40;
        };
        break;

      case 3: // Moving Platform across Hazard Pit
        platforms = [
          { x: 0, y: 220, w: 140, h: 48 },
          { x: 180, y: 220, w: 90, h: 26, id: "moving", dir: 1 },
          { x: 500, y: 220, w: 220, h: 48 }
        ];
        hazards = [{ x: 140, y: 245, w: 360, h: 25 }];
        mechanics.update = function() {
          const m = this.platforms.find(p => p.id === "moving");
          if (m) {
            m.x += 3.2 * m.dir;
            if (m.x > 390) m.dir = -1;
            if (m.x < 170) m.dir = 1;
          }
        };
        break;

      case 4: // Crumbling Step Trio
        platforms = [
          { x: 0, y: 220, w: 130, h: 48 },
          { x: 170, y: 185, w: 75, h: 22, id: "c1" },
          { x: 290, y: 155, w: 75, h: 22, id: "c2" },
          { x: 410, y: 130, w: 75, h: 22, id: "c3" },
          { x: 530, y: 150, w: 190, h: 100 }
        ];
        hazards = [{ x: 130, y: 245, w: 400, h: 25 }];
        door.y = 90;
        mechanics.update = function(player) {
          ['c1', 'c2', 'c3'].forEach((id, idx) => {
            const step = this.platforms.find(p => p.id === id);
            if (step && player.x > step.x - 10 && player.x < step.x + step.w + 10 && player.y <= step.y + 10) {
              step.y += 5 + idx * 2;
            }
          });
        };
        break;

      case 5: // Chasing Floor Spike (Spike Hunter)
        platforms = [{ x: 0, y: 220, w: 720, h: 48 }];
        hazards = [{ x: -40, y: 190, w: 32, h: 30, id: "chaser" }];
        mechanics.update = function(player) {
          const chaser = this.hazards.find(h => h.id === "chaser");
          if (chaser && player.x > 80) {
            chaser.x += 4.5 + (i * 0.05); // Speed scales with level
          }
        };
        break;

      case 6: // Fake Portal with Teleport Trap
        platforms = [
          { x: 0, y: 220, w: 340, h: 48 },
          { x: 420, y: 220, w: 300, h: 48 }
        ];
        hazards = [
          { x: 340, y: 245, w: 80, h: 25 },
          { x: 480, y: 180, w: 36, h: 40, id: "fakeDoorHazard" } // Looks like safe spot but triggers spike
        ];
        door.x = 640;
        mechanics.update = function(player) {
          const fake = this.hazards.find(h => h.id === "fakeDoorHazard");
          if (fake && player.x > 460) fake.y = 190;
        };
        break;

      case 7: // High Bounce Launchers
        platforms = [
          { x: 0, y: 220, w: 160, h: 48 },
          { x: 230, y: 215, w: 60, h: 16, id: "bouncer" },
          { x: 490, y: 130, w: 230, h: 120 }
        ];
        hazards = [
          { x: 160, y: 245, w: 330, h: 25 },
          { x: 200, y: 0, w: 120, h: 25 } // Ceiling hazard if you jump wrong
        ];
        door.y = 70;
        mechanics.update = function(player) {
          const b = this.platforms.find(p => p.id === "bouncer");
          if (b && player.x > b.x - 10 && player.x < b.x + b.w + 10 && player.y >= b.y - player.height - 4) {
            player.vy = -14.5; // Mega launch
          }
        };
        break;

      case 8: // Sinking Elevator Island
        platforms = [
          { x: 0, y: 220, w: 170, h: 48 },
          { x: 250, y: 180, w: 140, h: 32, id: "elevator" },
          { x: 470, y: 160, w: 250, h: 100 }
        ];
        hazards = [{ x: 170, y: 245, w: 300, h: 25 }];
        door.y = 100;
        mechanics.update = function(player) {
          const el = this.platforms.find(p => p.id === "elevator");
          if (el && player.x > el.x - 15 && player.x < el.x + el.w + 15 && player.isGrounded) {
            el.y += 3.5;
          }
        };
        break;

      case 9: // Strobe Lasers / Disappearing Steps
        platforms = [
          { x: 0, y: 220, w: 200, h: 48 },
          { x: 260, y: 200, w: 80, h: 24, id: "strobe1" },
          { x: 390, y: 175, w: 80, h: 24, id: "strobe2" },
          { x: 520, y: 150, w: 200, h: 100 }
        ];
        hazards = [{ x: 200, y: 245, w: 320, h: 25 }];
        door.y = 90;
        mechanics.timer = 0;
        mechanics.update = function() {
          this.mechanics.timer = (this.mechanics.timer || 0) + 1;
          const visible = Math.floor(this.mechanics.timer / 40) % 2 === 0;
          const s1 = this.platforms.find(p => p.id === "strobe1");
          const s2 = this.platforms.find(p => p.id === "strobe2");
          if (s1) s1.y = visible ? 200 : -500;
          if (s2) s2.y = !visible ? 175 : -500;
        };
        break;
    }

    levels.push({
      id: i,
      name: name,
      spawn: { x: 50, y: 150 },
      door: door,
      platforms: platforms,
      hazards: hazards,
      mechanics: mechanics,
      update: function(player, input) {
        if (this.mechanics && this.mechanics.update) {
          this.mechanics.update.call(this, player, input);
        }
      }
    });
  }

  return levels;
}

const LEVELS = generate100Levels();

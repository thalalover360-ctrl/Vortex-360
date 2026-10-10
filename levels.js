// 100 Scaled-Up Levels for Vortex-360
const LEVEL_NAMES = [
  "Watch Your Step", "Look Above", "Catch Me", "Leap of Faith", "Brain Rot",
  "Spike Symphony", "Ghost Bridge", "Gravity Flick", "Floor is Lava", "The Mirage",
  "Reverse Psychology", "Speed Demon", "Double Cross", "Sky Spikes 2", "Fake Exit",
  "Platform Drop", "Mind Bender", "Invisible Trap", "Troll Jump", "Run or Die"
];

function generate100Levels() {
  const levels = [];

  for (let i = 1; i <= 100; i++) {
    const themeIdx = (i - 1) % LEVEL_NAMES.length;
    const name = `${LEVEL_NAMES[themeIdx]} ${Math.ceil(i / 20)}`;

    const trapType = i % 5;
    let platforms = [];
    let hazards = [];
    let door = { x: 620, y: 150, w: 38, h: 60, originalX: 620 };

    if (trapType === 1) {
      // Fake Floor Trap
      platforms = [
        { x: 0, y: 210, w: 310, h: 48 },
        { x: 310, y: 210, w: 150, h: 48, id: "pitfall" },
        { x: 460, y: 210, w: 260, h: 48 }
      ];
    } else if (trapType === 2) {
      // Ceiling Falling Hazard
      platforms = [{ x: 0, y: 210, w: 720, h: 48 }];
      hazards = [{ x: 320 + (i % 3) * 35, y: -50, w: 34, h: 34, id: "skySpike" }];
    } else if (trapType === 3) {
      // Coward Door
      platforms = [{ x: 0, y: 210, w: 720, h: 48 }];
      door.x = 560;
      door.originalX = 560;
    } else if (trapType === 4) {
      // Multi-Platform Faith Jump
      platforms = [
        { x: 0, y: 210, w: 150, h: 48 },
        { x: 210, y: 165, w: 85, h: 24, id: "fake1" },
        { x: 355, y: 125, w: 85, h: 24, id: "fake2" },
        { x: 510, y: 150, w: 210, h: 110 }
      ];
      hazards = [{ x: 150, y: 230, w: 360, h: 28 }];
      door.y = 90;
    } else {
      // Brain Rot / Inverted Controls Gap
      platforms = [
        { x: 0, y: 210, w: 250, h: 48 },
        { x: 410, y: 210, w: 310, h: 48 }
      ];
      hazards = [{ x: 250, y: 230, w: 160, h: 28 }];
    }

    const levelObj = {
      id: i,
      name: name,
      spawn: { x: 50, y: 150 },
      door: door,
      platforms: platforms,
      hazards: hazards,
      invertActive: false,
      update: function(player, input) {
        if (trapType === 1) {
          const pit = this.platforms.find(p => p.id === "pitfall");
          if (player.x > 260 && pit) pit.y += 14;
        } else if (trapType === 2) {
          const spike = this.hazards.find(h => h.id === "skySpike");
          if (player.x > 240 && spike) spike.y += 16;
        } else if (trapType === 3) {
          if (player.x > this.door.x - 90 && this.door.x < 640) this.door.x += 7;
          if (this.door.x >= 640 && player.x > 500) this.door.x = 50;
        } else if (trapType === 4) {
          const f1 = this.platforms.find(p => p.id === "fake1");
          const f2 = this.platforms.find(p => p.id === "fake2");
          if (player.y <= 165 && player.x > 200 && f1) f1.y += 12;
          if (player.y <= 125 && player.x > 340 && f2) f2.y += 12;
        } else {
          this.invertActive = (player.x > 220 && player.x < 430);
        }
      }
    };

    levels.push(levelObj);
  }
  return levels;
}

const LEVELS = generate100Levels();


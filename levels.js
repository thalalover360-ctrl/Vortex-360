// Complete 100 Levels Generator for Vortex-360
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
    let door = { x: 740, y: 150, w: 32, h: 50, originalX: 740 };
    let invertActive = false;

    if (trapType === 1) {
      // Fake Floor Trap
      platforms = [
        { x: 0, y: 200, w: 400, h: 40 },
        { x: 400, y: 200, w: 180, h: 40, id: "pitfall" },
        { x: 580, y: 200, w: 260, h: 40 }
      ];
    } else if (trapType === 2) {
      // Ceiling Hazard Trap
      platforms = [{ x: 0, y: 200, w: 840, h: 40 }];
      hazards = [{ x: 380 + (i % 4) * 30, y: -40, w: 26, h: 26, id: "skySpike" }];
    } else if (trapType === 3) {
      // Coward Door
      platforms = [{ x: 0, y: 200, w: 840, h: 40 }];
      door.x = 680;
      door.originalX = 680;
    } else if (trapType === 4) {
      // Multi-Platform Faith Jump
      platforms = [
        { x: 0, y: 200, w: 180, h: 40 },
        { x: 260, y: 160, w: 90, h: 20, id: "fake1" },
        { x: 440, y: 120, w: 90, h: 20, id: "fake2" },
        { x: 640, y: 140, w: 200, h: 100 }
      ];
      hazards = [{ x: 180, y: 220, w: 460, h: 20 }];
      door.y = 90;
    } else {
      // Brain Rot / Inverted controls mid gap
      platforms = [
        { x: 0, y: 200, w: 320, h: 40 },
        { x: 480, y: 200, w: 360, h: 40 }
      ];
      hazards = [{ x: 320, y: 220, w: 160, h: 20 }];
    }

    // Dynamic Script per Level
    const levelObj = {
      id: i,
      name: name,
      spawn: { x: 60, y: 150 },
      door: door,
      platforms: platforms,
      hazards: hazards,
      invertActive: false,
      update: function(player, input) {
        if (trapType === 1) {
          const pit = this.platforms.find(p => p.id === "pitfall");
          if (player.x > 340 && pit) pit.y += 12;
        } else if (trapType === 2) {
          const spike = this.hazards.find(h => h.id === "skySpike");
          if (player.x > 300 && spike) spike.y += 15;
        } else if (trapType === 3) {
          if (player.x > this.door.x - 90 && this.door.x < 760) this.door.x += 6;
          if (this.door.x >= 760 && player.x > 620) this.door.x = 60;
        } else if (trapType === 4) {
          const f1 = this.platforms.find(p => p.id === "fake1");
          const f2 = this.platforms.find(p => p.id === "fake2");
          if (player.y <= 160 && player.x > 250 && f1) f1.y += 10;
          if (player.y <= 120 && player.x > 430 && f2) f2.y += 10;
        } else {
          this.invertActive = (player.x > 280 && player.x < 500);
        }
      }
    };

    levels.push(levelObj);
  }
  return levels;
}

const LEVELS = generate100Levels();

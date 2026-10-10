// 100 Balanced Levels for Vortex-360 (Beat-able Troll Traps)
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
      // Level 1 Style: Fake Floor Trap
      platforms = [
        { x: 0, y: 210, w: 310, h: 48 },
        { x: 310, y: 210, w: 150, h: 48, id: "pitfall" },
        { x: 460, y: 210, w: 260, h: 48 }
      ];
    } else if (trapType === 2) {
      // Level 2 Style: Ceiling Falling Hazard
      platforms = [{ x: 0, y: 210, w: 720, h: 48 }];
      hazards = [{ x: 320 + (i % 3) * 35, y: -50, w: 34, h: 34, id: "skySpike" }];
    } else if (trapType === 3) {
      // Level 3 Style: Coward Door
      platforms = [{ x: 0, y: 210, w: 720, h: 48 }];
      door.x = 560;
      door.originalX = 560;
    } else if (trapType === 4) {
      // Level 4 Style: Leap of Faith (Fixed & Beatable!)
      // Pehla chhota step girta hai, doosra solid rehta hai taaki jump lag sake!
      platforms = [
        { x: 0, y: 210, w: 160, h: 48 },
        { x: 230, y: 180, w: 90, h: 24, id: "fake1" },  // Bait platform (drops slightly later)
        { x: 380, y: 160, w: 100, h: 24 },              // Solid real platform!
        { x: 530, y: 170, w: 190, h: 90 }               // End platform
      ];
      hazards = [
        { x: 160, y: 235, w: 370, h: 24 }               // Floor Spikes below
      ];
      door = { x: 620, y: 110, w: 38, h: 60, originalX: 620 };
    } else {
      // Level 5 Style: Brain Rot / Inverted Controls Gap
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
          // Trap 4: Fake1 thoda delay ke baad drop hota hai, player ke paas koodne ka waqt hota hai
          const f1 = this.platforms.find(p => p.id === "fake1");
          if (player.x > 230 && f1 && player.isGrounded) {
            f1.y += 6;
          }
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


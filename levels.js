const LEVELS = [
  // LEVEL 1: The Fake Floor
  {
    id: 1,
    name: "Watch Your Step",
    spawn: { x: 60, y: 150 },
    door: { x: 740, y: 150, w: 32, h: 50, originalX: 740 },
    platforms: [
      { x: 0, y: 200, w: 420, h: 40 },
      { x: 420, y: 200, w: 160, h: 40, id: "pitfall" },
      { x: 580, y: 200, w: 260, h: 40 }
    ],
    hazards: [],
    update: function(player) {
      const pit = this.platforms.find(p => p.id === "pitfall");
      if (player.x > 360 && pit) {
        pit.y += 12;
      }
    }
  },

  // LEVEL 2: Ceiling Ambush
  {
    id: 2,
    name: "Look Above",
    spawn: { x: 60, y: 150 },
    door: { x: 740, y: 150, w: 32, h: 50, originalX: 740 },
    platforms: [
      { x: 0, y: 200, w: 840, h: 40 }
    ],
    hazards: [
      { x: 420, y: -40, w: 26, h: 26, id: "skySpike" }
    ],
    update: function(player) {
      const spike = this.hazards.find(h => h.id === "skySpike");
      if (player.x > 340 && spike) {
        spike.y += 14;
      }
    }
  },

  // LEVEL 3: The Coward Door
  {
    id: 3,
    name: "Catch Me If You Can",
    spawn: { x: 60, y: 150 },
    door: { x: 680, y: 150, w: 32, h: 50, originalX: 680 },
    platforms: [
      { x: 0, y: 200, w: 840, h: 40 }
    ],
    hazards: [],
    update: function(player) {
      if (player.x > this.door.x - 100 && this.door.x < 760) {
        this.door.x += 6;
      }
      if (this.door.x >= 760 && player.x > 620) {
        this.door.x = 60;
      }
    }
  },

  // LEVEL 4: Leap of Faith
  {
    id: 4,
    name: "Don't Trust Platforms",
    spawn: { x: 60, y: 150 },
    door: { x: 740, y: 90, w: 32, h: 50, originalX: 740 },
    platforms: [
      { x: 0, y: 200, w: 180, h: 40 },
      { x: 260, y: 160, w: 90, h: 20, id: "fake1" },
      { x: 440, y: 120, w: 90, h: 20, id: "fake2" },
      { x: 640, y: 140, w: 200, h: 100 }
    ],
    hazards: [
      { x: 180, y: 220, w: 460, h: 20 }
    ],
    update: function(player) {
      const f1 = this.platforms.find(p => p.id === "fake1");
      const f2 = this.platforms.find(p => p.id === "fake2");
      if (player.y <= 160 && player.x > 250 && f1) f1.y += 10;
      if (player.y <= 120 && player.x > 430 && f2) f2.y += 10;
    }
  },

  // LEVEL 5: Inverted Reality
  {
    id: 5,
    name: "Brain Rot",
    spawn: { x: 60, y: 150 },
    door: { x: 740, y: 150, w: 32, h: 50, originalX: 740 },
    platforms: [
      { x: 0, y: 200, w: 300, h: 40 },
      { x: 500, y: 200, w: 340, h: 40 }
    ],
    hazards: [
      { x: 300, y: 220, w: 200, h: 20 }
    ],
    invertActive: false,
    update: function(player, input) {
      if (player.x > 280 && player.x < 520) {
        this.invertActive = true;
      } else {
        this.invertActive = false;
      }
    }
  }
];


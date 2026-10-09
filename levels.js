const LEVELS = [
  // LEVEL 1: The Fake Floor (Door ke paas aate hi floor girta hai)
  {
    id: 1,
    name: "Watch Your Step",
    spawn: { x: 50, y: 320 },
    door: { x: 720, y: 300, w: 32, h: 50, originalX: 720 },
    platforms: [
      { x: 0, y: 350, w: 450, h: 50 },
      { x: 450, y: 350, w: 150, h: 50, id: "pitfall" }, // Trap piece
      { x: 600, y: 350, w: 200, h: 50 }
    ],
    hazards: [],
    update: function(player) {
      const pit = this.platforms.find(p => p.id === "pitfall");
      if (player.x > 380 && pit) {
        pit.y += 12; // Zameen gayab!
      }
    }
  },

  // LEVEL 2: Ceiling Ambush (Aage badho toh upar se spike tapakti hai)
  {
    id: 2,
    name: "Look Above",
    spawn: { x: 50, y: 320 },
    door: { x: 720, y: 300, w: 32, h: 50, originalX: 720 },
    platforms: [
      { x: 0, y: 350, w: 800, h: 50 }
    ],
    hazards: [
      { x: 420, y: -40, w: 26, h: 26, id: "skySpike" }
    ],
    update: function(player) {
      const spike = this.hazards.find(h => h.id === "skySpike");
      if (player.x > 340 && spike) {
        spike.y += 14; // Fast drop
      }
    }
  },

  // LEVEL 3: The Coward Door (Door bhaag jaata hai)
  {
    id: 3,
    name: "Catch Me If You Can",
    spawn: { x: 50, y: 320 },
    door: { x: 650, y: 300, w: 32, h: 50, originalX: 650 },
    platforms: [
      { x: 0, y: 350, w: 800, h: 50 }
    ],
    hazards: [],
    update: function(player) {
      // Player paas aaya toh door piche shift ho jata hai
      if (player.x > this.door.x - 100 && this.door.x < 740) {
        this.door.x += 6;
      }
      // Extreme corner me phunchte hi door spawn point par teleport
      if (this.door.x >= 740 && player.x > 620) {
        this.door.x = 60;
      }
    }
  },

  // LEVEL 4: Leap of Faith (Platform jump karte hi gayab)
  {
    id: 4,
    name: "Don't Trust Platforms",
    spawn: { x: 50, y: 320 },
    door: { x: 720, y: 180, w: 32, h: 50, originalX: 720 },
    platforms: [
      { x: 0, y: 350, w: 180, h: 50 },
      { x: 260, y: 290, w: 100, h: 20, id: "fake1" },
      { x: 440, y: 240, w: 100, h: 20, id: "fake2" },
      { x: 650, y: 230, w: 150, h: 170 }
    ],
    hazards: [
      { x: 180, y: 380, w: 470, h: 20 } // Floor spikes
    ],
    update: function(player) {
      const f1 = this.platforms.find(p => p.id === "fake1");
      const f2 = this.platforms.find(p => p.id === "fake2");
      // Touch hote hi platform drop
      if (player.y <= 290 && player.x > 250 && f1) f1.y += 10;
      if (player.y <= 240 && player.x > 430 && f2) f2.y += 10;
    }
  },

  // LEVEL 5: Inverted Reality (Controls ulte ho jaate hain mid-air)
  {
    id: 5,
    name: "Brain Rot",
    spawn: { x: 50, y: 320 },
    door: { x: 720, y: 300, w: 32, h: 50, originalX: 720 },
    platforms: [
      { x: 0, y: 350, w: 320, h: 50 },
      { x: 480, y: 350, w: 320, h: 50 }
    ],
    hazards: [
      { x: 320, y: 380, w: 160, h: 20 }
    ],
    invertActive: false,
    update: function(player, input) {
      // Khai cross karte waqt controls invert
      if (player.x > 300 && player.x < 500) {
        this.invertActive = true;
      } else {
        this.invertActive = false;
      }
    }
  }
];

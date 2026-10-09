// Game Engine for Vortex-360
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const levelTitleEl = document.getElementById('level-title');
const deathCounterEl = document.getElementById('death-counter');

// Set virtual coordinate space
canvas.width = 800;
canvas.height = 400;

let currentLevelIdx = 0;
let deathCount = 0;
let activeLevel = null;

const player = new Player();

const rawInput = { left: false, right: false, jump: false };
const effectiveInput = { left: false, right: false, jump: false };

// Touch Input Handlers
function setupTouchButton(id, key) {
  const el = document.getElementById(id);
  if (!el) return;
  
  el.addEventListener('touchstart', (e) => {
    e.preventDefault();
    rawInput[key] = true;
  });
  el.addEventListener('touchend', (e) => {
    e.preventDefault();
    rawInput[key] = false;
  });
}

setupTouchButton('btn-left', 'left');
setupTouchButton('btn-right', 'right');
setupTouchButton('btn-jump', 'jump');

// Keyboard Handlers (for testing)
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') rawInput.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd') rawInput.right = true;
  if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') rawInput.jump = true;
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') rawInput.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd') rawInput.right = false;
  if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') rawInput.jump = false;
});

function loadLevel(idx) {
  currentLevelIdx = idx;
  // Deep clone level state so reset works properly
  const template = LEVELS[currentLevelIdx];
  activeLevel = {
    ...template,
    door: { ...template.door },
    platforms: template.platforms.map(p => ({ ...p })),
    hazards: template.hazards.map(h => ({ ...h }))
  };

  levelTitleEl.innerText = `Level ${activeLevel.id}: ${activeLevel.name}`;
  player.reset(activeLevel.spawn.x, activeLevel.spawn.y);
}

function handleDeath() {
  deathCount++;
  deathCounterEl.innerText = `Deaths: ${deathCount}`;
  loadLevel(currentLevelIdx);
}

function checkOverlap(r1, r2) {
  return (
    r1.x < r2.x + r2.w &&
    r1.x + (r1.width || r1.w) > r2.x &&
    r1.y < r2.y + r2.h &&
    r1.y + (r1.height || r1.h) > r2.y
  );
}

function gameLoop() {
  // Check for Inverted controls trap (Level 5)
  if (activeLevel.invertActive) {
    effectiveInput.left = rawInput.right;
    effectiveInput.right = rawInput.left;
  } else {
    effectiveInput.left = rawInput.left;
    effectiveInput.right = rawInput.right;
  }
  effectiveInput.jump = rawInput.jump;

  // Run level specific trap scripts
  if (activeLevel.update) {
    activeLevel.update(player, effectiveInput);
  }

  // Update Player Physics
  player.update(effectiveInput, activeLevel.platforms);

  // Check Hazard Collision
  for (const h of activeLevel.hazards) {
    if (checkOverlap(player, h)) {
      handleDeath();
      requestAnimationFrame(gameLoop);
      return;
    }
  }

  // Check Fall Out of World
  if (player.y > canvas.height + 50) {
    handleDeath();
    requestAnimationFrame(gameLoop);
    return;
  }

  // Check Level Win (Reach Door)
  if (checkOverlap(player, activeLevel.door)) {
    if (currentLevelIdx + 1 < LEVELS.length) {
      loadLevel(currentLevelIdx + 1);
    } else {
      levelTitleEl.innerText = "GG! ALL LEVELS CLEARED!";
    }
  }

  // RENDER PASS
  ctx.fillStyle = '#1f2833';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Platforms
  ctx.fillStyle = '#45a29e';
  for (const p of activeLevel.platforms) {
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }

  // Draw Spikes / Hazards
  ctx.fillStyle = '#ff0055';
  for (const h of activeLevel.hazards) {
    ctx.beginPath();
    ctx.moveTo(h.x, h.y + h.h);
    ctx.lineTo(h.x + h.w / 2, h.y);
    ctx.lineTo(h.x + h.w, h.y + h.h);
    ctx.fill();
  }

  // Draw Door
  const d = activeLevel.door;
  ctx.fillStyle = '#66fcf1';
  ctx.fillRect(d.x, d.y, d.w, d.h);
  // Door Knob
  ctx.fillStyle = '#0b0c10';
  ctx.beginPath();
  ctx.arc(d.x + 6, d.y + d.h / 2, 3, 0, Math.PI * 2);
  ctx.fill();

  // Draw Player
  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

// Start Game
loadLevel(0);
requestAnimationFrame(gameLoop);


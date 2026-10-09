// Game Engine for Vortex-360 (Vibrant & Landscape Edition)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const levelTitleEl = document.getElementById('level-title');
const deathCounterEl = document.getElementById('death-counter');

// Native 16:9 widescreen canvas resolution
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

// Keyboard Handlers
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
  if (activeLevel.invertActive) {
    effectiveInput.left = rawInput.right;
    effectiveInput.right = rawInput.left;
  } else {
    effectiveInput.left = rawInput.left;
    effectiveInput.right = rawInput.right;
  }
  effectiveInput.jump = rawInput.jump;

  if (activeLevel.update) {
    activeLevel.update(player, effectiveInput);
  }

  player.update(effectiveInput, activeLevel.platforms);

  // Hazard Collision
  for (const h of activeLevel.hazards) {
    if (checkOverlap(player, h)) {
      handleDeath();
      requestAnimationFrame(gameLoop);
      return;
    }
  }

  // Fall Out of World
  if (player.y > canvas.height + 50) {
    handleDeath();
    requestAnimationFrame(gameLoop);
    return;
  }

  // Victory Check
  if (checkOverlap(player, activeLevel.door)) {
    if (currentLevelIdx + 1 < LEVELS.length) {
      loadLevel(currentLevelIdx + 1);
    } else {
      levelTitleEl.innerText = "GG! SAB LEVELS PAR KAR LIYE! 👑";
    }
  }

  // 1. Background Grid & Space effect
  ctx.fillStyle = '#0f0a1c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // 2. Neon Platforms
  for (const p of activeLevel.platforms) {
    ctx.fillStyle = '#2d1b4e';
    ctx.fillRect(p.x, p.y, p.w, p.h);

    // Glowing Top Border
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(p.x, p.y, p.w, 4);
  }

  // 3. Red Hazard Spikes
  for (const h of activeLevel.hazards) {
    ctx.fillStyle = '#ff0055';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#ff0055';

    ctx.beginPath();
    ctx.moveTo(h.x, h.y + h.h);
    ctx.lineTo(h.x + h.w / 2, h.y);
    ctx.lineTo(h.x + h.w, h.y + h.h);
    ctx.fill();

    ctx.shadowBlur = 0;
  }

  // 4. Glowing Exit Portal / Door
  const d = activeLevel.door;
  ctx.fillStyle = '#00f0ff';
  ctx.shadowBlur = 18;
  ctx.shadowColor = '#00f0ff';
  ctx.fillRect(d.x, d.y, d.w, d.h);

  ctx.fillStyle = '#0a0614';
  ctx.fillRect(d.x + 4, d.y + 4, d.w - 8, d.h - 8);

  ctx.fillStyle = '#00f0ff';
  ctx.beginPath();
  ctx.arc(d.x + d.w - 8, d.y + d.h / 2, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // 5. Draw Human Character
  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

// Start Engine
loadLevel(0);
requestAnimationFrame(gameLoop);


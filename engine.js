// Game Engine with Zoomed Virtual Resolution (720x340)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const container = document.getElementById('canvas-wrap');
const levelTitleEl = document.getElementById('level-title');
const deathCounterEl = document.getElementById('death-counter');

// Home Screen Elements
const homeScreen = document.getElementById('home-screen');
const btnStartGame = document.getElementById('btn-start-game');
const btnHomeLevels = document.getElementById('btn-home-levels');
const btnHome = document.getElementById('btn-home');

// Modals & UI Elements
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalStats = document.getElementById('modal-stats');
const btnNextLevel = document.getElementById('btn-next-level');
const btnReplayLevel = document.getElementById('btn-replay-level');

const levelSelectModal = document.getElementById('level-select-modal');
const levelGrid = document.getElementById('level-grid');
const btnMenu = document.getElementById('btn-menu');
const btnRestart = document.getElementById('btn-restart');
const btnCloseMenu = document.getElementById('btn-close-menu');

// Scaled Up Virtual Viewport
const GAME_W = 720;
const GAME_H = 340;
canvas.width = GAME_W;
canvas.height = GAME_H;

function resizeCanvas() {
  if (!container) return;
  const availW = container.clientWidth || window.innerWidth;
  const availH = container.clientHeight || window.innerHeight;
  const scale = Math.min(availW / GAME_W, availH / GAME_H);

  canvas.style.width = `${Math.floor(GAME_W * scale)}px`;
  canvas.style.height = `${Math.floor(GAME_H * scale)}px`;
}
window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 150));
resizeCanvas();

// Safe helper to get the levels catalog
function getLevelsList() {
  if (typeof levels !== 'undefined' && Array.isArray(levels)) return levels;
  if (typeof LEVELS !== 'undefined' && Array.isArray(LEVELS)) return LEVELS;
  if (window.levels && Array.isArray(window.levels)) return window.levels;
  if (window.LEVELS && Array.isArray(window.LEVELS)) return window.LEVELS;
  return [];
}

// Save Progress
let unlockedLevel = parseInt(localStorage.getItem('vortex_unlocked_lvl')) || 1;
let currentLevelIdx = 0;
let totalDeaths = 0;
let levelDeaths = 0;
let activeLevel = null;
let isLevelPaused = true;

const player = new Player();

const rawInput = { left: false, right: false, jump: false };
const effectiveInput = { left: false, right: false, jump: false };

// Touch Input Handlers
function setupTouchButton(id, key) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('touchstart', (e) => { e.preventDefault(); rawInput[key] = true; }, { passive: false });
  el.addEventListener('touchend', (e) => { e.preventDefault(); rawInput[key] = false; }, { passive: false });
}

setupTouchButton('btn-left', 'left');
setupTouchButton('btn-right', 'right');
setupTouchButton('btn-jump', 'jump');

// Keyboard Controls
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

// Home Listeners
if (btnStartGame) {
  btnStartGame.onclick = () => {
    if (homeScreen) homeScreen.classList.add('hidden');
    isLevelPaused = false;
    resizeCanvas();
    loadLevel(unlockedLevel - 1);
  };
}

if (btnHomeLevels) btnHomeLevels.onclick = () => openLevelSelector();

if (btnHome) {
  btnHome.onclick = () => {
    isLevelPaused = true;
    if (homeScreen) homeScreen.classList.remove('hidden');
    if (levelSelectModal) levelSelectModal.classList.add('hidden');
    if (modalOverlay) modalOverlay.classList.add('hidden');
  };
}

if (btnMenu) btnMenu.onclick = () => openLevelSelector();
if (btnCloseMenu) btnCloseMenu.onclick = () => levelSelectModal.classList.add('hidden');
if (btnRestart) btnRestart.onclick = () => loadLevel(currentLevelIdx);
if (btnReplayLevel) btnReplayLevel.onclick = () => loadLevel(currentLevelIdx);

function renderLevelGrid() {
  if (!levelGrid) return;
  levelGrid.innerHTML = '';
  for (let i = 1; i <= 100; i++) {
    const node = document.createElement('div');
    node.className = 'level-node';
    node.innerText = i;

    if (i < unlockedLevel) {
      node.classList.add('cleared');
      node.onclick = () => { 
        loadLevel(i - 1); 
        levelSelectModal.classList.add('hidden'); 
        if (homeScreen) homeScreen.classList.add('hidden'); 
      };
    } else if (i === unlockedLevel) {
      node.classList.add('unlocked');
      node.onclick = () => { 
        loadLevel(i - 1); 
        levelSelectModal.classList.add('hidden'); 
        if (homeScreen) homeScreen.classList.add('hidden'); 
      };
    }

    if (i - 1 === currentLevelIdx) {
      node.classList.add('active-level');
    }

    levelGrid.appendChild(node);
  }
}

function openLevelSelector() {
  renderLevelGrid();
  if (levelSelectModal) levelSelectModal.classList.remove('hidden');
}

function loadLevel(idx) {
  const allLevels = getLevelsList();
  currentLevelIdx = idx;
  levelDeaths = 0;
  isLevelPaused = false;
  if (modalOverlay) modalOverlay.classList.add('hidden');

  const template = allLevels[currentLevelIdx];
  if (!template) return;

  activeLevel = {
    ...template,
    door: template.door ? { ...template.door } : { x: 640, y: 160, w: 36, h: 60 },
    platforms: (template.platforms || []).map(p => ({ ...p })),
    hazards: (template.hazards || []).map(h => ({ ...h }))
  };

  if (levelTitleEl) {
    levelTitleEl.innerText = `Level ${activeLevel.id}: ${activeLevel.name}`;
  }
  if (activeLevel.spawn && player.reset) {
    player.reset(activeLevel.spawn.x, activeLevel.spawn.y);
  }
}

function handleDeath() {
  totalDeaths++;
  levelDeaths++;
  if (deathCounterEl) deathCounterEl.innerText = `Deaths: ${totalDeaths}`;
  loadLevel(currentLevelIdx);
}

function showLevelCompleteModal() {
  const allLevels = getLevelsList();
  isLevelPaused = true;
  if (modalTitle) modalTitle.innerText = `${activeLevel.name} Cleared!`;
  if (modalStats) modalStats.innerText = `Deaths: ${levelDeaths} | Total Deaths: ${totalDeaths}`;

  if (activeLevel && activeLevel.id >= unlockedLevel) {
    unlockedLevel = activeLevel.id + 1;
    localStorage.setItem('vortex_unlocked_lvl', unlockedLevel);
  }

  if (btnNextLevel) {
    if (currentLevelIdx + 1 < allLevels.length) {
      btnNextLevel.innerText = "NEXT LEVEL ▶";
      btnNextLevel.onclick = () => loadLevel(currentLevelIdx + 1);
    } else {
      btnNextLevel.innerText = "ALL 100 CLEARED! 👑";
      btnNextLevel.onclick = () => openLevelSelector();
    }
  }

  if (modalOverlay) modalOverlay.classList.remove('hidden');
}

function checkOverlap(r1, r2) {
  if (!r1 || !r2) return false;
  const w1 = r1.width || r1.w || 20;
  const h1 = r1.height || r1.h || 20;
  const w2 = r2.w || r2.width || 0;
  const h2 = r2.h || r2.height || 0;

  return (
    r1.x < r2.x + w2 &&
    r1.x + w1 > r2.x &&
    r1.y < r2.y + h2 &&
    r1.y + h1 > r2.y
  );
}

function gameLoop() {
  if (!isLevelPaused && activeLevel) {
    if (activeLevel.invertActive) {
      effectiveInput.left = rawInput.right;
      effectiveInput.right = rawInput.left;
    } else {
      effectiveInput.left = rawInput.left;
      effectiveInput.right = rawInput.right;
    }
    effectiveInput.jump = rawInput.jump;

    if (typeof activeLevel.update === 'function') {
      try {
        activeLevel.update(player, effectiveInput);
      } catch (err) {
        // Safe catch to prevent loop termination
      }
    }

    if (player.update) {
      player.update(effectiveInput, activeLevel.platforms);
    }

    if (Array.isArray(activeLevel.hazards)) {
      for (const h of activeLevel.hazards) {
        if (checkOverlap(player, h)) {
          handleDeath();
          requestAnimationFrame(gameLoop);
          return;
        }
      }
    }

    if (player.y > canvas.height + 60) {
      handleDeath();
      requestAnimationFrame(gameLoop);
      return;
    }

    if (activeLevel.door && checkOverlap(player, activeLevel.door)) {
      showLevelCompleteModal();
    }
  }

  // Draw Pass
  ctx.fillStyle = '#0f0a1c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Background Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  if (activeLevel) {
    // Platforms
    if (Array.isArray(activeLevel.platforms)) {
      for (const p of activeLevel.platforms) {
        if (!p.hidden) {
          ctx.fillStyle = '#1c1233';
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.fillStyle = '#a855f7';
          ctx.fillRect(p.x, p.y, p.w, 5);
        }
      }
    }

    // Hazards
    if (Array.isArray(activeLevel.hazards)) {
      for (const h of activeLevel.hazards) {
        ctx.fillStyle = '#ff0055';
        ctx.beginPath();
        ctx.moveTo(h.x, h.y + h.h);
        ctx.lineTo(h.x + h.w / 2, h.y);
        ctx.lineTo(h.x + h.w, h.y + h.h);
        ctx.fill();
      }
    }

    // Door
    if (activeLevel.door) {
      const d = activeLevel.door;
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(d.x, d.y, d.w, d.h);
      ctx.fillStyle = '#0f0a1c';
      ctx.fillRect(d.x + 4, d.y + 4, d.w - 8, d.h - 8);
    }

    // Player
    if (player.draw) {
      player.draw(ctx);
    }
  }

  requestAnimationFrame(gameLoop);
}

// Initial Level Boot
loadLevel(0);
isLevelPaused = true;
requestAnimationFrame(gameLoop);


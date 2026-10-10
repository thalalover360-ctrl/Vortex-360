// Game Engine with Home Screen, 100-Level Menu & Trap System
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
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

canvas.width = 960;
canvas.height = 450;

// Save Progress
let unlockedLevel = parseInt(localStorage.getItem('vortex_unlocked_lvl')) || 1;
let currentLevelIdx = 0;
let totalDeaths = 0;
let levelDeaths = 0;
let activeLevel = null;
let isLevelPaused = true; // Paused at Start Screen

const player = new Player();

const rawInput = { left: false, right: false, jump: false };
const effectiveInput = { left: false, right: false, jump: false };

// Touch Input Handlers
function setupTouchButton(id, key) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('touchstart', (e) => { e.preventDefault(); rawInput[key] = true; });
  el.addEventListener('touchend', (e) => { e.preventDefault(); rawInput[key] = false; });
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

// Home Screen Listeners
btnStartGame.onclick = () => {
  homeScreen.classList.add('hidden');
  isLevelPaused = false;
  loadLevel(unlockedLevel - 1);
};

btnHomeLevels.onclick = () => {
  openLevelSelector();
};

btnHome.onclick = () => {
  isLevelPaused = true;
  homeScreen.classList.remove('hidden');
  levelSelectModal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
};

// UI Menu Listeners
btnMenu.onclick = () => openLevelSelector();
btnCloseMenu.onclick = () => levelSelectModal.classList.add('hidden');
btnRestart.onclick = () => loadLevel(currentLevelIdx);
btnReplayLevel.onclick = () => loadLevel(currentLevelIdx);

function renderLevelGrid() {
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
        homeScreen.classList.add('hidden'); 
      };
    } else if (i === unlockedLevel) {
      node.classList.add('unlocked');
      node.onclick = () => { 
        loadLevel(i - 1); 
        levelSelectModal.classList.add('hidden'); 
        homeScreen.classList.add('hidden'); 
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
  levelSelectModal.classList.remove('hidden');
}

function loadLevel(idx) {
  currentLevelIdx = idx;
  levelDeaths = 0;
  isLevelPaused = false;
  modalOverlay.classList.add('hidden');

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
  totalDeaths++;
  levelDeaths++;
  deathCounterEl.innerText = `Deaths: ${totalDeaths}`;
  loadLevel(currentLevelIdx);
}

function showLevelCompleteModal() {
  isLevelPaused = true;
  modalTitle.innerText = `${activeLevel.name} Cleared!`;
  modalStats.innerText = `Deaths on this level: ${levelDeaths} | Total Deaths: ${totalDeaths}`;

  if (activeLevel.id >= unlockedLevel) {
    unlockedLevel = activeLevel.id + 1;
    localStorage.setItem('vortex_unlocked_lvl', unlockedLevel);
  }

  if (currentLevelIdx + 1 < LEVELS.length) {
    btnNextLevel.innerText = "NEXT LEVEL ▶";
    btnNextLevel.onclick = () => loadLevel(currentLevelIdx + 1);
  } else {
    btnNextLevel.innerText = "COMPLETED 100! 👑";
    btnNextLevel.onclick = () => openLevelSelector();
  }

  modalOverlay.classList.remove('hidden');
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
  if (!isLevelPaused && activeLevel) {
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

    for (const h of activeLevel.hazards) {
      if (checkOverlap(player, h)) {
        handleDeath();
        requestAnimationFrame(gameLoop);
        return;
      }
    }

    if (player.y > canvas.height + 50) {
      handleDeath();
      requestAnimationFrame(gameLoop);
      return;
    }

    if (checkOverlap(player, activeLevel.door)) {
      showLevelCompleteModal();
    }
  }

  // Draw Pass
  ctx.fillStyle = '#0f0a1c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  if (activeLevel) {
    // Platforms
    for (const p of activeLevel.platforms) {
      ctx.fillStyle = '#22163b';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(p.x, p.y, p.w, 4);
    }

    // Hazards
    for (const h of activeLevel.hazards) {
      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.moveTo(h.x, h.y + h.h);
      ctx.lineTo(h.x + h.w / 2, h.y);
      ctx.lineTo(h.x + h.w, h.y + h.h);
      ctx.fill();
    }

    // Door
    const d = activeLevel.door;
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(d.x, d.y, d.w, d.h);
    ctx.fillStyle = '#0f0a1c';
    ctx.fillRect(d.x + 3, d.y + 3, d.w - 6, d.h - 6);

    // Player
    player.draw(ctx);
  }

  requestAnimationFrame(gameLoop);
}

// Start in Home Screen state
loadLevel(0);
isLevelPaused = true;
requestAnimationFrame(gameLoop);


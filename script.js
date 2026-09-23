const CORRECT_ANSWER = "meow"; 

// 1. SET HER NEXT BIRTHDAY DATE HERE
const NEXT_BIRTHDAY = new Date(2026, 8, 24, 0, 0, 0); 

// Polaroid Data
const memories = [
  { img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400", caption: "Best moments with you ✨" },
  { img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400", caption: "Always making me smile 😄" },
  { img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400", caption: "To more crazy memories! 🥂" }
];
let currentMemIndex = 0;

// ==========================================
// BACKGROUND MUSIC AUTO-PLAY & TOGGLE LOGIC
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
  const bgm = document.getElementById('bgm');
  const label = document.getElementById('musicState');
  
  if (bgm) {
    bgm.volume = 0.5;
    bgm.play().then(() => {
      if (label) label.innerText = "Pause BGM";
    }).catch(error => {
      console.log("Browser blocked autoplay. Waiting for user interaction.");
    });
  }
});

window.addEventListener('click', function playOnFirstInteraction() {
  const bgm = document.getElementById('bgm');
  const label = document.getElementById('musicState');
  if (bgm && bgm.paused) {
    bgm.play().then(() => {
      if (label) label.innerText = "Pause BGM";
      window.removeEventListener('click', playOnFirstInteraction);
    }).catch(e => console.log(e));
  }
}, { once: true });

function toggleMusic() {
  const bgm = document.getElementById('bgm');
  const label = document.getElementById('musicState');
  if (bgm.paused) {
    bgm.play();
    label.innerText = "Pause BGM";
  } else {
    bgm.pause();
    label.innerText = "Play BGM";
  }
}

// Birthday Countdown Logic
function updateTimeCounter() {
  const now = new Date();
  const diff = NEXT_BIRTHDAY - now;
  const counterElem = document.getElementById('timeCounter');

  if (diff <= 0) {
    if (counterElem) {
      counterElem.innerText = "🎉 It's Today! Happy Birthday Meow! 🥳💖";
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (counterElem) {
    counterElem.innerText = `${days} Days, ${hours} Hours, ${minutes} Mins, ${seconds} Secs to go! 🎂✨`;
  }
}
setInterval(updateTimeCounter, 1000);

// Particles
function initParticles() {
  const container = document.getElementById('bgParticles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.innerText = ['🌸', '💖', '✨', '💕'][Math.floor(Math.random() * 4)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDelay = Math.random() * 5 + 's';
    p.style.animationDuration = (Math.random() * 3 + 4) + 's';
    container.appendChild(p);
  }
}
initParticles();

// Navigation
function nextScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  if (screenId === 's7') initCanvas();
}

// Passcode Check
function checkPasscode() {
  const input = document.getElementById('passcodeKey').value.trim().toLowerCase();
  const error = document.getElementById('errorMsg');

  if (input === CORRECT_ANSWER) {
    error.innerText = "";
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    nextScreen('s3');
  } else {
    error.innerText = "Oops! Wrong answer 😜 Try again!";
  }
}

// Open Envelope
function openEnvelope() {
  const wrapper = document.querySelector('.envelope-wrapper');
  const hint = document.getElementById('envHint');
  const btn = document.getElementById('continueBtn');

  if (wrapper.classList.contains('open')) return;

  wrapper.classList.add('open');
  if (hint) hint.style.opacity = '0';

  setTimeout(() => {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    btn.classList.remove('hidden');
  }, 600);
}

// Gallery Next
function nextMemory() {
  currentMemIndex = (currentMemIndex + 1) % memories.length;
  document.getElementById('galleryImg').src = memories[currentMemIndex].img;
  document.getElementById('galleryCaption').innerText = memories[currentMemIndex].caption;
}

// Blow Candle
function blowCandle() {
  const flame = document.getElementById('flame');
  const wishMsg = document.getElementById('wishMsg');
  const drawBtn = document.getElementById('drawBtn');

  if (flame.classList.contains('off')) return;

  flame.classList.add('off');
  confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
  wishMsg.innerText = "🎉 Happy Birthday Vathumiya! May all your wishes come true! 🌸";
  drawBtn.classList.remove('hidden');
}

// Drawing Canvas Engine
let canvas, ctx, isDrawing = false;

function initCanvas() {
  canvas = document.getElementById('paintCanvas');
  ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#d81b60';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);

  canvas.addEventListener('touchstart', (e) => startDrawing(e.touches[0]));
  canvas.addEventListener('touchmove', (e) => draw(e.touches[0]));
  canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  const rect = canvas.getBoundingClientRect();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
}

function stopDrawing() { isDrawing = false; }

function clearCanvas() {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function sendLove() {
  confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
  document.getElementById('sendMsg').innerText = "Love Sent Successfully! 💖 Hugs & Kisses!";
}
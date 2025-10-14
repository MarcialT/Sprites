const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



window.addEventListener('load', () => {
  resizeCanvas();
  loop();
});

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = window.innerWidth;
  const cssHeight = window.innerHeight;

  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  canvas.style.width = cssWidth + 'px';
  canvas.style.height = cssHeight + 'px';

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // usar coordenadas en CSS pixels
}

window.addEventListener('resize', () => {
  clearTimeout(window.__resizeTimeout);
  window.__resizeTimeout = setTimeout(resizeCanvas, 100);
});



const reposo = new Image();
reposo.src = 'Sprites/reposo.png';
let currentImage = reposo;

const derecha = new Image();
derecha.src = 'Sprites/derecha.png';

const izquierda = new Image();
izquierda.src = 'Sprites/izquierda.png';

const arriba = new Image();
arriba.src = 'Sprites/arriba.png';

const ataque = new Image();
ataque.src = 'Sprites/ataque.png';

const keys = new Set();

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault(); // evita scroll de la página
  }
  keys.add(e.key);

  if (keys.has('ArrowLeft')) {
    currentImage = izquierda;
  } else if (keys.has('ArrowRight')) {
    currentImage = derecha;
  } else if (keys.has('ArrowUp')) {
    currentImage = arriba;
  } else if (keys.has('ArrowDown')) {
    currentImage = ataque;
  }
});

window.addEventListener('keyup', (e) => {
  keys.delete(e.key);

  if (keys.has('ArrowLeft')) {
    currentImage = izquierda;
  } else if (keys.has('ArrowRight')) {
    currentImage = derecha;
  } else if (keys.has('ArrowUp')) {
    currentImage = arriba;
  } else if (keys.has('ArrowDown')) {
    currentImage = ataque;
  } else {
    currentImage = reposo;
  }
});

function loop() {
    // limpiar usando coordenadas CSS (ctx ya escaló con setTransform)
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // tamaño deseado: porcentaje del menor lado del canvas
    const size = Math.min(canvas.clientWidth, canvas.clientHeight) * 0.3; // 30% del menor lado
    const x = (canvas.clientWidth - size) / 2;
    const y = (canvas.clientHeight - size) / 2;

    ctx.drawImage(currentImage, x, y, size, size);
    requestAnimationFrame(loop);
}


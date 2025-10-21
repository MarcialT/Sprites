const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Ajustar tamaño del canvas al cargar
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('load', () => {
      resizeCanvas();
      loop();
    });

    window.addEventListener('resize', () => {
      clearTimeout(window.__resizeTimeout);
      window.__resizeTimeout = setTimeout(resizeCanvas, 100);
    });

    // Cargar imágenes
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

    let x = 900; // posición horizontal
    let y = 500; // posición vertical
    const velocidad = 10; // cuántos píxeles se mueve por frame
    const keys = new Set();

    // Detectar teclas presionadas
    window.addEventListener('keydown', (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
      keys.add(e.key);
    });

    window.addEventListener('keyup', (e) => {
      keys.delete(e.key);
    });

    function colisionaRect(px, py, pw, ph, rx, ry, rw, rh) {
  return (
    px < rx + rw &&
    px + pw > rx &&
    py < ry + rh &&
    py + ph > ry
  );
}

    function loop() {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      const rectWidth = 1910;
      const rectHeight = 50;

      const rectX = (canvas.clientWidth - rectWidth) / 2;
      const rectY = (canvas.clientHeight -  rectHeight) / 2 - 75;

      ctx.fillStyle = 'rgba(0, 0, 255, 0)'; // color azul semitransparente
      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

      const stereoWidth = 100;
      const stereoHeight = 140;

      const stereoX = (canvas.clientWidth - stereoWidth) / 2 - 850;
      const stereoY = (canvas.clientHeight - stereoHeight) / 2 + 70;

      ctx.fillStyle = 'rgba(0, 0, 255, 0)'; // color azul semitransparente
      ctx.fillRect(stereoX, stereoY, stereoWidth, stereoHeight);

      const stereo2Width = 100;
      const stereo2Height = 140;

      const stereo2X = (canvas.clientWidth - stereo2Width) / 2 + 850;
      const stereo2Y = (canvas.clientHeight - stereo2Height) / 2 + 70;

      ctx.fillStyle = 'rgba(0, 0, 255, 0)'; // color azul semitransparente
      ctx.fillRect(stereo2X, stereo2Y, stereo2Width, stereo2Height);
      

      const size = 150; // tamaño del personaje
      let moving = false;

      // Movimiento
      if (keys.has('ArrowLeft')) {
        x -= velocidad;
        currentImage = izquierda;
        moving = true;
      }
      if (keys.has('ArrowRight')) {
        x += velocidad;
        currentImage = derecha;
        moving = true;
      }
      if (keys.has('ArrowUp')) {
        const nextY = y - velocidad;
      const personajeDerecha = x + size;
      const personajeIzquierda = x;
      const personajeArriba = nextY;
      const personajeAbajo = nextY + size;

      const rectDerecha = rectX + rectWidth;
      const rectIzquierda = rectX;
      const rectArriba = rectY;
      const rectAbajo = rectY + rectHeight;

  // Si el personaje NO va a chocar, permite el movimiento
  const chocaRectangulo = (
    personajeAbajo > rectArriba &&
    personajeArriba < rectAbajo &&
    personajeDerecha > rectIzquierda &&
    personajeIzquierda < rectDerecha
  );

  if (!chocaRectangulo) {
    y = nextY;
    currentImage = arriba;
    moving = true;
  }
      }
      if (keys.has('ArrowDown')) {
        y += velocidad;
        currentImage = reposo;
        moving = true;
      }

      if (keys.has(' ')) {
        currentImage = ataque;
      }

      if (!moving && !keys.has(' ')) {
        currentImage = reposo;
      }
      
      

      // Evitar que salga del canvas
      x = Math.max(0, Math.min(x, canvas.clientWidth - size));
      y = Math.max(0, Math.min(y, canvas.clientHeight - size));

      ctx.drawImage(currentImage, x, y, size, size);
      requestAnimationFrame(loop);
    }
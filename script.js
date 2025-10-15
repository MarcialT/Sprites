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

    let x = 200; // posición horizontal
    let y = 200; // posición vertical
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

    function loop() {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

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
        y -= velocidad;
        currentImage = arriba;
        moving = true;
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
const mousePressedAll = (s, seeds=1) => () => {
  if (
    s.mouseX > 0 &&
    s.mouseX < s.width &&
    s.mouseY > 0 &&
    s.mouseY < s.height
  ) {
    s.noiseSeed(s.floor(s.random(seeds)));
    s.redraw();
  }
};

const setup1d = (s, w) => () => {
  s.createCanvas(w, w);
  s.noFill();
  s.noLoop();
};

const setup2d = (s, w) => () => {
  s.createCanvas(w, w);
  s.noLoop();
};

const setupGrid = (s, w) => () => {
  s.createCanvas(w, w);
  s.noLoop();
  s.noStroke();
};

const random1d = (cwidth) => {
  return (s) => {
    s.setup = setup1d(s, cwidth);
    s.mousePressed = mousePressedAll(s);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let i = 0; i < s.width / 4; i++) {
        let rDiam = s.random(0, s.width);
        s.ellipse(s.width / 2, s.height / 2, rDiam);
      }
    };
  };
};

const gauss1d = (cwidth) => {
  return (s) => {
    s.setup = setup1d(s, cwidth);
    s.mousePressed = mousePressedAll(s);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let i = 0; i < s.width / 4; i++) {
        let rDiam = s.randomGaussian(0, s.width / 3);
        s.ellipse(s.width / 2, s.height / 2, rDiam);
      }
    };
  };
};

const noise1d = (cwidth) => {
  return (s) => {
    let seeds = [7067, 7031, 1772, 9731, 9622, 7097, 9666, 9688, 9711, 1794, 9710, 9600];
    s.noiseSeed(7067);

    s.setup = setup1d(s, cwidth);
    s.mousePressed = mousePressedAll(s, seeds);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let i = 0; i < s.width / 4; i++) {
        let rDiam = s.width * s.noise(i / 100);
        s.ellipse(s.width / 2, s.height / 2, rDiam);
      }
    };
  };
};

const random2d = (cwidth) => {
  return (s) => {
    s.setup = setup2d(s, cwidth);
    s.mousePressed = mousePressedAll(s);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let i = 0; i < s.width; i++) {
        let rX = s.random(0, s.width);
        let rY = s.random(0, s.height);
        s.ellipse(rX, rY, 16);
      }
    };
  };
};

const gauss2d = (cwidth) => {
  return (s) => {
    s.setup = setup2d(s, cwidth);
    s.mousePressed = mousePressedAll(s);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let i = 0; i < s.width; i++) {
        let rx = s.randomGaussian(s.width / 2, s.width / 6);
        let ry = s.randomGaussian(s.height / 2, s.height / 6);
        s.ellipse(rx, ry, 16);
      }
    };
  };
};

const noise2d = (cwidth) => {
  return (s) => {
    s.setup = setup2d(s, cwidth);
    s.mousePressed = mousePressedAll(s, 10000);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let i = 0; i < s.width; i++) {
        let rx = s.width * s.noise(1010 + i / 100);
        let ry = s.height * s.noise(2020 + i / 100);
        s.ellipse(rx, ry, 16);
      }
    };
  };
};

const randomGrid = (cwidth) => {
  return (s) => {
    let gridW = cwidth / 12;
    s.setup = setupGrid(s, cwidth);
    s.mousePressed = mousePressedAll(s);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let x = gridW / 2; x < s.width + gridW; x += gridW) {
        for (let y = gridW / 2; y < s.height + gridW; y += gridW) {
          let eDiam = s.random(0.2 * gridW, 0.8 * gridW);
          s.ellipse(x, y, eDiam, eDiam);
        }
      }
    };
  };
};

const gaussGrid = (cwidth) => {
  return (s) => {
    let gridW = cwidth / 12;
    s.setup = setupGrid(s, cwidth);
    s.mousePressed = mousePressedAll(s);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let x = gridW / 2; x < s.width + gridW; x += gridW) {
        for (let y = gridW / 2; y < s.height + gridW; y += gridW) {
          let eDiam = s.randomGaussian(0, gridW / 3);
          s.ellipse(x, y, eDiam, eDiam);
        }
      }
    };
  };
};

const noiseGrid = (cwidth) => {
  return (s) => {
    let gridW = cwidth / 12;
    s.setup = setupGrid(s, cwidth);
    s.mousePressed = mousePressedAll(s, 10000);

    s.draw = () => {
      s.background(220, 20, 120);

      for (let x = gridW / 2; x < s.width + gridW; x += gridW) {
        for (let y = gridW / 2; y < s.height + gridW; y += gridW) {
          let eDiam = gridW * s.noise(x / 100, y / 100);
          s.ellipse(x, y, eDiam, eDiam);
        }
      }
    };
  };
};

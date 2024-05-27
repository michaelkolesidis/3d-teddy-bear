// Copyright (c) 2025 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

let ted = (sketch) => {
  let teddy;
  let teddyColor;
  let colored = false;
  let backgroundColor;

  sketch.preload = () => {
    // Load model with normalise parameter set to true will affect translate
    teddy = sketch.loadModel('./assets/teddy.obj', false);
  };

  sketch.setup = () => {
    sketch.createCanvas(window.innerWidth, window.innerHeight, sketch.WEBGL);

    const teddyR = sketch.random(110, 230);
    const teddyG = sketch.random(110, 230);
    const teddyB = sketch.random(110, 230);

    teddyColor = (teddyR, teddyG, teddyB);

    backgroundColor = sketch.color(
      sketch.random(120, 250),
      sketch.random(120, 250),
      sketch.random(120, 250)
    );
  };

  sketch.draw = () => {
    sketch.background(backgroundColor);
    sketch.smooth();
    sketch.noStroke();

    sketch.ambientLight(108, 108, 108);
    sketch.directionalLight(128, 128, 128, 0, 0, -1);
    sketch.ambientMaterial(teddyColor);

    if (colored) {
      sketch.ambientMaterial(teddyColor);
    }

    if (window.innerWidth > 800) {
      // Desktop
      sketch.camera(
        0.1 * (sketch.mouseX - sketch.windowWidth / 2),
        0.2 * (sketch.mouseY - sketch.windowHeight / 2),
        250 + 0.04 * sketch.abs(sketch.mouseX - sketch.windowWidth / 2)
      );

      sketch.rotateX(sketch.PI - sketch.radians(30));
      sketch.rotateY(sketch.PI + sketch.radians(10));

      sketch.translate(0, -50, 40);
    } else {
      // Mobile
      sketch.rotateX(sketch.PI - sketch.radians(30));
      sketch.rotateY(sketch.PI + sketch.radians(10));

      sketch.translate(-20, 0, 200);
      sketch.scale(1.8);
    }

    sketch.model(teddy);
  };

  sketch.colorize = () => {
    teddyColor = sketch.color(
      sketch.random(110, 230),
      sketch.random(110, 230),
      sketch.random(110, 230)
    );
    backgroundColor = sketch.color(
      sketch.random(120, 250),
      sketch.random(120, 250),
      sketch.random(120, 250)
    );
    colored = true;
  };

  sketch.mousePressed = () => {
    sketch.colorize();
  };

  sketch.keyPressed = () => {
    sketch.colorize();
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};

let teddySketch = new p5(ted, 'sketch-placeholder');

import * as THREE from '../third-party/three/three.module.min.js';

(function () {
  'use strict';

  var mount = document.querySelector('[data-price-scene]');
  var hero = document.querySelector('[data-price-hero]');
  if (!mount || !hero) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (reduceMotion) {
    mount.classList.add('is-static');
    return;
  }

  var mobile = window.matchMedia('(max-width: 700px)').matches;
  var constrained = Boolean(connection && connection.saveData) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  var columns = mobile ? 24 : 40;
  var rows = mobile ? 16 : 24;
  if (constrained) {
    columns = mobile ? 18 : 28;
    rows = mobile ? 12 : 18;
  }

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'low-power' });
  } catch (error) {
    mount.classList.add('is-static');
    return;
  }

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
  camera.position.set(0, 1.2, 8.6);
  var count = columns * rows;
  var positions = new Float32Array(count * 3);
  var wavePositions = new Float32Array(count * 3);
  var lanePositions = new Float32Array(count * 3);
  var colors = new Float32Array(count * 3);
  var color = new THREE.Color();

  for (var row = 0; row < rows; row += 1) {
    for (var column = 0; column < columns; column += 1) {
      var index = row * columns + column;
      var i3 = index * 3;
      var x = (column / (columns - 1) - 0.5) * 8.4;
      var z = (row / (rows - 1) - 0.5) * 5.1;
      var y = Math.sin(column * 0.42) * 0.22 + Math.sin(row * 0.48) * 0.18;

      wavePositions[i3] = x;
      wavePositions[i3 + 1] = y - 0.75;
      wavePositions[i3 + 2] = z;

      var lane = row % 3;
      lanePositions[i3] = x * 0.96;
      lanePositions[i3 + 1] = (lane - 1) * 0.56 - 0.76;
      lanePositions[i3 + 2] = z * 0.34;

      positions[i3] = wavePositions[i3];
      positions[i3 + 1] = wavePositions[i3 + 1];
      positions[i3 + 2] = wavePositions[i3 + 2];

      if (index % 29 === 0) color.set('#ff8a55');
      else if (index % 7 === 0) color.set('#b7f36b');
      else color.set('#22d889');
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
  }

  var dot = document.createElement('canvas');
  dot.width = 32;
  dot.height = 32;
  var context = dot.getContext('2d');
  var gradient = context.createRadialGradient(16, 16, 1, 16, 16, 15);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.34, 'rgba(255,255,255,.95)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  var material = new THREE.PointsMaterial({
    size: mobile ? 0.12 : 0.1,
    map: new THREE.CanvasTexture(dot),
    transparent: true,
    opacity: 0.82,
    alphaTest: 0.02,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  });
  var points = new THREE.Points(geometry, material);
  points.rotation.x = -0.55;
  points.rotation.z = -0.06;
  scene.add(points);

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.5));
  renderer.domElement.className = 'price-wave__canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  mount.insertBefore(renderer.domElement, mount.firstChild);

  var pointerX = 0;
  var pointerY = 0;
  var targetX = 0;
  var targetY = 0;
  var scrollProgress = 0;
  var visible = true;
  var pageVisible = !document.hidden;
  var running = false;
  var frameId = 0;
  var lastFrame = 0;
  var frameInterval = constrained ? 1000 / 30 : 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function resize() {
    var rect = mount.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function updateScroll() {
    var rect = hero.getBoundingClientRect();
    scrollProgress = clamp(-rect.top / Math.max(rect.height * 0.72, 1), 0, 1);
  }

  function animate(time) {
    if (!running) return;
    frameId = window.requestAnimationFrame(animate);
    if (frameInterval && time - lastFrame < frameInterval) return;
    lastFrame = time;

    pointerX += (targetX - pointerX) * 0.035;
    pointerY += (targetY - pointerY) * 0.035;
    var blend = THREE.MathUtils.smoothstep(scrollProgress, 0.12, 0.92);
    var position = geometry.attributes.position.array;
    for (var index = 0; index < count; index += 1) {
      var i3 = index * 3;
      var column = index % columns;
      var row = Math.floor(index / columns);
      var ripple = Math.sin(time * 0.0014 + column * 0.43 + row * 0.2) * 0.16 * (1 - blend);
      position[i3] = THREE.MathUtils.lerp(wavePositions[i3], lanePositions[i3], blend);
      position[i3 + 1] = THREE.MathUtils.lerp(wavePositions[i3 + 1] + ripple, lanePositions[i3 + 1], blend);
      position[i3 + 2] = THREE.MathUtils.lerp(wavePositions[i3 + 2], lanePositions[i3 + 2], blend);
    }
    geometry.attributes.position.needsUpdate = true;
    points.rotation.y = pointerX * 0.09;
    points.rotation.x = -0.55 + pointerY * 0.045;
    renderer.render(scene, camera);
    mount.classList.add('is-rendered');
  }

  function start() {
    if (running || !visible || !pageVisible) return;
    running = true;
    frameId = window.requestAnimationFrame(animate);
  }

  function stop() {
    running = false;
    window.cancelAnimationFrame(frameId);
  }

  mount.addEventListener('pointermove', function (event) {
    var rect = mount.getBoundingClientRect();
    targetX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
    targetY = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
  }, { passive: true });
  mount.addEventListener('pointerleave', function () {
    targetX = 0;
    targetY = 0;
  }, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', updateScroll, { passive: true });
  document.addEventListener('visibilitychange', function () {
    pageVisible = !document.hidden;
    if (pageVisible) start(); else stop();
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }, { rootMargin: '100px 0px' });
    observer.observe(mount);
  }

  resize();
  updateScroll();
  start();
})();

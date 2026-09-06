import * as THREE from '../third-party/three/three.module.min.js';

(function () {
  'use strict';

  var hero = document.querySelector('[data-portal-hero]');
  var mount = document.querySelector('[data-portal-scene]');
  if (!hero || !mount) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobileQuery = window.matchMedia('(max-width: 700px)');
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = Boolean(connection && connection.saveData);
  if (reduceMotion || saveData) {
    hero.classList.add('is-portal-static');
    return;
  }

  var mobile = mobileQuery.matches;
  var constrained = Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !mobile, powerPreference: 'high-performance' });
  } catch (error) {
    hero.classList.add('is-portal-static');
    return;
  }

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(mobile ? 50 : 44, 1, 0.1, 70);
  camera.position.set(0, 0, 10.5);
  var portalGroup = new THREE.Group();
  var screenGroup = new THREE.Group();
  scene.add(portalGroup, screenGroup);

  var particleCount = constrained ? (mobile ? 420 : 850) : (mobile ? 680 : 1500);
  var particlePositions = new Float32Array(particleCount * 3);
  var particleColors = new Float32Array(particleCount * 3);
  var particleSeeds = new Float32Array(particleCount);
  var color = new THREE.Color();
  for (var p = 0; p < particleCount; p += 1) {
    var p3 = p * 3;
    var edge = Math.random() > 0.42;
    particlePositions[p3] = edge ? (Math.random() > 0.5 ? 1 : -1) * (2.8 + Math.random() * 3.8) : (Math.random() - 0.5) * 7;
    particlePositions[p3 + 1] = edge ? (Math.random() - 0.5) * 7 : (Math.random() > 0.5 ? 1 : -1) * (2.1 + Math.random() * 2.4);
    particlePositions[p3 + 2] = -24 + Math.random() * 30;
    particleSeeds[p] = Math.random() * Math.PI * 2;
    if (p % 31 === 0) color.set('#ff7043');
    else if (p % 8 === 0) color.set('#c9ff78');
    else color.set('#00e676');
    particleColors[p3] = color.r;
    particleColors[p3 + 1] = color.g;
    particleColors[p3 + 2] = color.b;
  }

  var sprite = document.createElement('canvas');
  sprite.width = 32;
  sprite.height = 32;
  var spriteContext = sprite.getContext('2d');
  var spriteGradient = spriteContext.createRadialGradient(16, 16, 0, 16, 16, 16);
  spriteGradient.addColorStop(0, 'rgba(255,255,255,1)');
  spriteGradient.addColorStop(0.22, 'rgba(255,255,255,.95)');
  spriteGradient.addColorStop(1, 'rgba(255,255,255,0)');
  spriteContext.fillStyle = spriteGradient;
  spriteContext.fillRect(0, 0, 32, 32);

  var particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  var particleMaterial = new THREE.PointsMaterial({
    size: mobile ? 0.14 : 0.11,
    map: new THREE.CanvasTexture(sprite),
    transparent: true,
    opacity: 0.86,
    alphaTest: 0.02,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });
  var particles = new THREE.Points(particleGeometry, particleMaterial);
  portalGroup.add(particles);

  var frameMaterial = new THREE.LineBasicMaterial({ color: 0x75f3ad, transparent: true, opacity: 0.26, blending: THREE.AdditiveBlending });
  var frames = [];
  for (var frameIndex = 0; frameIndex < (mobile ? 8 : 12); frameIndex += 1) {
    var width = mobile ? 5.5 : 8.4;
    var height = mobile ? 8.8 : 5.6;
    var frameGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-width / 2, -height / 2, 0), new THREE.Vector3(width / 2, -height / 2, 0),
      new THREE.Vector3(width / 2, -height / 2, 0), new THREE.Vector3(width / 2, height / 2, 0),
      new THREE.Vector3(width / 2, height / 2, 0), new THREE.Vector3(-width / 2, height / 2, 0),
      new THREE.Vector3(-width / 2, height / 2, 0), new THREE.Vector3(-width / 2, -height / 2, 0)
    ]);
    var frame = new THREE.LineSegments(frameGeometry, frameMaterial);
    frame.userData.baseZ = 4 - frameIndex * 2.5;
    frame.position.z = frame.userData.baseZ;
    portalGroup.add(frame);
    frames.push(frame);
  }

  var barCount = mobile ? 72 : 140;
  var barGeometry = new THREE.BoxGeometry(0.035, 1, 0.035);
  var barMaterial = new THREE.MeshBasicMaterial({ color: 0x9dffc3, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
  var bars = new THREE.InstancedMesh(barGeometry, barMaterial, barCount);
  var matrix = new THREE.Matrix4();
  var quaternion = new THREE.Quaternion();
  var scale = new THREE.Vector3();
  var position = new THREE.Vector3();
  for (var barIndex = 0; barIndex < barCount; barIndex += 1) {
    var side = barIndex % 4;
    var depth = -20 + Math.random() * 25;
    var spreadX = mobile ? 2.75 : 4.25;
    var spreadY = mobile ? 4.4 : 2.85;
    if (side < 2) {
      position.set(side === 0 ? -spreadX : spreadX, (Math.random() - 0.5) * spreadY * 2, depth);
      quaternion.setFromEuler(new THREE.Euler(0, 0, 0));
    } else {
      position.set((Math.random() - 0.5) * spreadX * 2, side === 2 ? -spreadY : spreadY, depth);
      quaternion.setFromEuler(new THREE.Euler(0, 0, Math.PI / 2));
    }
    scale.set(1, 0.28 + Math.random() * 1.4, 1);
    matrix.compose(position, quaternion, scale);
    bars.setMatrixAt(barIndex, matrix);
  }
  bars.instanceMatrix.needsUpdate = true;
  portalGroup.add(bars);

  var screenSources = Array.prototype.map.call(hero.querySelectorAll('.portal-art__screen img'), function (image) {
    return image.currentSrc || image.src;
  });
  var loader = new THREE.TextureLoader();
  var screenTargets = mobile ? [
    { x: -1.25, y: -0.2, z: -1.4, ry: 0.22, scale: 0.76 },
    { x: 0.55, y: 0.1, z: 0.4, ry: -0.08, scale: 0.94 },
    { x: 2.05, y: -0.35, z: -2.2, ry: -0.26, scale: 0.72 }
  ] : [
    { x: -0.9, y: -0.2, z: -2.2, ry: 0.3, scale: 0.76 },
    { x: 1.55, y: 0.05, z: 0.35, ry: -0.12, scale: 1 },
    { x: 3.9, y: -0.25, z: -2.8, ry: -0.34, scale: 0.72 }
  ];
  var screenMeshes = [];
  var loadedScreens = 0;
  screenSources.forEach(function (source, index) {
    loader.load(source, function (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      var target = screenTargets[index];
      var screenMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 });
      var screen = new THREE.Mesh(new THREE.PlaneGeometry(2.18, 4.84), screenMaterial);
      screen.position.set(target.x, target.y - 0.5, target.z - 8);
      screen.rotation.y = target.ry;
      screen.scale.setScalar(target.scale);
      screen.userData.target = target;
      screen.userData.delay = index * 0.13 - 0.2;
      screenGroup.add(screen);
      screenMeshes.push(screen);
      loadedScreens += 1;
      if (loadedScreens === screenSources.length) hero.classList.add('has-portal-screens');
    });
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.5));
  renderer.domElement.className = 'portal-scene__canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  mount.insertBefore(renderer.domElement, mount.firstChild);

  var pointerX = 0;
  var pointerY = 0;
  var targetX = 0;
  var targetY = 0;
  var progress = 0;
  var visible = true;
  var pageVisible = !document.hidden;
  var running = false;
  var frameId = 0;
  var lastFrame = 0;
  var frameInterval = mobile || constrained ? 1000 / 30 : 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function smooth(value, min, max) {
    return THREE.MathUtils.smoothstep(value, min, max);
  }

  function resize() {
    var rect = mount.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function updateProgress() {
    var rect = hero.getBoundingClientRect();
    var distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
    progress = clamp(-rect.top / distance, 0, 1);
    hero.style.setProperty('--portal-progress', progress.toFixed(3));
    document.documentElement.style.setProperty('--portal-progress', progress.toFixed(3));
  }

  function render(time) {
    if (!running) return;
    frameId = window.requestAnimationFrame(render);
    if (frameInterval && time - lastFrame < frameInterval) return;
    lastFrame = time;

    pointerX += (targetX - pointerX) * 0.045;
    pointerY += (targetY - pointerY) * 0.045;
    var advance = smooth(progress, 0.04, 0.94);
    var particleArray = particleGeometry.attributes.position.array;
    for (var index = 0; index < particleCount; index += 1) {
      var index3 = index * 3;
      particleArray[index3 + 2] += 0.018 + advance * 0.045;
      if (particleArray[index3 + 2] > 7) particleArray[index3 + 2] = -24;
      particleArray[index3 + 1] += Math.sin(time * 0.0012 + particleSeeds[index]) * 0.0015;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    frames.forEach(function (frame, index) {
      var z = frame.userData.baseZ + advance * 12;
      while (z > 7) z -= frames.length * 2.5;
      frame.position.z = z;
      frame.rotation.z = Math.sin(time * 0.00035 + index) * 0.012;
      frame.scale.setScalar(1 + smooth(z, -18, 7) * 0.025);
    });

    screenMeshes.forEach(function (screen) {
      var reveal = smooth(advance, screen.userData.delay, Math.min(screen.userData.delay + 0.45, 1));
      var target = screen.userData.target;
      screen.position.x = target.x + pointerX * (mobile ? 0.18 : 0.34) * (1 + screen.userData.delay);
      screen.position.y = THREE.MathUtils.lerp(target.y - 0.5, target.y, reveal) - pointerY * 0.18;
      screen.position.z = THREE.MathUtils.lerp(target.z - 8, target.z, reveal);
      screen.rotation.x = pointerY * 0.035;
      screen.rotation.y = target.ry + pointerX * 0.07;
      screen.material.opacity = reveal;
    });

    portalGroup.rotation.y = pointerX * (mobile ? 0.05 : 0.09);
    portalGroup.rotation.x = -pointerY * (mobile ? 0.035 : 0.06);
    camera.position.z = THREE.MathUtils.lerp(10.5, 7.2, advance);
    renderer.render(scene, camera);
    hero.classList.add('is-portal-rendered');
  }

  function start() {
    if (running || !visible || !pageVisible) return;
    running = true;
    frameId = window.requestAnimationFrame(render);
  }

  function stop() {
    running = false;
    window.cancelAnimationFrame(frameId);
  }

  hero.addEventListener('pointermove', function (event) {
    var rect = hero.getBoundingClientRect();
    targetX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
    targetY = clamp((event.clientY - rect.top) / Math.min(rect.height, window.innerHeight) * 2 - 1, -1, 1);
  }, { passive: true });
  hero.addEventListener('pointerleave', function () {
    targetX = 0;
    targetY = 0;
  }, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', updateProgress, { passive: true });
  document.addEventListener('visibilitychange', function () {
    pageVisible = !document.hidden;
    if (pageVisible) start(); else stop();
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }, { rootMargin: '80px 0px' });
    observer.observe(hero);
  }

  resize();
  updateProgress();
  start();
})();

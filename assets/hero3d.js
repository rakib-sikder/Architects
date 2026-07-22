// Interactive 3D hero: a procedural architectural massing model — concrete
// blocks with blueprint-blue edges, floating in a dark void, slowly rotating and
// reacting to the pointer. Falls back to a static image if WebGL/CDN fails.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const container = document.getElementById("hero3d");
const fallback = document.getElementById("hero-fallback");

function showFallback() {
  if (fallback) fallback.classList.add("show");
}

try {
  if (!container) throw new Error("no container");
  window.__three = true;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = matchMedia("(max-width: 640px)").matches;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0c141f, 16, 46);

  const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 120);
  camera.position.set(15, 12, 18);
  camera.lookAt(0, 2.5, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // lights
  scene.add(new THREE.HemisphereLight(0xe9eef6, 0x10151d, 1.15));
  const key = new THREE.DirectionalLight(0xfff4e8, 1.5);
  key.position.set(10, 18, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x88a8d6, 0.5);
  fill.position.set(-8, 6, -10);
  scene.add(fill);
  const rim = new THREE.PointLight(0xc0592c, 1.1, 60); // rust accent glow
  rim.position.set(-12, 7, -4);
  scene.add(rim);

  const city = new THREE.Group();
  scene.add(city);

  // ground grid (blueprint)
  const grid = new THREE.GridHelper(60, 30, 0x2f5c8a, 0x1c3350);
  grid.material.transparent = true;
  grid.material.opacity = 0.5;
  grid.position.y = -0.01;
  city.add(grid);

  // procedural blocks on a grid
  const concreteMats = [0xd8d2c6, 0xcfc8ba, 0xe3ddd0, 0xbfb8a9].map(
    (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.82, metalness: 0.05 })
  );
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x6ea1dd, transparent: true, opacity: 0.95 });
  const edgeAccent = new THREE.LineBasicMaterial({ color: 0xe07a45, transparent: true, opacity: 1 });

  const GRID = mobile ? 5 : 6;
  const STEP = 3.1;
  const towers = [];
  let idx = 0;
  for (let gx = 0; gx < GRID; gx++) {
    for (let gz = 0; gz < GRID; gz++) {
      // leave a few gaps for a "plaza"
      if (Math.random() < 0.14) continue;
      const w = 1.4 + Math.random() * 1.1;
      const d = 1.4 + Math.random() * 1.1;
      const isTower = Math.random() < 0.22;
      const h = isTower ? 6 + Math.random() * 7 : 1.4 + Math.random() * 3.4;
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, concreteMats[idx % concreteMats.length]);
      const x = (gx - (GRID - 1) / 2) * STEP + (Math.random() - 0.5) * 0.4;
      const z = (gz - (GRID - 1) / 2) * STEP + (Math.random() - 0.5) * 0.4;
      mesh.position.set(x, h / 2, z);
      city.add(mesh);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), isTower ? edgeAccent : edgeMat);
      edges.position.copy(mesh.position);
      city.add(edges);

      if (isTower) towers.push(mesh);
      idx++;
    }
  }

  // frame the model
  city.position.y = 0;
  camera.position.set(16, 13, 19);

  // pointer parallax
  const target = { x: 16, y: 13, z: 19 };
  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener("resize", resize);

  let t = 0;
  function frame() {
    t += 0.0016;
    city.rotation.y = reduce ? 0.5 : t;
    // ease camera toward pointer-offset target
    target.x = 16 + pointer.x * 3.2;
    target.y = 13 - pointer.y * 2.2;
    camera.position.x += (target.x - camera.position.x) * 0.05;
    camera.position.y += (target.y - camera.position.y) * 0.05;
    camera.lookAt(0, 2.6, 0);
    renderer.render(scene, camera);
    if (!reduce) requestAnimationFrame(frame);
  }
  if (reduce) {
    city.rotation.y = 0.5;
    renderer.render(scene, camera);
  } else {
    requestAnimationFrame(frame);
  }
} catch (err) {
  console.warn("[hero3d] falling back:", err && err.message);
  showFallback();
}

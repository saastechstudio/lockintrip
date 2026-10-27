import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Scène de l'intro : un livre en cuir bordeaux posé sur un socle en béton, révélé par un faisceau
 * de lumière ; la couverture s'ouvre, les pages s'envolent dans une lumière ivoire et la caméra plonge
 * dedans jusqu'au fondu beige. Tout est fonction du temps `t` (secondes) : `render(t)` est déterministe.
 */

export const SCENE_END = 3.75;

const C = {
  bg: new THREE.Color("#0e0507"),
  leather: new THREE.Color("#3f0c15"),
  leatherSheen: new THREE.Color("#7a2a38"),
  lining: new THREE.Color("#3b0e16"),
  paper: new THREE.Color("#efe6da"),
  foil: new THREE.Color("#f1e4d0"),
  concrete: new THREE.Color("#2b2725"),
  key: new THREE.Color("#ffe9cf"),
  rim: new THREE.Color("#a3364a"),
  glow: new THREE.Color("#fff1dc"),
  fade: new THREE.Color("#f2eadf"),
};

// --- utilitaires de temps ---------------------------------------------------
const clamp = (x: number, a = 0, b = 1) => Math.min(Math.max(x, a), b);
const range = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const smooth = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// --- textures procédurales ---------------------------------------------------
function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, color = true) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const tex = new THREE.CanvasTexture(c);
  if (color) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function noiseTexture(size: number, seed: number, grain: number, blotches: number) {
  const rnd = seeded(seed);
  return canvasTexture(
    size,
    size,
    (g) => {
      const img = g.createImageData(size, size);
      for (let i = 0; i < size * size; i++) {
        const v = 128 + (rnd() - 0.5) * grain;
        img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
        img.data[i * 4 + 3] = 255;
      }
      g.putImageData(img, 0, 0);
      for (let i = 0; i < blotches; i++) {
        const x = rnd() * size;
        const y = rnd() * size;
        const r = 4 + rnd() * size * 0.12;
        const grd = g.createRadialGradient(x, y, 0, x, y, r);
        const tone = rnd() > 0.5 ? 255 : 0;
        grd.addColorStop(0, `rgba(${tone},${tone},${tone},${0.05 + rnd() * 0.07})`);
        grd.addColorStop(1, `rgba(${tone},${tone},${tone},0)`);
        g.fillStyle = grd;
        g.fillRect(x - r, y - r, r * 2, r * 2);
      }
    },
    false,
  );
}

/** Monogramme + nom, en dorure, sur fond transparent (sert de masque alpha). */
function foilTexture(fontFamily: string) {
  return canvasTexture(
    1024,
    1024,
    (g) => {
      g.clearRect(0, 0, 1024, 1024);
      g.strokeStyle = "#fff";
      g.fillStyle = "#fff";
      g.lineCap = "round";
      // cadre fin
      g.lineWidth = 5;
      g.strokeRect(70, 70, 884, 884);
      g.lineWidth = 2;
      g.strokeRect(92, 92, 840, 840);
      // monogramme (même dessin que le logo du site, viewBox 32)
      g.save();
      g.translate(512 - 112, 300);
      g.scale(7, 7);
      g.lineWidth = 1.3;
      g.beginPath();
      g.moveTo(6, 26);
      g.lineTo(6, 14);
      g.arc(16, 14, 10, Math.PI, 0);
      g.lineTo(26, 26);
      g.stroke();
      g.globalAlpha = 0.65;
      g.beginPath();
      g.moveTo(11, 26);
      g.lineTo(11, 15);
      g.arc(16, 15, 5, Math.PI, 0);
      g.lineTo(21, 26);
      g.stroke();
      g.globalAlpha = 1;
      g.beginPath();
      g.arc(16, 21.5, 1.6, 0, Math.PI * 2);
      g.fill();
      g.beginPath();
      g.moveTo(3, 26);
      g.lineTo(29, 26);
      g.stroke();
      g.restore();
      // nom
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.font = `500 64px ${fontFamily}`;
      (g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "28px";
      g.fillText("LOCKIN", 512 + 14, 640);
      g.font = `400 34px ${fontFamily}`;
      (g as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "30px";
      g.fillText("TRIP", 512 + 15, 712);
    },
    false,
  );
}

function pageEdgeTexture() {
  return canvasTexture(256, 64, (g) => {
    g.fillStyle = "#e9dfd1";
    g.fillRect(0, 0, 256, 64);
    for (let y = 0; y < 64; y += 2) {
      g.fillStyle = `rgba(120,100,85,${0.08 + (y % 6 === 0 ? 0.1 : 0)})`;
      g.fillRect(0, y, 256, 1);
    }
  });
}

function pageFaceTexture() {
  return canvasTexture(512, 512, (g) => {
    const grd = g.createRadialGradient(256, 256, 20, 256, 256, 360);
    grd.addColorStop(0, "#eae0d2");
    grd.addColorStop(1, "#d3c4b0");
    g.fillStyle = grd;
    g.fillRect(0, 0, 512, 512);
    g.strokeStyle = "rgba(107,31,43,0.35)";
    g.lineWidth = 2;
    g.strokeRect(40, 40, 432, 432);
  });
}

function spriteTexture() {
  return canvasTexture(64, 64, (g) => {
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.3, "rgba(255,255,255,0.45)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
  });
}

// --- caméra -----------------------------------------------------------------
type Key = { t: number; pos: [number, number, number]; look: [number, number, number]; fov: number };
const keys: Key[] = [
  { t: 0, pos: [2.35, 0.95, 2.75], look: [-0.05, 0.22, 0], fov: 27 },
  { t: 1.7, pos: [1.75, 1.2, 2.1], look: [-0.05, 0.24, 0], fov: 29 },
  { t: 2.45, pos: [0.2, 3.6, 1.6], look: [-0.55, 0.25, 0], fov: 33 },
  { t: 3.05, pos: [-0.62, 5.0, 0.03], look: [-0.62, 0.25, 0], fov: 33 },
  { t: 3.75, pos: [0.02, 0.6, 0.0], look: [0.02, 0.22, 0], fov: 64 },
];

function cameraAt(t: number) {
  let i = 0;
  while (i < keys.length - 2 && t > keys[i + 1].t) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const k = smooth(range(t, a.t, b.t));
  const lerp = (x: number, y: number) => x + (y - x) * k;
  return {
    pos: new THREE.Vector3(lerp(a.pos[0], b.pos[0]), lerp(a.pos[1], b.pos[1]), lerp(a.pos[2], b.pos[2])),
    look: new THREE.Vector3(lerp(a.look[0], b.look[0]), lerp(a.look[1], b.look[1]), lerp(a.look[2], b.look[2])),
    fov: lerp(a.fov, b.fov),
  };
}

// --- passe finale : vignette, grain, fondu ----------------------------------
const FinishShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uFade: { value: 0 },
    uFadeColor: { value: new THREE.Vector3(0xf2 / 255, 0xea / 255, 0xdf / 255) },
    uVignette: { value: 0.55 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uFade; uniform vec3 uFadeColor; uniform float uVignette;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233)) + uTime * 3.1) * 43758.5453); }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5;
      float v = smoothstep(0.85, 0.2, length(d * vec2(1.15, 1.0)));
      c.rgb *= mix(1.0 - uVignette, 1.0, v);
      c.rgb += (hash(vUv * 1000.0) - 0.5) * 0.035;
      c.rgb = mix(c.rgb, uFadeColor, uFade);
      gl_FragColor = c;
    }
  `,
};

export type IntroScene = { render: (t: number) => void; resize: () => void; dispose: () => void };

export function createIntroScene(canvas: HTMLCanvasElement, opts: { mobile: boolean; fontFamily: string }): IntroScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.mobile ? 1.5 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(C.bg);

  const scene = new THREE.Scene();
  scene.background = C.bg;
  scene.fog = new THREE.FogExp2(C.bg, 0.075);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.18;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.02, 60);

  // --- socle en béton
  const concreteTex = noiseTexture(512, 7, 60, 260);
  concreteTex.wrapS = concreteTex.wrapT = THREE.RepeatWrapping;
  concreteTex.repeat.set(5, 5);
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: C.concrete, roughness: 0.42, metalness: 0, roughnessMap: concreteTex, bumpMap: concreteTex, bumpScale: 0.12 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // --- livre
  const W = 1.5;
  const D = 2.0;
  const book = new THREE.Group();
  book.rotation.y = -0.18;
  scene.add(book);

  const leatherBump = noiseTexture(512, 3, 110, 500);
  leatherBump.wrapS = leatherBump.wrapT = THREE.RepeatWrapping;
  leatherBump.repeat.set(2, 2);
  const leather = new THREE.MeshPhysicalMaterial({
    color: C.leather,
    roughness: 0.52,
    bumpMap: leatherBump,
    bumpScale: 0.8,
    sheen: 0.45,
    sheenRoughness: 0.45,
    sheenColor: C.leatherSheen,
    clearcoat: 0.12,
    clearcoatRoughness: 0.6,
  });
  const lining = new THREE.MeshStandardMaterial({ color: C.lining, roughness: 0.75 });

  const back = new THREE.Mesh(new THREE.BoxGeometry(W + 0.04, 0.045, D + 0.04), leather);
  back.position.set(0, 0.0225, 0);
  back.castShadow = back.receiveShadow = true;
  book.add(back);

  const edge = pageEdgeTexture();
  const faceTex = pageFaceTexture();
  const pageTop = new THREE.MeshStandardMaterial({ map: faceTex, roughness: 0.9, emissive: C.glow, emissiveIntensity: 0 });
  const pageEdge = new THREE.MeshStandardMaterial({ map: edge, roughness: 0.95 });
  const block = new THREE.Mesh(new THREE.BoxGeometry(W - 0.05, 0.22, D - 0.06), [pageEdge, pageEdge, pageTop, pageEdge, pageEdge, pageEdge]);
  block.position.set(0.02, 0.045 + 0.11, 0);
  block.castShadow = block.receiveShadow = true;
  book.add(block);

  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.315, D + 0.04), leather);
  spine.position.set(-W / 2 - 0.0, 0.1575, 0);
  spine.castShadow = true;
  book.add(spine);

  // couverture articulée sur la reliure
  const hingeY = 0.29;
  const coverPivot = new THREE.Group();
  coverPivot.position.set(-W / 2, hingeY, 0);
  book.add(coverPivot);
  const cover = new THREE.Mesh(new THREE.BoxGeometry(W + 0.04, 0.045, D + 0.04), [leather, leather, leather, lining, leather, leather]);
  cover.position.set((W + 0.04) / 2, 0.0225, 0);
  cover.castShadow = cover.receiveShadow = true;
  coverPivot.add(cover);

  // dorure à chaud
  const foil = new THREE.Mesh(
    new THREE.PlaneGeometry(1.25, 1.25),
    new THREE.MeshStandardMaterial({
      color: C.foil,
      metalness: 0.75,
      roughness: 0.32,
      emissive: new THREE.Color("#d9c6ab"),
      emissiveIntensity: 0.12,
      alphaMap: foilTexture(opts.fontFamily),
      transparent: true,
      envMapIntensity: 2.4,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    }),
  );
  foil.rotation.x = -Math.PI / 2;
  foil.position.set((W + 0.04) / 2, 0.0465, 0.04);
  coverPivot.add(foil);

  // pages qui s'envolent
  const pageMat = new THREE.MeshStandardMaterial({ map: faceTex, side: THREE.DoubleSide, roughness: 0.9, emissive: C.glow, emissiveIntensity: 0, transparent: true });
  const pages: THREE.Group[] = [];
  for (let i = 0; i < 7; i++) {
    const pivot = new THREE.Group();
    pivot.position.set(-W / 2 + 0.03, 0.275, 0);
    const geo = new THREE.PlaneGeometry(W - 0.08, D - 0.1, 24, 1);
    // légère courbure du papier
    const pos = geo.attributes.position;
    for (let v = 0; v < pos.count; v++) {
      const x = pos.getX(v) + (W - 0.08) / 2;
      pos.setZ(v, Math.sin((x / (W - 0.08)) * Math.PI) * 0.06);
    }
    geo.computeVertexNormals();
    const page = new THREE.Mesh(geo, pageMat);
    page.rotation.x = -Math.PI / 2;
    page.position.set((W - 0.08) / 2, 0, 0);
    page.castShadow = true;
    pivot.add(page);
    book.add(pivot);
    pages.push(pivot);
  }

  // --- lumières
  scene.add(new THREE.HemisphereLight("#3a2a2c", "#0c0405", 0.35));
  const key = new THREE.SpotLight(C.key, 0, 14, 0.32, 0.75, 1.4);
  key.position.set(-2.6, 5.4, 1.6);
  key.target.position.set(0.1, 0, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(opts.mobile ? 1024 : 2048, opts.mobile ? 1024 : 2048);
  key.shadow.bias = -0.0004;
  key.shadow.radius = 6;
  scene.add(key, key.target);
  const rim = new THREE.SpotLight(C.rim, 0, 12, 0.5, 0.9, 1.2);
  rim.position.set(2.8, 1.6, -3.2);
  rim.target.position.set(0, 0.2, 0);
  scene.add(rim, rim.target);
  const inner = new THREE.PointLight(C.glow, 0, 6, 1.6);
  inner.position.set(0.15, 0.75, 0);
  book.add(inner);

  // faisceau volumétrique (cône additif)
  const beamGeo = new THREE.CylinderGeometry(0.02, 1.6, 6, 48, 1, true);
  beamGeo.translate(0, -3, 0);
  const beamMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uColor: { value: C.key.clone() }, uOpacity: { value: 0 } },
    vertexShader: /* glsl */ `
      varying float vH; varying vec3 vN; varying vec3 vV;
      void main() {
        vH = -position.y / 6.0;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor; uniform float uOpacity; varying float vH; varying vec3 vN; varying vec3 vV;
      void main() {
        float edge = pow(abs(dot(vN, vV)), 1.6);
        float a = edge * smoothstep(1.0, 0.25, vH) * smoothstep(0.0, 0.12, vH) * uOpacity;
        gl_FragColor = vec4(uColor, a);
      }
    `,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.position.copy(key.position);
  beam.lookAt(key.target.position);
  beam.rotateX(-Math.PI / 2);
  scene.add(beam);

  // poussière dans la lumière
  const sprite = spriteTexture();
  const DUST = opts.mobile ? 220 : 420;
  const rnd = seeded(42);
  const dustBase = new Float32Array(DUST * 3);
  const dustSeed = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) {
    dustBase[i * 3] = (rnd() - 0.5) * 6;
    dustBase[i * 3 + 1] = rnd() * 3.2;
    dustBase[i * 3 + 2] = (rnd() - 0.5) * 6;
    dustSeed[i] = rnd();
  }
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(DUST * 3);
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dustSeed, 1));
  const pointsMat = (size: number, color: THREE.Color) =>
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uMap: { value: sprite }, uSize: { value: size }, uOpacity: { value: 0 }, uColor: { value: color }, uScale: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float aSeed; uniform float uSize; uniform float uScale; varying float vSeed;
        void main() {
          vSeed = aSeed;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * uScale * (0.4 + aSeed) / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap; uniform float uOpacity; uniform vec3 uColor; varying float vSeed;
        void main() {
          vec4 s = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(uColor, s.a * uOpacity * (0.35 + 0.65 * vSeed));
        }
      `,
    });
  const dustMat = pointsMat(34, new THREE.Color("#f3e3cc"));
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // étincelles qui s'échappent des pages
  const SPARK = opts.mobile ? 260 : 520;
  const sparkBase = new Float32Array(SPARK * 4);
  const sparkSeed = new Float32Array(SPARK);
  for (let i = 0; i < SPARK; i++) {
    sparkBase[i * 4] = (rnd() - 0.5) * (W - 0.2);
    sparkBase[i * 4 + 1] = (rnd() - 0.5) * (D - 0.3);
    sparkBase[i * 4 + 2] = 0.6 + rnd() * 1.6; // vitesse
    sparkBase[i * 4 + 3] = rnd(); // départ
    sparkSeed[i] = rnd();
  }
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(SPARK * 3);
  sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
  sparkGeo.setAttribute("aSeed", new THREE.BufferAttribute(sparkSeed, 1));
  const sparkMat = pointsMat(26, new THREE.Color("#fff3e2"));
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  book.add(sparks);

  // traînées de lumière pour la plongée
  const STREAK = opts.mobile ? 260 : 480;
  const streakBase = new Float32Array(STREAK * 4);
  for (let i = 0; i < STREAK; i++) {
    const a = rnd() * Math.PI * 2;
    const r = 0.04 + Math.pow(rnd(), 0.6) * 1.1;
    streakBase[i * 4] = 0.05 + Math.cos(a) * r;
    streakBase[i * 4 + 1] = Math.sin(a) * r;
    streakBase[i * 4 + 2] = rnd(); // phase
    streakBase[i * 4 + 3] = 0.08 + rnd() * 0.35; // longueur
  }
  const streakGeo = new THREE.BufferGeometry();
  const streakPos = new Float32Array(STREAK * 6);
  const streakAlpha = new Float32Array(STREAK * 2);
  for (let i = 0; i < STREAK; i++) {
    streakAlpha[i * 2] = 0;
    streakAlpha[i * 2 + 1] = 1;
  }
  streakGeo.setAttribute("position", new THREE.BufferAttribute(streakPos, 3));
  streakGeo.setAttribute("aA", new THREE.BufferAttribute(streakAlpha, 1));
  const streakMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uOpacity: { value: 0 }, uColor: { value: new THREE.Color("#fbeedd").multiplyScalar(2.4) } },
    vertexShader: /* glsl */ `attribute float aA; varying float vA; void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: /* glsl */ `uniform float uOpacity; uniform vec3 uColor; varying float vA; void main(){ gl_FragColor = vec4(uColor, vA * uOpacity); }`,
  });
  const streaks = new THREE.LineSegments(streakGeo, streakMat);
  streaks.frustumCulled = false;
  scene.add(streaks);

  // --- post-traitement
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.2, 0.55, 0.82);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  // après la conversion sRGB : le fondu atteint exactement le beige de la carte logo
  const finish = new ShaderPass(FinishShader);
  composer.addPass(finish);

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloom.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();

  const hide = new URLSearchParams(location.search).get("hide")?.split(",") ?? [];
  const named: Record<string, THREE.Object3D> = { foil, beam, dust, sparks, streaks, block, spine, cover, floor };
  hide.forEach((n) => named[n] && (named[n].visible = false));
  pages.forEach((p) => hide.includes("pages") && (p.visible = false));

  const render = (t: number) => {
    // caméra (plus de recul sur un écran portrait)
    const cam = cameraAt(t);
    const portrait = camera.aspect < 1;
    if (portrait) cam.pos.add(new THREE.Vector3(1.9, 1.9, 2.9).multiplyScalar(1 - range(t, 1.8, 2.6)));
    if (portrait) cam.pos.y += 3.2 * range(t, 2.4, 3.05) * (1 - range(t, 3.05, 3.75));
    if (portrait) cam.look.add(new THREE.Vector3(-0.17, -0.3, 0).multiplyScalar(1 - range(t, 2.2, 3.0)));
    camera.position.copy(cam.pos);
    camera.fov = cam.fov + (portrait ? 14 * (1 - range(t, 3.1, 3.7)) : 0);
    camera.updateProjectionMatrix();
    // passage progressif en plan zénithal : l'axe « haut » de la caméra pivote vers -z
    const top = smooth(range(t, 2.1, 3.0));
    camera.up.set(0, 1 - top, -top).normalize();
    camera.lookAt(cam.look);

    book.rotation.y = -0.18 * (1 - smooth(range(t, 2.0, 3.0)));

    // ouverture de la couverture
    const open = easeInOutCubic(range(t, 1.35, 2.45));

    // révélation par la lumière, puis balayage sur la dorure
    const reveal = easeOutExpo(range(t, 0.15, 1.3));
    key.intensity = 70 * reveal * (1 - 0.5 * open) * (1 - 0.6 * range(t, 2.9, 3.4));
    key.position.set(-2.6 + 1.4 * smooth(range(t, 0.2, 2.2)), 5.4, 1.6 - 0.8 * smooth(range(t, 0.2, 2.2)));
    beam.position.copy(key.position);
    beam.lookAt(key.target.position);
    beam.rotateX(-Math.PI / 2);
    beamMat.uniforms.uOpacity.value = 0.22 * reveal * (1 - range(t, 2.6, 3.3));
    rim.intensity = 30 * easeOutExpo(range(t, 0.4, 1.6));
    scene.environmentIntensity = 0.12 + 0.25 * reveal;

    coverPivot.rotation.z = open * Math.PI * 0.94;

    // lumière intérieure et pages
    const glow = smooth(range(t, 1.45, 2.4));
    const surge = smooth(range(t, 3.1, 3.7));
    inner.intensity = 1.4 * glow + 14 * surge;
    pageTop.emissiveIntensity = 0.03 * glow + 0.9 * surge;
    pageMat.emissiveIntensity = 0.02 * glow + 0.8 * surge;
    pages.forEach((p, i) => {
      p.visible = open > 0.25 && !hide.includes("pages");
      const start = 1.7 + i * 0.07;
      const k = easeOutExpo(range(t, start, start + 0.95));
      p.rotation.z = k * Math.PI * (0.035 + i * 0.03) + Math.sin(t * 3 + i) * 0.012 * k;
    });
    pageMat.opacity = 1;

    // poussière
    for (let i = 0; i < DUST; i++) {
      const s = dustSeed[i];
      dustPos[i * 3] = dustBase[i * 3] + Math.sin(t * 0.6 + s * 20) * 0.08 + t * 0.03;
      dustPos[i * 3 + 1] = dustBase[i * 3 + 1] + t * (0.05 + s * 0.08);
      dustPos[i * 3 + 2] = dustBase[i * 3 + 2] + Math.cos(t * 0.5 + s * 15) * 0.08;
    }
    dustGeo.attributes.position.needsUpdate = true;
    dustMat.uniforms.uOpacity.value = 0.42 * reveal * (1 - range(t, 3.0, 3.6));
    dustMat.uniforms.uScale.value = renderer.getPixelRatio();

    // étincelles
    const sparkOn = range(t, 1.6, 2.1);
    for (let i = 0; i < SPARK; i++) {
      const life = (t * 0.55 + sparkBase[i * 4 + 3]) % 1;
      const h = life * sparkBase[i * 4 + 2];
      sparkPos[i * 3] = sparkBase[i * 4] * (1 + h * 0.35) + Math.sin(life * 9 + i) * 0.04;
      sparkPos[i * 3 + 1] = 0.3 + h;
      sparkPos[i * 3 + 2] = sparkBase[i * 4 + 1] * (1 + h * 0.35);
    }
    sparkGeo.attributes.position.needsUpdate = true;
    sparkMat.uniforms.uOpacity.value = 1.1 * sparkOn * (1 - range(t, 3.3, 3.7));
    sparkMat.uniforms.uScale.value = renderer.getPixelRatio();

    // traînées
    const warp = smooth(range(t, 2.9, 3.3));
    const speed = 1.5 + 9 * warp;
    for (let i = 0; i < STREAK; i++) {
      const len = streakBase[i * 4 + 3] * (1 + 4 * warp);
      const y = 0.3 + ((streakBase[i * 4 + 2] * 3.2 + t * speed * 0.35) % 3.2);
      const x = streakBase[i * 4];
      const z = streakBase[i * 4 + 1];
      streakPos.set([x, y, z, x, y + len, z], i * 6);
    }
    streakGeo.attributes.position.needsUpdate = true;
    streakMat.uniforms.uOpacity.value = 0.9 * warp * (1 - range(t, 3.5, 3.7));

    // bloom, fondu
    bloom.strength = 0.2 + 0.25 * glow + 1.15 * surge;
    bloom.threshold = 0.9 - 0.6 * surge;
    finish.uniforms.uTime.value = t;
    finish.uniforms.uVignette.value = 0.6 - 0.35 * surge;
    finish.uniforms.uFade.value = smooth(range(t, 3.4, SCENE_END - 0.03));

    composer.render();
  };

  const dispose = () => {
    composer.dispose();
    pmrem.dispose();
    envTex.dispose();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
      mats.forEach((mat) => {
        Object.values(mat).forEach((v) => (v instanceof THREE.Texture ? v.dispose() : null));
        mat.dispose();
      });
    });
    renderer.dispose();
  };

  return { render, resize, dispose };
}

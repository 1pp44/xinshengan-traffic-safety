import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useLanguage } from '../state/LanguageContext';
import { Reveal } from './Reveal';
import { assetUrl } from '../lib/assetUrl';

const MODEL_URL = `${assetUrl('assets/models/pu-bollard-70cm.glb')}?v=yup-2`;
const INITIAL_CAMERA = new THREE.Vector3(1.65, 1.12, 2.25);
const INITIAL_TARGET = new THREE.Vector3(0, 0.78, 0);

export function Bollard3DViewer() {
  const { t } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const autoRotateRef = useRef(true);
  const reduceMotionRef = useRef(false);
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => { autoRotateRef.current = autoRotate; }, [autoRotate]);
  useEffect(() => { reduceMotionRef.current = reduceMotion; }, [reduceMotion]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduceMotion(media.matches);
      if (media.matches) setAutoRotate(false);
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0d0e);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.copy(INITIAL_CAMERA);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 1.2;
    controls.maxDistance = 4.2;
    controls.maxPolarAngle = Math.PI * 0.88;
    controls.target.copy(INITIAL_TARGET);
    controlsRef.current = controls;

    scene.add(new THREE.HemisphereLight(0xf4f6f5, 0x181b1d, 2.5));
    const key = new THREE.DirectionalLight(0xf4f6f5, 5.2);
    key.position.set(3, 4, 4);
    scene.add(key);
    const yellow = new THREE.DirectionalLight(0xd7ff35, 2.4);
    yellow.position.set(-3, 1.5, 2);
    scene.add(yellow);
    const red = new THREE.DirectionalLight(0xd71920, 1.6);
    red.position.set(1, 1, -3);
    scene.add(red);

    let model: THREE.Object3D | null = null;
    let frame = 0;
    let disposed = false;

    new GLTFLoader().load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        const center = bounds.getCenter(new THREE.Vector3());
        const scale = 1.6 / size.y;
        model.scale.setScalar(scale);
        model.position.set(
          -center.x * scale,
          -bounds.min.y * scale,
          -center.z * scale,
        );
        model.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial) {
                material.roughness = Math.max(material.roughness, 0.52);
                material.needsUpdate = true;
              }
            });
          }
        });
        scene.add(model);
        setLoading(100);
      },
      (event) => {
        if (event.total > 0) setLoading(Math.round((event.loaded / event.total) * 100));
      },
      () => {
        if (!disposed) {
          setLoading(100);
          setError(true);
        }
      },
    );

    const resize = () => {
      const stage = mount.parentElement;
      const width = Math.max(stage?.clientWidth ?? mount.clientWidth, 320);
      const height = Math.round(width * 9 / 16);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount.parentElement ?? mount);
    resize();

    const render = () => {
      frame = requestAnimationFrame(render);
      controls.autoRotate = autoRotateRef.current && !reduceMotionRef.current && Boolean(model);
      controls.autoRotateSpeed = 0.72;
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      controlsRef.current = null;
      cameraRef.current = null;
    };
  }, []);

  const resetView = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.copy(INITIAL_CAMERA);
    controlsRef.current.target.copy(INITIAL_TARGET);
    controlsRef.current.update();
  };

  return (
    <section className="showroom-section" data-component="real-glb-showroom" id="showroom">
      <Reveal><h2 className="section-title">{t('showroom3d')}</h2></Reveal>
      <div className="viewer-layout">
        <div className="viewer-container">
          <div aria-label="PU 70 cm traffic bollard GLB model" className="three-mount" ref={mountRef} role="img" tabIndex={0} />
          {!error && loading < 100 && <div className="viewer-overlay" role="status"><span>{t('loading3d')} {loading}%</span></div>}
          {error && <div className="viewer-overlay"><span>{t('error3d')}</span></div>}
          <div className="viewer-controls">
            <button aria-pressed={autoRotate} className="btn-v-ctrl" disabled={reduceMotion} onClick={() => setAutoRotate((value) => !value)} type="button">
              {autoRotate && !reduceMotion ? <Pause size={18} /> : <Play size={18} />}
              <span>{t('autoRotate')}</span>
            </button>
            <button className="btn-v-ctrl" onClick={resetView} type="button"><RotateCcw size={18} /><span>{t('reset')}</span></button>
          </div>
        </div>
        <div className="viewer-info">
          <Reveal>
            <p className="utility-kicker">GLB / 12 MESHES / REAL GEOMETRY</p>
            <h3 className="viewer-subtitle">PU 70 CM BOLLARD</h3>
            <p className="viewer-desc">{t('visualOnly')}</p>
            <ul className="viewer-spec-list"><li>70 cm reference height</li><li>3 fluorescent reflective bands</li><li>18 cm reference base</li><li>4 display mounting recesses</li></ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

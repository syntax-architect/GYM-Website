import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useCmsStore } from '../../store/cmsStore';

export type DumbbellFinish = 'signature' | 'stealth' | 'prestige';

export interface SculpturalDumbbellCanvasProps {
  scrollProgress?: number;
  interactivePointer?: boolean;
  className?: string;
  autoRotateSpeed?: number;
  finish?: DumbbellFinish;
  exploded?: boolean;
  wireframe?: boolean;
  onTelemetryChange?: (data: { rotationY: number; finish: DumbbellFinish; isExploded: boolean }) => void;
}

export const SculpturalDumbbellCanvas: React.FC<SculpturalDumbbellCanvasProps> = ({
  scrollProgress = 0,
  interactivePointer = true,
  className = '',
  autoRotateSpeed = 1.1,
  finish = 'signature',
  exploded = false,
  wireframe = false,
  onTelemetryChange,
}) => {
  const brand = useCmsStore((s) => s.brand);
  const mountRef = useRef<HTMLDivElement>(null);
  const isReducedMotionRef = useRef<boolean>(false);
  const onTelemetryChangeRef = useRef(onTelemetryChange);

  useEffect(() => {
    onTelemetryChangeRef.current = onTelemetryChange;
  }, [onTelemetryChange]);

  // Drag & Inertia state refs
  const isDraggingRef = useRef<boolean>(false);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationRef = useRef<{ x: number; y: number; z: number }>({ x: 0.18, y: -0.4, z: 0.08 });
  const mouseHoverRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const explodeProgressRef = useRef<number>(0);

  // References to materials & groups for live parameter updates
  const materialsRef = useRef<{
    persimmon: THREE.MeshPhysicalMaterial;
    periwinkle: THREE.MeshPhysicalMaterial;
    carbon: THREE.MeshStandardMaterial;
    collar: THREE.MeshStandardMaterial;
    internalBushing: THREE.MeshStandardMaterial;
  } | null>(null);

  const headsRef = useRef<{
    leftHead: THREE.Group;
    rightHead: THREE.Group;
    leftBushing: THREE.Mesh;
    rightBushing: THREE.Mesh;
  } | null>(null);

  const [cursorState, setCursorState] = useState<'grab' | 'grabbing'>('grab');

  useEffect(() => {
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Update materials when finish or wireframe changes
  useEffect(() => {
    const mats = materialsRef.current;
    if (!mats) return;

    mats.persimmon.wireframe = wireframe;
    mats.periwinkle.wireframe = wireframe;
    mats.carbon.wireframe = wireframe;
    mats.collar.wireframe = wireframe;

    if (finish === 'signature') {
      // Left Head: Anodized Infrared Crimson Steel
      mats.persimmon.color.set('#D9381E');
      mats.persimmon.metalness = 0.62;
      mats.persimmon.roughness = 0.24;
      mats.persimmon.clearcoat = 0.65;

      // Right Head: Brushed Champagne Gold (Luxury Salon Wing)
      mats.periwinkle.color.set('#C5A059');
      mats.periwinkle.metalness = 0.86;
      mats.periwinkle.roughness = 0.22;
      mats.periwinkle.clearcoat = 0.7;

      // Center Shaft: Knurled Obsidian Gunmetal
      mats.carbon.color.set('#141416');
      mats.carbon.metalness = 0.88;
      mats.carbon.roughness = 0.36;

      mats.collar.color.set('#2C2C30');
      mats.collar.metalness = 0.92;
      mats.collar.roughness = 0.2;
    } else if (finish === 'stealth') {
      // Matte Black Oxide & Gunmetal knurling
      mats.persimmon.color.set('#1E201E');
      mats.persimmon.metalness = 0.82;
      mats.persimmon.roughness = 0.28;
      mats.persimmon.clearcoat = 0.25;

      mats.periwinkle.color.set('#141614');
      mats.periwinkle.metalness = 0.85;
      mats.periwinkle.roughness = 0.32;
      mats.periwinkle.clearcoat = 0.25;

      mats.carbon.color.set('#111311');
      mats.carbon.metalness = 0.92;
      mats.carbon.roughness = 0.38;

      mats.collar.color.set('#30332E');
      mats.collar.metalness = 0.94;
      mats.collar.roughness = 0.18;
    } else if (finish === 'prestige') {
      // Luxury Polished Champagne Bronze & Ivory Gold
      mats.persimmon.color.set('#CFA852');
      mats.persimmon.metalness = 0.92;
      mats.persimmon.roughness = 0.22;
      mats.persimmon.clearcoat = 0.85;

      mats.periwinkle.color.set('#B8933E');
      mats.periwinkle.metalness = 0.94;
      mats.periwinkle.roughness = 0.24;
      mats.periwinkle.clearcoat = 0.85;

      mats.carbon.color.set('#282520');
      mats.carbon.metalness = 0.82;
      mats.carbon.roughness = 0.32;

      mats.collar.color.set('#E6CA7E');
      mats.collar.metalness = 0.95;
      mats.collar.roughness = 0.15;
    }
  }, [finish, wireframe]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();

    // 70mm product photography camera pulled back for zero clipping & clean orbital framing
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.12, 6.9);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      console.warn('WebGL not supported');
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    const dumbbellGroup = new THREE.Group();
    scene.add(dumbbellGroup);

    // MATERIALS
    const primaryHex = finish === 'signature' ? brand.primaryColor : finish === 'stealth' ? '#18181A' : '#C5A059';
    const secondaryHex = finish === 'signature' ? brand.secondaryColor : finish === 'stealth' ? '#26262B' : '#E0BC75';

    const persimmonMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(primaryHex),
      metalness: finish === 'prestige' ? 0.92 : finish === 'stealth' ? 0.85 : 0.62,
      roughness: 0.24,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18,
      reflectivity: 0.55,
      wireframe,
    });

    const periwinkleMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(secondaryHex),
      metalness: finish === 'prestige' ? 0.95 : finish === 'stealth' ? 0.88 : 0.86,
      roughness: 0.22,
      clearcoat: 0.7,
      clearcoatRoughness: 0.18,
      reflectivity: 0.55,
      wireframe,
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141416'),
      metalness: 0.88,
      roughness: 0.36,
    });

    const collarMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2C2C30'),
      metalness: 0.92,
      roughness: 0.2,
    });

    const internalBushingMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D89745'),
      metalness: 0.9,
      roughness: 0.2,
    });

    materialsRef.current = {
      persimmon: persimmonMaterial,
      periwinkle: periwinkleMaterial,
      carbon: carbonMaterial,
      collar: collarMaterial,
      internalBushing: internalBushingMaterial,
    };

    // GEOMETRY
    // Center knurled grip shaft
    const gripGeom = new THREE.CylinderGeometry(0.14, 0.14, 1.6, 32);
    const gripMesh = new THREE.Mesh(gripGeom, carbonMaterial);
    gripMesh.rotation.z = Math.PI / 2;
    gripMesh.castShadow = true;
    dumbbellGroup.add(gripMesh);

    // Knurling rings
    for (let i = -0.55; i <= 0.55; i += 0.18) {
      const ringGeom = new THREE.TorusGeometry(0.142, 0.005, 12, 32);
      const ringMesh = new THREE.Mesh(ringGeom, collarMaterial);
      ringMesh.position.x = i;
      ringMesh.rotation.y = Math.PI / 2;
      dumbbellGroup.add(ringMesh);
    }

    // Inner sleeve core (visible when exploded)
    const leftBushingGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 24);
    const leftBushing = new THREE.Mesh(leftBushingGeom, internalBushingMaterial);
    leftBushing.rotation.z = Math.PI / 2;
    leftBushing.position.x = -1.1;
    dumbbellGroup.add(leftBushing);

    const rightBushingGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 24);
    const rightBushing = new THREE.Mesh(rightBushingGeom, internalBushingMaterial);
    rightBushing.rotation.z = Math.PI / 2;
    rightBushing.position.x = 1.1;
    dumbbellGroup.add(rightBushing);

    // Weight Head Helper
    const createWeightHead = (material: THREE.Material, sideMultiplier: number) => {
      const headGroup = new THREE.Group();
      headGroup.position.x = sideMultiplier * 0.95;

      const collarGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 32);
      const collar = new THREE.Mesh(collarGeom, collarMaterial);
      collar.rotation.z = Math.PI / 2;
      collar.castShadow = true;
      headGroup.add(collar);

      const plateGeom = new THREE.CylinderGeometry(0.68, 0.74, 0.38, 48);
      const plate = new THREE.Mesh(plateGeom, material);
      plate.rotation.z = Math.PI / 2;
      plate.position.x = sideMultiplier * 0.24;
      plate.castShadow = true;
      headGroup.add(plate);

      const rimGeom = new THREE.TorusGeometry(0.71, 0.04, 16, 48);
      const rim = new THREE.Mesh(rimGeom, material);
      rim.rotation.y = Math.PI / 2;
      rim.position.x = sideMultiplier * 0.24;
      headGroup.add(rim);

      const capGeom = new THREE.CylinderGeometry(0.62, 0.62, 0.06, 48);
      const cap = new THREE.Mesh(capGeom, material);
      cap.rotation.z = Math.PI / 2;
      cap.position.x = sideMultiplier * 0.44;
      cap.castShadow = true;
      headGroup.add(cap);

      const indentGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.04, 32);
      const indent = new THREE.Mesh(indentGeom, collarMaterial);
      indent.rotation.z = Math.PI / 2;
      indent.position.x = sideMultiplier * 0.47;
      headGroup.add(indent);

      return headGroup;
    };

    const leftHead = createWeightHead(persimmonMaterial, -1);
    dumbbellGroup.add(leftHead);

    const rightHead = createWeightHead(periwinkleMaterial, 1);
    dumbbellGroup.add(rightHead);

    headsRef.current = {
      leftHead,
      rightHead,
      leftBushing,
      rightBushing,
    };

    // Soft Contact Shadow Plane
    const shadowGeom = new THREE.PlaneGeometry(3.6, 2.6);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.98;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Volumetric Studio Atmospheric Dust Specks
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#0D0D0E'),
      size: 0.022,
      transparent: true,
      opacity: 0.18,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // LIGHTING (Studio Spec)
    const ambientLight = new THREE.AmbientLight('#FAF8F4', 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#FFFFFF', 3.2);
    keyLight.position.set(-3.5, 4.0, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#E6DEC8', 1.6);
    fillLight.position.set(3.5, 2.0, 2.0);
    scene.add(fillLight);

    const bounceLight = new THREE.DirectionalLight('#C5A059', 0.95);
    bounceLight.position.set(0, -2.5, -1.0);
    scene.add(bounceLight);

    const rimLight = new THREE.DirectionalLight('#FFFFFF', 1.4);
    rimLight.position.set(0, 3.5, -3.0);
    scene.add(rimLight);

    // Pointer hover listener for slight perspective tilt
    const handlePointerMove = (e: MouseEvent) => {
      if (!interactivePointer || isReducedMotionRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseHoverRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || 600;
      const h = mountRef.current.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = performance.now();
    const startTime = performance.now();
    let animationFrameId: number;
    let isVisible = true;
    let isRunning = false;

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    const animate = () => {
      if (!isVisible) {
        stopLoop();
        return;
      }
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = (now - startTime) / 1000;

      // Atmospheric dust drift
      particles.rotation.y = time * 0.025;
      particles.rotation.x = Math.sin(time * 0.05) * 0.04;

      // Dumbbell natural physical float
      dumbbellGroup.position.y = Math.sin(time * 1.3) * 0.04;

      // Smooth Explode Animation (lerp to target)
      const targetExplode = exploded ? 0.6 : 0;
      explodeProgressRef.current += (targetExplode - explodeProgressRef.current) * 0.1;
      const curExplode = explodeProgressRef.current;

      if (headsRef.current) {
        headsRef.current.leftHead.position.x = -0.95 - curExplode;
        headsRef.current.rightHead.position.x = 0.95 + curExplode;
        headsRef.current.leftBushing.visible = curExplode > 0.05;
        headsRef.current.rightBushing.visible = curExplode > 0.05;
      }

      if (!isReducedMotionRef.current) {
        // Inertia damping when not actively dragging
        if (!isDraggingRef.current) {
          velocityRef.current.x *= 0.93;
          velocityRef.current.y *= 0.93;

          // Continuous fluid auto-spin (increased speed for dynamic metallic reflections)
          const autoSpin = autoRotateSpeed * 0.85 * delta;
          rotationRef.current.y += velocityRef.current.x + autoSpin;
          rotationRef.current.x += velocityRef.current.y;
        } else {
          rotationRef.current.y += velocityRef.current.x;
          rotationRef.current.x += velocityRef.current.y;
          velocityRef.current = { x: 0, y: 0 };
        }

        // Clamp vertical pitch tilt so it doesn't flip upside down
        rotationRef.current.x = Math.max(-0.65, Math.min(0.65, rotationRef.current.x));

        // Subtle mouse parallax tilt addition
        const hoverX = mouseHoverRef.current.x * 0.12;
        const hoverY = mouseHoverRef.current.y * 0.1;

        // Apply smooth target rotation
        dumbbellGroup.rotation.y = rotationRef.current.y + (scrollProgress * Math.PI * 1.2);
        dumbbellGroup.rotation.x = rotationRef.current.x - hoverY;
        dumbbellGroup.rotation.z = 0.08 + hoverX;

        // Broadcast telemetry to UI
        if (onTelemetryChangeRef.current) {
          const normDegrees = Math.round((((rotationRef.current.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * (180 / Math.PI));
          onTelemetryChangeRef.current({
            rotationY: normDegrees,
            finish,
            isExploded: exploded,
          });
        }
      }

      renderer.render(scene, camera);
    };

    // Viewport-based IntersectionObserver to freeze GPU/CPU when Hero scrolls off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          isVisible = true;
          startLoop();
        } else {
          isVisible = false;
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    startLoop();

    return () => {
      observer.disconnect();
      stopLoop();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      persimmonMaterial.dispose();
      periwinkleMaterial.dispose();
      carbonMaterial.dispose();
      collarMaterial.dispose();
      internalBushingMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [scrollProgress, interactivePointer, autoRotateSpeed, exploded, finish, wireframe, brand.primaryColor, brand.secondaryColor]);

  // Pointer drag event handlers for 360° tactile orbit
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    setCursorState('grabbing');
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    pointerStartRef.current = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.007;
    velocityRef.current = {
      x: deltaX * sensitivity,
      y: deltaY * sensitivity,
    };
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setCursorState('grab');
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already lost
    }
  }, []);

  return (
    <div
      ref={mountRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-full min-h-[260px] sm:min-h-[360px] lg:min-h-[480px] select-none touch-pan-y lg:touch-none ${
        cursorState === 'grabbing' ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      aria-label="Interactive 3D Sculptural Training Object — Drag to rotate in 360 degrees"
    />
  );
};

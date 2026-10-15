import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface SculpturalDumbbellCanvasProps {
  scrollProgress?: number; // 0 to 1 for scroll-driven rotation
  interactivePointer?: boolean;
  className?: string;
  autoRotateSpeed?: number;
}

export const SculpturalDumbbellCanvas: React.FC<SculpturalDumbbellCanvasProps> = ({
  scrollProgress = 0,
  interactivePointer = true,
  className = '',
  autoRotateSpeed = 0.4,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotationRef = useRef<{ x: number; y: number; z: number }>({ x: 0.15, y: -0.4, z: 0.1 });
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isReducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();

    // 70mm product photography camera
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 5.2);

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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const dumbbellGroup = new THREE.Group();
    scene.add(dumbbellGroup);

    // MATERIALS
    const persimmonMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FF6747'),
      metalness: 0.22,
      roughness: 0.36,
      clearcoat: 0.35,
      clearcoatRoughness: 0.18,
      reflectivity: 0.55,
    });

    const periwinkleMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#8177FF'),
      metalness: 0.22,
      roughness: 0.36,
      clearcoat: 0.35,
      clearcoatRoughness: 0.18,
      reflectivity: 0.55,
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#20231F'),
      metalness: 0.75,
      roughness: 0.55,
    });

    const collarMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3A3F39'),
      metalness: 0.88,
      roughness: 0.22,
    });

    // GEOMETRY
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

    // Soft Contact Shadow Plane
    const shadowGeom = new THREE.PlaneGeometry(3.5, 2.5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.95;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Volumetric Studio Atmospheric Dust Specks (Kinetic Awwwards Polish)
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
      color: 0x8177FF,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // LIGHTING (PULSEFORM Bible spec)
    const ambientLight = new THREE.AmbientLight('#FAF8F4', 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight('#FFFFFF', 3.0);
    keyLight.position.set(-3.5, 4.0, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#DDE8F8', 1.5);
    fillLight.position.set(3.5, 2.0, 2.0);
    scene.add(fillLight);

    const bounceLight = new THREE.DirectionalLight('#FF6747', 0.85);
    bounceLight.position.set(0, -2.5, -1.0);
    scene.add(bounceLight);

    const rimLight = new THREE.DirectionalLight('#FFFFFF', 1.2);
    rimLight.position.set(0, 3.5, -3.0);
    scene.add(rimLight);

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactivePointer || isReducedMotionRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
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

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Atmospheric dust drift
      particles.rotation.y = time * 0.03;
      particles.rotation.x = Math.sin(time * 0.05) * 0.05;

      // Dumbbell natural physical float
      dumbbellGroup.position.y = Math.sin(time * 1.3) * 0.045;

      const targetMouseX = mouseRef.current.x * 0.28;
      const targetMouseY = mouseRef.current.y * 0.22;

      if (!isReducedMotionRef.current) {
        const baseAngle = -0.4 + (scrollProgress * Math.PI * 1.5) + (time * autoRotateSpeed * 0.22);
        targetRotationRef.current.y = baseAngle + targetMouseX;
        targetRotationRef.current.x = 0.22 - targetMouseY;
        targetRotationRef.current.z = 0.08 + Math.sin(time * 0.8) * 0.04;

        dumbbellGroup.rotation.x += (targetRotationRef.current.x - dumbbellGroup.rotation.x) * 0.08;
        dumbbellGroup.rotation.y += (targetRotationRef.current.y - dumbbellGroup.rotation.y) * 0.08;
        dumbbellGroup.rotation.z += (targetRotationRef.current.z - dumbbellGroup.rotation.z) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      persimmonMaterial.dispose();
      periwinkleMaterial.dispose();
      carbonMaterial.dispose();
      collarMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [scrollProgress, interactivePointer, autoRotateSpeed]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D Sculptural Training Object"
    />
  );
};

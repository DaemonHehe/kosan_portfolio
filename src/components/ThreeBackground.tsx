import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float time;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float waveX = sin((pos.y + time * 0.6) * 2.5) * 0.15;
    float waveY = cos((pos.x + time * 0.4) * 2.0) * 0.12;
    pos.z += waveX + waveY;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  vec3 palette(float t) {
    vec3 a = vec3(0.05, 0.07, 0.12);
    vec3 b = vec3(0.02, 0.18, 0.35);
    vec3 c = vec3(0.75, 0.45, 0.20);
    vec3 d = vec3(0.30, 0.20, 0.60);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    float gradient = smoothstep(0.0, 1.0, vUv.y);
    float wave = sin((vUv.x + time * 0.08) * 6.0) * 0.15;
    float mixValue = clamp(gradient + wave, 0.0, 1.0);
    vec3 topColor = vec3(0.02, 0.12, 0.20);
    vec3 bottomColor = palette(vUv.x + time * 0.04);
    vec3 color = mix(bottomColor, topColor, mixValue);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return undefined;

    const { clientWidth, clientHeight } = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(8, 6, 100, 100);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -0.2;
    plane.rotation.y = -0.4;
    scene.add(plane);

    let animationFrame = 0;
    const animate = () => {
      material.uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) {
        return;
      }
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height || 1;
      camera.updateProjectionMatrix();
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(handleResize)
        : null;
    resizeObserver?.observe(containerRef.current);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
};

export default ThreeBackground;

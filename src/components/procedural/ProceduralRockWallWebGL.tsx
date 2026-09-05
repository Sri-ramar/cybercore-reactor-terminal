import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ThemeConfig } from '../../types';

interface ProceduralRockWallWebGLProps {
  theme: ThemeConfig;
  powerOutput: number;
}

export const ProceduralRockWallWebGL: React.FC<ProceduralRockWallWebGLProps> = ({
  theme,
  powerOutput,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(1600, 900);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.objectFit = 'cover';

    // 3. Procedural Shader Material for Wet Slate Rock Wall with Carved Relief
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;

      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec3 uPrimaryColor;
      uniform vec3 uSecondaryColor;
      uniform float uPower;
      uniform vec2 uResolution;

      // 2D Hash function for noise
      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      // Simplex-style 2D Perlin noise
      float perlinNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y
        );
      }

      // Fractional Brownian Motion (fBm) for deep rock strata
      float fbm(vec2 p) {
        float total = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        for (int i = 0; i < 6; i++) {
          total += amp * perlinNoise(p * freq);
          freq *= 2.05;
          amp *= 0.48;
        }
        return total;
      }

      // Cellular Voronoi noise for rock fissures & micro-cracks
      float voronoiCracks(vec2 p) {
        vec2 n = floor(p);
        vec2 f = fract(p);
        float minDist = 1.0;
        for (int j = -1; j <= 1; j++) {
          for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash2(n + g) * 0.5 + 0.5;
            vec2 r = g + o - f;
            float d = dot(r, r);
            minDist = min(minDist, d);
          }
        }
        return sqrt(minDist);
      }

      // Procedural height map combining strata, cracks, and carved stepped stone reliefs
      float getRockHeight(vec2 uv) {
        vec2 p = uv * vec2(16.0, 9.0) * 0.8;
        
        // Natural rock base height
        float rock = fbm(p);
        
        // High frequency granite grain
        float grain = perlinNoise(p * 8.0) * 0.12;

        // Fissures and cracks
        float cracks = smoothstep(0.08, 0.0, voronoiCracks(p * 1.8)) * 0.45;

        // Stepped horizontal slate slabs
        float band1 = smoothstep(0.24, 0.25, uv.y) - smoothstep(0.48, 0.49, uv.y);
        float band2 = smoothstep(0.55, 0.56, uv.y) - smoothstep(0.78, 0.79, uv.y);
        float steppedPanels = (band1 + band2) * 0.25;

        // Central circular recess bed for orb well
        vec2 cUv = (uv - vec2(0.5, 0.5)) * vec2(16.0/9.0, 1.0);
        float distToCenter = length(cUv);
        float centerRecess = smoothstep(0.38, 0.35, distToCenter) * 0.4;

        return rock + grain - cracks + steppedPanels - centerRecess;
      }

      void main() {
        vec2 uv = vUv;
        
        // Compute procedural normal using derivatives
        float h = getRockHeight(uv);
        float hx = getRockHeight(uv + vec2(0.0015, 0.0));
        float hy = getRockHeight(uv + vec2(0.0, 0.0015));
        
        vec3 normal = normalize(vec3((h - hx) * 45.0, (h - hy) * 45.0, 1.0));

        // Base Dark Wet Slate / Granite Colors
        vec3 darkStone = vec3(0.035, 0.045, 0.038);
        vec3 midStone = vec3(0.075, 0.095, 0.078);
        vec3 mossGravel = vec3(0.09, 0.13, 0.08);

        // Mix stone albedo based on height and fbm
        float strata = clamp(h * 0.8 + 0.3, 0.0, 1.0);
        vec3 albedo = mix(darkStone, midStone, strata);

        // Damp moss patches in low crevices
        float creviceMoss = smoothstep(-0.2, 0.4, fbm(uv * 12.0)) * (1.0 - strata);
        albedo = mix(albedo, mossGravel, creviceMoss * 0.6);

        // ========================================================
        // 3D VOLUMETRIC LIGHTING ENGINE
        // ========================================================

        // 1. Ambient Directional Top-Left Key Light (Cool Sky)
        vec3 lightDirKey = normalize(vec3(-0.4, 0.7, 0.6));
        float diffKey = max(dot(normal, lightDirKey), 0.0);
        vec3 keyLight = vec3(0.5, 0.6, 0.55) * diffKey * 0.5;

        // 2. Bioluminescent Core Point Light (Center 0.5, 0.5)
        vec3 corePos = vec3(0.5, 0.5, 0.15);
        vec3 fragPos = vec3(uv.x, uv.y, h * 0.08);
        vec3 coreLightVec = corePos - fragPos;
        float distToCore = length(coreLightVec * vec3(16.0/9.0, 1.0, 1.0));
        vec3 coreLightDir = normalize(coreLightVec);
        
        float coreDiff = max(dot(normal, coreLightDir), 0.0);
        float coreAtten = 1.0 / (1.0 + distToCore * 3.5 + distToCore * distToCore * 5.0);
        
        // Pulse intensity
        float pulse = 0.85 + 0.15 * sin(uTime * 2.5) + (uPower / 100.0) * 0.3;
        vec3 bioLight = mix(uPrimaryColor, uSecondaryColor, 0.3) * coreDiff * coreAtten * pulse * 2.2;

        // 3. Specular Sheen (Wet rock glint from core + mouse)
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(coreLightDir + viewDir);
        float spec = pow(max(dot(normal, halfDir), 0.0), 28.0) * coreAtten * 1.5;
        vec3 specColor = vec3(0.9, 1.0, 0.85) * spec;

        // 4. Interactive Mouse Cursor Soft Flashlight
        vec3 mousePos = vec3(uMouse.x, uMouse.y, 0.2);
        vec3 mouseLightVec = mousePos - fragPos;
        float mouseDist = length(mouseLightVec * vec3(16.0/9.0, 1.0, 1.0));
        float mouseAtten = smoothstep(0.4, 0.0, mouseDist);
        vec3 mouseLight = vec3(0.6, 0.8, 0.7) * max(dot(normal, normalize(mouseLightVec)), 0.0) * mouseAtten * 0.4;

        // Combine All Lighting Passes
        vec3 finalColor = albedo * (vec3(0.12) + keyLight + bioLight + mouseLight) + specColor;

        // Cinematic Perimeter Vignette
        float vignette = 1.0 - smoothstep(0.45, 0.95, length((uv - 0.5) * vec2(1.2, 1.0)));
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Convert hex theme colors to Three.js RGB
    const primaryColor = new THREE.Color(theme.primary);
    const secondaryColor = new THREE.Color(theme.secondary);

    const uniforms = {
      uTime: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uPrimaryColor: { value: primaryColor },
      uSecondaryColor: { value: secondaryColor },
      uPower: { value: powerOutput },
      uResolution: { value: new THREE.Vector2(1600, 900) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse Tracking for Interactive 3D Lighting
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uMouse.value.set(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;
      uniforms.uPower.value = powerOutput;
      uniforms.uPrimaryColor.value.set(theme.primary);
      uniforms.uSecondaryColor.value.set(theme.secondary);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, powerOutput]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
    />
  );
};

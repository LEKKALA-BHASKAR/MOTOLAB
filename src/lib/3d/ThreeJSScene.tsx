
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeJSWheelProps {
  size?: number;
  containerClass?: string;
  color?: string;
}

export const ThreeJSWheel: React.FC<ThreeJSWheelProps> = ({ 
  size = 100, 
  containerClass = "w-24 h-24",
  color = 0xFFD700 // Default to brand yellow
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const wheelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create wheel group
    const wheelGroup = new THREE.Group();
    scene.add(wheelGroup);
    wheelRef.current = wheelGroup;

    // Create wheel rim
    const rimGeometry = new THREE.TorusGeometry(1.5, 0.15, 16, 100);
    const rimMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      specular: 0x666666,
      shininess: 100
    });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    wheelGroup.add(rim);

    // Create spokes with enhanced appearance
    const spokeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 8);
    const spokeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x999999,
      specular: 0xffffff,
      shininess: 80
    });
    
    for (let i = 0; i < 8; i++) {
      const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
      spoke.rotation.z = (Math.PI / 8) * i;
      wheelGroup.add(spoke);
    }

    // Create tire tread
    const treadGeometry = new THREE.TorusGeometry(1.6, 0.2, 16, 100);
    const treadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x111111,
  
    });
    const tread = new THREE.Mesh(treadGeometry, treadMaterial);
    wheelGroup.add(tread);

    // Create hub
    const hubGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 16);
    const hubMaterial = new THREE.MeshPhongMaterial({ 
      color,
      specular: 0xffffff,
      shininess: 100
    });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    hub.rotation.x = Math.PI / 2;
    wheelGroup.add(hub);

    // Hub cap
    const hubCapGeometry = new THREE.CircleGeometry(0.25, 16);
    const hubCapMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xdddddd,
      specular: 0xffffff,
      shininess: 100
    });
    const hubCap = new THREE.Mesh(hubCapGeometry, hubCapMaterial);
    hubCap.position.set(0, 0, 0.15);
    hubCap.rotation.x = Math.PI / 2;
    wheelGroup.add(hubCap);

    // Animation loop with variable speed
    let rotationSpeed = 0.01;
    let time = 0;

    const animate = () => {
      time += 0.01;
      // Sine wave for oscillating rotation speed - more realistic
      rotationSpeed = 0.01 + Math.sin(time) * 0.005;
      
      if (wheelRef.current) {
        wheelRef.current.rotation.y += rotationSpeed;
        // Add slight wobble
        wheelRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
      }
      
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [size, color]);

  return <div ref={mountRef} className={containerClass} />;
};

interface ThreeJSHelmetProps {
  size?: number;
  containerClass?: string;
  color?: string;
  visorColor?: string;
}

export const ThreeJSHelmet: React.FC<ThreeJSHelmetProps> = ({ 
  size = 200, 
  containerClass = "w-48 h-48",
  color = 0x000000,
  visorColor = 0xFFD700
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const helmetRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add a point light to enhance reflections
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(2, 2, 4);
    scene.add(pointLight);

    // Create helmet group
    const helmetGroup = new THREE.Group();
    scene.add(helmetGroup);
    helmetRef.current = helmetGroup;

    // Create the main helmet body with enhanced materials
    const helmetGeometry = new THREE.SphereGeometry(1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const helmetMaterial = new THREE.MeshPhongMaterial({ 
      color, 
      shininess: 100,
      specular: 0x555555,
      reflectivity: 1
    });
    const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
    helmet.rotation.x = Math.PI / 2;
    helmetGroup.add(helmet);

    // Create visor with more realistic appearance
    const visorGeometry = new THREE.SphereGeometry(1.55, 32, 16, 0, Math.PI, Math.PI * 0.2, Math.PI * 0.3);
    const visorMaterial = new THREE.MeshPhongMaterial({ 
      color: visorColor,
      opacity: 0.7,
      transparent: true,
      shininess: 100,
      specular: 0xffffff,
      reflectivity: 1
    });
    const visor = new THREE.Mesh(visorGeometry, visorMaterial);
    visor.rotation.x = Math.PI / 2;
    visor.position.z = 0.2;
    helmetGroup.add(visor);

    // Add visor frame
    const visorFrameGeometry = new THREE.TorusGeometry(1.55, 0.05, 16, 100, Math.PI * 0.9);
    const visorFrameMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x444444,
      shininess: 80,
      specular: 0x888888
    });
    const visorFrame = new THREE.Mesh(visorFrameGeometry, visorFrameMaterial);
    visorFrame.rotation.x = Math.PI * 1.5;
    visorFrame.position.z = 0.3;
    visorFrame.position.y = -0.2;
    helmetGroup.add(visorFrame);

    // Create bottom rim
    const rimGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100, Math.PI * 2);
    const rimMaterial = new THREE.MeshPhongMaterial({ 
      color: visorColor,
      shininess: 80,
      specular: 0xffffff
    });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -1;
    helmetGroup.add(rim);

    // Add ventilation details
    const ventGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.1);
    const ventMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    for (let i = 0; i < 3; i++) {
      const vent = new THREE.Mesh(ventGeometry, ventMaterial);
      vent.position.set(i * 0.4 - 0.4, 0.7, -1.3);
      vent.rotation.x = Math.PI * 0.25;
      helmetGroup.add(vent);
    }

    // Add brand logo (small circle)
    const logoGeometry = new THREE.CircleGeometry(0.2, 16);
    const logoMaterial = new THREE.MeshPhongMaterial({ 
      color: visorColor,
      shininess: 100
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.8, -1.45);
    logo.rotation.x = Math.PI * 0.25;
    helmetGroup.add(logo);

    // Animation loop with realistic motion
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      if (helmetRef.current) {
        // Main rotation
        helmetRef.current.rotation.y += 0.01;
        
        // Add subtle floating motion
        helmetRef.current.position.y = Math.sin(time) * 0.05;
        
        // Slight tilt back and forth
        helmetRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
      }
      
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [size, color, visorColor]);

  return <div ref={mountRef} className={containerClass} />;
};

// New 3D component for bike accessory (chain sprocket)
interface ThreeJSSprocketProps {
  size?: number;
  containerClass?: string;
  color?: string;
}

export const ThreeJSSprocket: React.FC<ThreeJSSprocketProps> = ({
  size = 200,
  containerClass = "w-48 h-48",
  color = 0xFFD700
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sprocketRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create sprocket group
    const sprocketGroup = new THREE.Group();
    scene.add(sprocketGroup);
    sprocketRef.current = sprocketGroup;

    // Create base disc
    const baseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x555555,
      specular: 0x999999,
      shininess: 80
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.rotation.x = Math.PI / 2;
    sprocketGroup.add(base);

    // Create center hole
    const holeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
    const holeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x222222,
      specular: 0x444444,
      shininess: 60
    });
    const hole = new THREE.Mesh(holeGeometry, holeMaterial);
    hole.rotation.x = Math.PI / 2;
    sprocketGroup.add(hole);

    // Create teeth
    const teethCount = 18;
    for (let i = 0; i < teethCount; i++) {
      const angle = (Math.PI * 2 / teethCount) * i;
      const toothGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.2);
      const toothMaterial = new THREE.MeshPhongMaterial({ 
        color,
        specular: 0xffffff,
        shininess: 100
      });
      const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
      tooth.position.x = Math.cos(angle) * 1.5;
      tooth.position.y = Math.sin(angle) * 1.5;
      tooth.rotation.z = angle;
      sprocketGroup.add(tooth);
    }

    // Create lightening holes
    const lighteningHoleCount = 6;
    for (let i = 0; i < lighteningHoleCount; i++) {
      const angle = (Math.PI * 2 / lighteningHoleCount) * i;
      const radius = 0.9;
      const holeGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 16);
      const holeMat = new THREE.MeshPhongMaterial({ color: 0x111111 });
      const lightHole = new THREE.Mesh(holeGeo, holeMat);
      lightHole.position.x = Math.cos(angle) * radius;
      lightHole.position.y = Math.sin(angle) * radius;
      lightHole.rotation.x = Math.PI / 2;
      sprocketGroup.add(lightHole);
    }

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      if (sprocketRef.current) {
        // Rotate the sprocket
        sprocketRef.current.rotation.z += 0.01;
        
        // Add some wobble
        sprocketRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        sprocketRef.current.rotation.y = Math.cos(time * 0.5) * 0.1;
      }
      
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [size, color]);

  return <div ref={mountRef} className={containerClass} />;
};

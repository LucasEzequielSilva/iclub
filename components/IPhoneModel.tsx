"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, Component, type ReactNode } from "react";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/iphone.glb");
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    scene.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const distance = (maxDim / (2 * Math.tan(fov / 2))) * 1.35;

    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  return (
    <group ref={groupRef} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  );
}

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <Center>
          <Model />
        </Center>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={5}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}

export default function IPhoneModel() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setSupported(false);
    } catch {
      setSupported(false);
    }
  }, []);

  if (!supported) return null;

  return (
    <div className="w-full h-[500px] lg:h-full">
      <WebGLErrorBoundary>
        <Scene />
      </WebGLErrorBoundary>
    </div>
  );
}

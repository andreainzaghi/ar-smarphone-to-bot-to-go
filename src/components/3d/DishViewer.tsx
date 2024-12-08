import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';

function Dish() {
  return (
    <mesh>
      <boxGeometry args={[1, 0.2, 1]} />
      <meshStandardMaterial color="#f3f3f3" />
      {/* Simulated food on top of plate */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#e6a23c" />
      </mesh>
      {/* Garnish */}
      <mesh position={[0.3, 0.4, 0.3]} scale={[0.1, 0.1, 0.1]}>
        <sphereGeometry />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
    </mesh>
  );
}

export function DishViewer() {
  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden">
      <Canvas shadows camera={{ position: [4, 4, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Dish />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
}
// import { useEffect, useRef, useState } from 'react';
// import { XCircle } from 'lucide-react';
// import { Canvas, useThree, ThreeEvent } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import * as THREE from 'three';

// interface ARViewProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// function Dish({ worldPosition }: { worldPosition: THREE.Vector3 }) {
//   const { camera } = useThree();
//   const dishRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     if (dishRef.current) {
//       dishRef.current.position.copy(worldPosition);

//       const lookAtPos = new THREE.Vector3(
//         camera.position.x,
//         dishRef.current.position.y,
//         camera.position.z
//       );
//       dishRef.current.lookAt(lookAtPos);
//     }
//   }, [worldPosition, camera.position]);

//   return (
//     <group ref={dishRef}>
//       <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[2, 2]} />
//         <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
//       </mesh>

//       <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
//         <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
//         <meshStandardMaterial color="#f3f3f3" />
//       </mesh>

//       <mesh position={[0, 0.2, 0]} castShadow>
//         <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
//         <meshStandardMaterial color="#e6a23c" roughness={0.7} metalness={0.2} />
//       </mesh>

//       <group position={[0.2, 0.3, 0.2]}>
//         <mesh castShadow scale={[0.1, 0.1, 0.1]}>
//           <sphereGeometry />
//           <meshStandardMaterial color="#4caf50" roughness={0.5} />
//         </mesh>
//         <mesh
//           position={[0.05, 0.05, 0]}
//           castShadow
//           scale={[0.08, 0.08, 0.08]}
//         >
//           <sphereGeometry />
//           <meshStandardMaterial color="#4caf50" roughness={0.5} />
//         </mesh>
//       </group>
//     </group>
//   );
// }

// function Scene({ onClick }: { onClick: (point: THREE.Vector3) => void }) {
//   const { camera, raycaster } = useThree();
//   const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

//   const handleClick = (event: ThreeEvent<MouseEvent>) => {
//     event.stopPropagation();

//     const canvas = event.target as HTMLCanvasElement;
//     if (!canvas) return;

//     const x = (event.nativeEvent.offsetX / canvas.clientWidth) * 2 - 1;
//     const y = -(event.nativeEvent.offsetY / canvas.clientHeight) * 2 + 1;

//     raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

//     const intersection = new THREE.Vector3();
//     if (raycaster.ray.intersectPlane(groundPlane, intersection)) {
//       onClick(intersection);
//     }
//   };

//   return (
//     <>
//       <directionalLight
//         position={[5, 5, 5]}
//         castShadow
//         intensity={1}
//         shadow-mapSize={[1024, 1024]}
//       />
//       <ambientLight intensity={0.5} />
//       <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={handleClick} visible={false}>
//         <planeGeometry args={[100, 100]} />
//         <meshBasicMaterial transparent opacity={0} />
//       </mesh>
//     </>
//   );
// }

// export function ARView({ open, onOpenChange }: ARViewProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [error, setError] = useState<string>('');
//   const [worldPosition, setWorldPosition] = useState<THREE.Vector3>(
//     new THREE.Vector3(0, 0, -2)
//   );
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkDevice = () => {
//       const isMobileDevice = /mobile|tablet|android|ipad|iphone|ipod/.test(
//         navigator.userAgent.toLowerCase()
//       );
//       setIsMobile(isMobileDevice);
//     };

//     checkDevice();
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   const startCamera = async () => {
//     try {
//       const constraints: MediaStreamConstraints = {
//         video: {
//           facingMode: isMobile ? 'environment' : 'user',
//           width: { ideal: 1920 },
//           height: { ideal: 1080 },
//         },
//         audio: false,
//       };

//       const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//       setError('');
//     } catch (err) {
//       setError('Unable to access camera. Please ensure camera permissions are granted.');
//       console.error(err);
//     }
//   };

//   const stopCamera = () => {
//     stream?.getTracks().forEach((track) => track.stop());
//     setStream(null);
//   };

//   useEffect(() => {
//     if (open) {
//       startCamera();
//     } else {
//       stopCamera();
//     }
//     return () => stopCamera();
//   }, [open]);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
// <DialogContent className="sm:max-w-[600px] h-[50vh]">
// <DialogHeader>
//           <DialogTitle>Augmented Reality View</DialogTitle>
//         </DialogHeader>

//         <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
//           {error ? (
//             <div className="absolute inset-0 flex items-center justify-center text-center p-4">
//               <p className="text-destructive">{error}</p>
//             </div>
//           ) : (
//             <>
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0">
//                 <Canvas
//                   shadows
//                   camera={{
//                     position: [0, 2, 0],
//                     fov: 75,
//                     near: 0.1,
//                     far: 1000,
//                   }}
//                 >
//                   <Scene onClick={setWorldPosition} />
//                   <Dish worldPosition={worldPosition} />
//                   <OrbitControls
//                     enablePan={false}
//                     enableZoom={false}
//                     maxPolarAngle={Math.PI / 2}
//                     minPolarAngle={Math.PI / 4}
//                   />
//                 </Canvas>
//               </div>
//             </>
//           )}

//           <div className="absolute top-2 right-2">
//             <Button
//               variant="destructive"
//               size="icon"
//               onClick={() => onOpenChange(false)}
//             >
//               <XCircle className="h-4 w-4" />
//             </Button>
//           </div>

//           <div className="absolute bottom-4 left-4 right-4">
//             <p className="text-white text-sm text-center bg-gray-800/50 rounded-lg p-2">
//               Tap anywhere to place the dish in the real world
//             </p>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
// import React from 'react';

export function ARView() {
  return (
    <div className="h-screen w-full">
      <iframe
        src="/index.html"
        title="AR View"
        className="w-full h-full"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

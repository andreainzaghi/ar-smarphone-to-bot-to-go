import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { OrbitControls } from 'three-stdlib';

import { Plus, ViewIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { useNavigate } from 'react-router-dom';
import { MenuItem as MenuItemType } from '@/types';

function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || window.innerWidth;
    const height = mountRef.current?.clientHeight || window.innerHeight;

    // Creazione della scena, camera e renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Aggiungi la telecamera alla scena
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    // Caricamento e applicazione di una texture come sfondo
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('spag.jpg'); // Sostituisci con il percorso reale della tua immagine

    const planeGeometry = new THREE.PlaneGeometry(2.8, 2.8); // Dimensione del piano
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide, // Rendi visibile il piano da entrambi i lati
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -3); // Posiziona il piano davanti alla telecamera
    plane.material.depthWrite = false;

    // Aggiungi il piano come figlio della telecamera
    camera.add(plane);

    // Luci avanzate nella scena
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    hemisphereLight.position.set(0, 20, 0);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Controlli orbitanti
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.target.set(0, 1, 0);

    // Caricamento del modello GLTF
    const loader = new GLTFLoader();
    const gltfUrl = 'model.gltf'; // Sostituisci con il percorso reale del modello
    loader.load(
      gltfUrl,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 1, 0);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Errore durante il caricamento del GLTF:', error);
      }
    );

    // Aggiungi il renderer al DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = mountRef.current?.clientWidth || window.innerWidth;
      const height = mountRef.current?.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [showSpaghettiModal, setShowSpaghettiModal] = useState(false);

  const handleButtonClick = () => {
    if (item.name.includes('Quinoa')) {
      navigate('/ar-view');
    } else if (item.name.includes('Spaghetti')) {
      setShowSpaghettiModal(true);
    } else {
      console.log('Né navigazione AR né modale Three.js applicabile per questo elemento.');
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-24 rounded-t-lg"
          />
          {item.dietary.vegetarian && (
            <span className="absolute top-1 right-1 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              Vegetarian
            </span>
          )}

          {/* Singolo pulsante con comportamento condizionale */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1 left-1"
            onClick={handleButtonClick}
          >
            <ViewIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium truncate">{item.name}</h3>
            <span className="text-sm font-bold">${item.price}</span>
          </div>

          <div className="mt-1 text-xs text-muted-foreground truncate">
            {item.description}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs">{item.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({item.reviews})
              </span>
            </div>
            <Button size="sm" onClick={() => addItem(item)}>
              <Plus className="h-6 w-9" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Modale Three.js */}
      {showSpaghettiModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setShowSpaghettiModal(false)}
        >
          <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
            <ThreeScene />
          </div>
        </div>
      )}
    </>
  );
}

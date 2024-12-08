import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import "aframe";
import "aframe-extras";

interface ARViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ARView({ open, onOpenChange }: ARViewProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [cubes, setCubes] = useState<string[]>([]);

  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = /mobile|tablet|android|ipad|iphone|ipod/.test(
        navigator.userAgent.toLowerCase()
      );
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Aggiungi un cubo nello spazio
  const addCube = (event: any) => {
    const position = event.detail.intersection.point;
    setCubes((prevCubes) => [
      ...prevCubes,
      `${position.x} ${position.y + 0.5} ${position.z}`, // Posiziona il cubo sopra il piano
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Augmented Reality View</DialogTitle>
        </DialogHeader>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
          >
            <XCircle className="h-4 w-4" />
          </button>

          {/* Integrazione di A-Frame */}
          <a-scene
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Luce ambientale */}
            <a-light type="ambient" intensity="0.8"></a-light>

            {/* Luce direzionale */}
            <a-light
              type="directional"
              position="0 2 2"
              intensity="0.5"
            ></a-light>

            {/* Piano per interazioni */}
            <a-plane
              position="0 0 0"
              rotation="-90 0 0"
              width="10"
              height="10"
              color="#cccccc"
              shadow="receive: true"
              event-set__click="_event: click; color: #ff0000"
              class="clickable"
            ></a-plane>

            {/* Cubi posizionati */}
            {cubes.map((pos, index) => (
              <a-box
                key={index}
                position={pos}
                material="color: orange"
                shadow="cast: true"
              ></a-box>
            ))}

            {/* Fotocamera */}
            <a-camera
              position="0 1.6 0"
              cursor="rayOrigin: mouse"
              raycaster="objects: .clickable"
              event-set__click="_event: click; color: yellow"
              onClick={addCube}
            ></a-camera>
          </a-scene>
        </div>
      </DialogContent>
    </Dialog>
  );
}

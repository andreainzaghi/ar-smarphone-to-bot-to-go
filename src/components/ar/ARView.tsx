import "aframe";
// import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { XCircle } from "lucide-react";

interface ARViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ARView({ open, onOpenChange }: ARViewProps) {
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

          {/* Integrazione A-Frame */}
          <a-scene
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false;"
            style={{ width: "100%", height: "100%" }}
          >
            <a-light type="ambient" intensity="0.8"></a-light>
            <a-light type="directional" position="0 1 1" intensity="0.5"></a-light>
            <a-box
              position="0 0.5 -1"
              rotation="0 45 0"
              material="color: orange"
              shadow="cast: true"
              animation="property: rotation; to: 0 405 0; loop: true; dur: 5000"
            ></a-box>
            <a-plane
              position="0 0 0"
              rotation="-90 0 0"
              width="10"
              height="10"
              color="#cccccc"
              shadow="receive: true"
            ></a-plane>
            <a-camera gps-camera></a-camera>
          </a-scene>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.RefObject<THREE.Group>
      };
      mesh: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: [number, number, number];
        rotation?: [number, number, number];
        scale?: [number, number, number] | number;
        onClick?: () => void;
        onPointerOver?: () => void;
        onPointerOut?: () => void;
      };
      boxGeometry: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        args?: [number, number, number]
      };
      meshStandardMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string | number;
        metalness?: number;
        roughness?: number;
      };
      ambientLight: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        intensity?: number;
      };
      spotLight: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: [number, number, number];
        angle?: number;
        penumbra?: number;
      };
      pointLight: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: [number, number, number];
      };
    }
  }
}

export {}; 
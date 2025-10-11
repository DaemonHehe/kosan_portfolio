// src/global.d.ts (or similar)

export {}; // Keeps the file as a module

// ⚠️ Remove the file imports if assets are in the public folder:
// declare module '*.glb';
// declare module '*.png';

// Declaration for the meshline library extensions (ESSENTIAL)
declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

// Declaration for React Three Fiber JSX elements (ESSENTIAL)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
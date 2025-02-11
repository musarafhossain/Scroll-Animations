import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function Jacket(props) {
  const { nodes, materials } = useGLTF('/jacket.glb');
  const [scale, setScale] = useState([0.8, 0.8, 0.8]); // Default scale
  const [position, setPosition] = useState([0, -4, 0]);

  // Handle window resizing and adjust scale dynamically
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Dynamically adjust scale and position based on screen width
      if (width < 768) { // Mobile devices
        setScale([0.6, 0.6, 0.6]);
        setPosition([0, -3, 0]);
      } else if (width < 1024) { // Tablet devices
        setScale([0.7, 0.7, 0.7]);
        setPosition([0, -4, 0]);
      } else { // Desktop devices
        setScale([0.8, 0.8, 0.8]);
        setPosition([0, -4, 0]);
      }
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Initial call to set scale based on current window size
    handleResize();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <group position={position} scale={scale} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.T_Jacket1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.T_Jacket1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.T_Jacket1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_3.geometry}
            material={materials.T_Jacket1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_4.geometry}
            material={materials.T_Jacket2}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/jacket.glb');

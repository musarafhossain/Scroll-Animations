import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Jacket } from './Jacket';

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ progress }) => {
    const cameraRef = useRef(null);

    useFrame(() => {
        cameraRef.current.lookAt(0, 0, 0);
    });

    useEffect(() => {
        const updateCamPos = () => {
            const positions = [
                [0, 0, 7],
                [2.3, 0.87, -4.2],
                [0, 2.5, 3.6],
            ];

            // Handle when progress reaches 1, avoid going out of bounds
            if (progress >= 1) {
                gsap.to(cameraRef.current.position, {
                    x: 0,
                    y: 2.5,
                    z: 3.6,
                    duration: 0.5,
                    ease: 'power1.out',
                });
            } else {
                const segmentProgress = 1 / 3;
                const segmentIndex = Math.floor(progress / segmentProgress);
                const percentage = (progress % segmentProgress) / segmentProgress;

                // Ensure that we don't go out of bounds
                const nextSegmentIndex = Math.min(segmentIndex + 1, positions.length - 1);

                const [startX, startY, startZ] = positions[segmentIndex];
                const [endX, endY, endZ] = positions[nextSegmentIndex];

                const x = startX + (endX - startX) * percentage;
                const y = startY + (endY - startY) * percentage;
                const z = startZ + (endZ - startZ) * percentage;

                gsap.to(cameraRef.current.position, {
                    x: x,
                    y: y,
                    z: z,
                    duration: 0.5,
                    ease: 'power1.out',
                });
            }
        };

        updateCamPos();
    }, [progress]); // Only trigger when progress changes

    return (
        <>
            {/* Uncomment OrbitControls if you want interactive control over the camera */}
            {/* <OrbitControls /> */}
            <PerspectiveCamera
                ref={cameraRef}
                fov={45}
                near={0.1}
                far={100}
                makeDefault
                position={[0, 0, 7]}
            />
            <Environment preset="lobby" />
            <Jacket />
            {/* Uncomment if you want to visualize axes */}
            {/* <axesHelper args={[500]} /> */}
        </>
    );
};

export default Scene;

/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Ivanix88 (https://sketchfab.com/Ivanix88)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/christmas-ball-36868988285f4b60b3e389e1aa1bab3f
Title: Christmas Ball
*/

import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { events, useFrame, useThree } from "@react-three/fiber";
import { a } from '@react-spring/three';

import xmasScene from '../assets/3d/christmas_ball.glb';

const Xmas = ({isRotating, setIsRotating, ...props}) => {
    const xmasballRef = useRef();

    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(xmasScene);

    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;

    const handlePointerDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(true);

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      lastX.current = clientX;
    }

    const handlePointerUp = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(false);
    }

    const handlePointerMove = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if(isRotating) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = (clientX - lastX.current) / viewport.width;

        xmasballRef.current.rotation.y += delta * 0.01 * Math.PI;
        lastX.current = clientX;
        rotationSpeed.current = delta * 0.01 * Math.PI;
      }
    }

    const handleKeyDown = (e) => {
      if(e.key === 'ArrowLeft') {
        if(!isRotating) setIsRotating(true);
        xmasballRef.current.rotation.y += 0.01 * Math.PI;
      } else if(e.key === 'ArrowRight') {
        if(!isRotating) setIsRotating(true);
        xmasballRef.current.rotation.y -= 0.01 * Math.PI;
      }
    }

    const handleKeyUp = (e) => {
      if(e.key === 'ArrowLeft' || e.key === 'ArrowRight')
        setIsRotating(false);
    }

    useFrame(() => {
      if(!isRotating){
        rotationSpeed.current *= dampingFactor;

        if(Math.abs(rotationSpeed.current) < 0.001) {
          rotationSpeed.current = 0;
        }

        xmasballRef.current.rotation.y += rotationSpeed.current;
      } else {
        const rotation = xmasballRef.current.rotation.y;
        
        const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        switch (true) {
          case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
            setCurrentStage(4);
            break;
          case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
            setCurrentStage(3);
            break;
          case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
            setCurrentStage(2);
            break;
          case normalizedRotation >= 3.25 && normalizedRotation <= 4.75:
            setCurrentStage(1);
            break;
          default:
            setCurrentStage(null);
        }
      }
    })

    useEffect(() => {
      const canvas = gl.domElement;
      canvas.addEventListener('pointerdown', handlePointerDown);
      canvas.addEventListener('pointerup', handlePointerUp);
      canvas.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('keyup', handleKeyUp);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        canvas.removeEventListener('pointerdown', handlePointerDown);
        canvas.removeEventListener('pointerup', handlePointerUp);
        canvas.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('keyup', handleKeyUp);
        document.removeEventListener('keydown', handleKeyDown);
      }
    }), [gl, handlePointerDown, handlePointerUp, handlePointerMove]

    return (
    <a.group ref={xmasballRef} {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          geometry={nodes.christmass_ball_inside_0.geometry}
          material={materials.inside}
        />
        <mesh
          geometry={nodes.christmass_ball_ouline_0.geometry}
          material={materials.ouline}
        />
      </group>
      <mesh
        geometry={nodes.glass_glass_0.geometry}
        material={materials.glass}
        position={[0, 110, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </a.group>
  );
}

export default Xmas;
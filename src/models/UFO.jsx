import React, { useEffect, useRef } from 'react'
import ufo from '../assets/3d/ufo.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { act } from '@react-three/fiber';

const UFO = ({ isRotating, ...props}) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(ufo);
    const { actions } = useAnimations(animations, ref);

    useEffect (() => {      
      if (animations && animations.length > 0) {
        const animationName = animations[0].name;
    
        if (isRotating) {
          actions[animationName].play();
        } else {
          actions[animationName].stop();
        }
      }
    }, [actions, isRotating, animations])

  return (
    <mesh {...props} ref={ref}>
        <primitive object={scene} />
    </mesh>
  )
}

export default UFO;
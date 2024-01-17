import { useGLTF } from '@react-three/drei'
import React from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber' 

import skyScene from '../assets/3d/sky.glb'

const Sky = ({ isRotating }) => {
    const sky = useGLTF(skyScene);
    const skeRef = useRef();

    useFrame((_, delta) => {
        if(isRotating && skeRef.current) {
            skeRef.current.rotation.y += 0.15 * delta;
        }
    })

    return (
        <mesh>
            <primitive object={sky.scene} ref={skeRef}/>
        </mesh>
    )
}

export default Sky
import { useGLTF } from '@react-three/drei'
import React from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber' 

import skyScene from '../assets/3d/sky.glb'

const Sky = ({ isRotating }) => {
    const sky = useGLTF(skyScene);
    const skeRef = useRef();

    useFrame((_, delta) => {
        if(isRotating) {
            skeRef.current.rotate.y += 0.15 * delta
        }
    })

    return (
        <mesh>
            <primitive object={sky.scene} />
        </mesh>
    )
}

export default Sky
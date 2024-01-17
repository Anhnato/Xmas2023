import React, { useRef } from "react";
import damaged_hands from '../assets/3d/damaged_hands.glb';
import { useGLTF } from "@react-three/drei";

const Damaged_Hands = (props) => {
  const { nodes, materials } = useGLTF(damaged_hands);

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials["defaultMat.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials["defaultMat.001"]}
        />
      </group>
    </group>
  );
}

export default Damaged_Hands

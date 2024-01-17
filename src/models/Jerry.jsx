import { useRef } from "react";
import jerry from '../assets/3d/jerry_-_the_tom_and_jerry_show.glb';
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Jerry = () => {
  const { scene } = useGLTF(jerry);
  const jerryRef = useRef();

  useFrame(({ clock, camera }) => {
    const amplitude = 2;
    const frequency = 4;

    const newY = Math.sin(clock.elapsedTime * frequency) * amplitude - 2;

    jerryRef.current.position.y = newY;

    if(newY > camera.position.y + 5) {
      jerryRef.current.rotation.x = Math.PI;
    } else if(jerryRef.current.rotation.x !== 0) {
      jerryRef.current.rotation.x = 0;
    }
  });

  return (
      <mesh
        position={[14, 0, -7]}
        scale={[0.3, 0.3, 0.3]}
        ref={jerryRef}
      >
        <primitive object={scene} />
      </mesh>
  );
}

export default Jerry
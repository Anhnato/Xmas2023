import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';

import Xmas from '../models/Xmas';
import Sky from '../models/Sky';
import UFO from '../models/UFO';
import Jerry from '../models/Jerry';
import Damaged_Hands from '../models/Damaged_Hands';

import jingel_bell from '../music/Loyalty-Freak-Music-Hyper-Jingle-Bells(chosic.com).mp3';
import sound_on from '../music/sound-speaker-icon-on-white-background-free-vector.jpg';
import sound_off from '../music/download.png';

const Home = () => {
  const audioRef = useRef(new Audio(jingel_bell));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentStage, setCurrentStage] = useState(1)

  useEffect(() => {
    if(isPlayingMusic){
      audioRef.current.play();
    }

    return() => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic])

  const adjustXmas = () => {
    let screenScale = null;
    let screenPosition = [30, -90, -250];
    let rotation = [0, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9 * 0.7, 0.9 * 0.7, 0.9 * 0.7];
      screenPosition = [0, -6.5, -43];
    } else {
      screenScale = [1 * 0.7, 1 * 0.7, 1 * 0.7];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [xmasScale, xmasPosition, xmasRotation] = adjustXmas();

  const adjustUFO = () => {
    let screenScale;
    let screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition=[0, -4, -4]
    }

    return [screenScale, screenPosition];
  };

  const [ufoScale, ufoPosition] = adjustUFO();

  return (
    <section className="w-full h-screen relative">
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={3} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <UFO 
            isRotating={isRotating}
            ufoScale={ufoScale}
            ufoPosition={ufoPosition}
            rotation={[0, 20, 0]}/>
          <Jerry />
          <Damaged_Hands />
          <Sky isRotating={isRotating}/>
          <Xmas
            position={xmasPosition}
            scale={xmasScale}
            rotation={xmasRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img src={!isPlayingMusic ? sound_off : sound_on}
        alt='sound'
        className='w-10 h-10 cursor-pointer object-contain'
        onClick={() => setIsPlayingMusic(!isPlayingMusic)}></img>
      </div>
    </section>
  );
};

export default Home;

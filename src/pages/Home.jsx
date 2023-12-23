import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'

import Xmas from '../models/Xmas'
import Sky from '../models/Sky'

import { FaPlay, FaPause } from 'react-icons/fa'
import ReactAudioPlayer from 'react-audio-player'

{/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
  POPUP
</div> */}

const Home = () => {
  const [isRoating, setIsRotating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const adjustXmas = () => {
    let screenScale = null;
    let screenPosition = [30, -60, -250];
    let rotation = [0, 0, 0];

    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43]
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  }

  const [xmasScale, xmasPosition, xmasRotation] = adjustXmas();

  return (
    <section className="w-full h-screen relative">
        <Canvas
          className={`w-full h-screen bg-transparent ${isRoating ? 'cursor-grabbing' : 'cursor-grab'}`}
          camera={{ near: 0.1, far: 1000 }}>
            <Suspense fallback={<Loader />}>
              <directionalLight position={[1, 1, 1]} intensity={3}/>
              <ambientLight intensity={0.5}/>
              <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>

              <Sky />
              <Xmas 
                position={xmasPosition}
                scale={xmasScale}
                rotation={xmasRotation}
                isRoating={isRoating}
                setIsRotating={setIsRotating}
              />
            </Suspense>
        </Canvas>

        <div className='absolute bottom-4 left-4'>
          <ReactAudioPlayer
            src='src/music/Loyalty-Freak-Music-Hyper-Jingle-Bells(chosic.com).mp3'
            autoPlay={isPlaying}
            controls={false} />
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
        </div>
    </section>
  );
};

export default Home
import { useState, useRef, useEffect, Suspense } from "react";
import "./App.css";
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

function App() {

  const mainRef = useRef(null);
  const sceneRef = useRef(null);
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        markers: true,
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress)
        }
      }
    });

    animation
      .to(sceneRef.current, {
        ease: 'none',
        x: () => window.innerWidth * -0.25,
        y: '100vh'
      })
      .to(sceneRef.current, {
        ease: 'none',
        x: () => window.innerWidth * 0.25,
        y: '200vh'
      })
      .to(sceneRef.current, {
        ease: 'none',
        x: () => window.innerWidth * -0.25,
        y: '300vh'
      });

    // Update animation when window resizes
    const handleResize = () => {
      animation.invalidate().restart();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <main ref={mainRef} className="overflow-x-hidden">
      <Suspense
        fallback={
          <div className="fixed inset-0 grid place-items-center bg-black text-white">
            Loading...
          </div>
        }
      >
        <section className="relative grid place-items-center h-screen">
          <p className="text-white text-center absolute top-4 mx-4 w-fit text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">
            Adventure Pro
          </p>
          <p className="text-white text-center absolute bottom-4 mx-4 w-fit text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold">
            All-Weather Jacket
          </p>

          <div ref={sceneRef} className="h-screen w-screen text-white">
            <Canvas>
              <Scene progress={progress} />
            </Canvas>
          </div>
        </section>

        <section className="relative flex items-center justify-center sm:justify-evenly h-screen px-4">
          <p className="w-0 sm:w-1/2 border-0 border-red-700"></p>

          <p className="text-white w-full sm:w-1/2 text-center text-xl sm:text-2xl md:text-4xl font-semibold">
            Crafted with advanced waterproof and windproof materials to keep you 
            protected in the harshest weather conditions.
          </p>
        </section>

        <section className="relative flex items-center justify-center sm:justify-evenly h-screen px-4">
          <p className="text-white order-1 w-full sm:w-1/2 text-center text-xl sm:text-2xl md:text-4xl font-semibold">
            Reinforced stitching and durable construction ensure long-lasting 
            performance through all your adventures.
          </p>
          <p className="w-0 sm:w-1/2 order-2"></p>
        </section>

        <section className="relative flex items-center justify-center sm:justify-evenly h-screen px-4">
          <p className="w-0 sm:w-1/2 border-0 border-red-700"></p>

          <p className="text-white w-full sm:w-1/2 text-center text-xl sm:text-2xl md:text-4xl font-semibold">
            Smart insulation technology adapts to temperature changes, keeping you 
            comfortable in both extreme cold and mild conditions.
          </p>
        </section>
      </Suspense>
    </main>
  );
}

export default App;

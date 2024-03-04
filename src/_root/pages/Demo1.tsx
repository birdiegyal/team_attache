"use client";
import { ParallaxScroll } from "../../components/ui/parallax-scroll";

export function Demo1() {

  
  return (
    <>
      <div className="max-w-[80%] mx-auto mt-16">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-4xl font-bold">Demo 1</h1>
          <p className="text-slate-500 text-xl my-5">
            The data shown below is the scrapped data from the college portal.
          </p>
        </div>
      </div>
      <ParallaxScroll images={images} />
    </>
  );
}


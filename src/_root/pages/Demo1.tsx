"use client";
import { getImgsPreviewFishbone } from "@/lib/queries/queries";
import { ParallaxScroll } from "../../components/ui/parallax-scroll";

export function Demo1() {

  const { data } = getImgsPreviewFishbone();
  console.log(data);
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
      {
        // @ts-ignore
        <ParallaxScroll images={data?.imgPreviews} />
      }
    </>
  );
}

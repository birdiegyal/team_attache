"use client";
import { getImgsPreviewFishbone } from "@/lib/queries/queries";
import { ParallaxScroll } from "../../components/ui/parallax-scroll";

export function Demo1() {
  const { data, isLoading } = getImgsPreviewFishbone();

  return (
    <>
      <div className="max-w-[90%] mx-auto mt-16">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-4xl font-bold sm:text-6xl">Demo 1</h1>
          <p className="text-slate-500 text-xl my-5">
            The data shown below is the scrapped data from the college portal.
          </p>
        </div>
      </div>
      {isLoading ? (
        <p className="animate-pulse text-2xl sm:text-4xl text-muted-foreground text-center font-bold space-y-10">
          Loading...
        </p>
      ) : (
        // @ts-ignore
        <ParallaxScroll images={data?.imgPreviews} className="" />
      )}
    </>
  )}

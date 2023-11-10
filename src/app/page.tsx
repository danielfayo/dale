import LandingButton from "@/components/landing/LandingButton";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <div className="px-4 w-full text-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] ">
          <h1 className="text-5xl"> Elevate Your <br/><span className="text-primary font-semibold">Digital Dreams</span> With Dale</h1>
          <p className="text-base opacity-80 mt-4 max-w-lg mx-auto">
            Dale enables writers, artists, musicians, and other content creators
            to monetize their work.
          </p>
          <LandingButton/>
        </div>
      </main>
    </>
  );
}

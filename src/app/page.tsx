import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { AboutSection } from "@/components/sections/AboutSection";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Engineering } from "@/components/sections/Engineering";
import { Experience } from "@/components/sections/Experience";
import { Activity } from "@/components/sections/Activity";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";

/*
 * Each section sits in its own Suspense boundary. The HTML is still fully
 * server-rendered, but React hydrates boundaries one at a time and yields to
 * the browser in between — the hero becomes interactive first and the main
 * thread never locks up for the whole page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Suspense>
        <About />
      </Suspense>
      <Suspense>
        <AboutSection />
      </Suspense>
      <Suspense>
        <Process />
      </Suspense>
      <Suspense>
        <SelectedWork />
      </Suspense>
      <Suspense>
        <Engineering />
      </Suspense>
      <Suspense>
        <Experience />
      </Suspense>
      <Suspense>
        <Activity />
      </Suspense>
      <Suspense>
        <CurrentlyBuilding />
      </Suspense>
      <Suspense>
        <Philosophy />
      </Suspense>
      <Suspense>
        <Contact />
      </Suspense>
    </>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DotFieldBackground } from "@/components/layout/DotFieldBackground";
import { ProjectModalProvider } from "@/contexts/ProjectModalContext";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { FeaturedShowcase } from "@/components/sections/FeaturedShowcase";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <ProjectModalProvider>
      <Navbar />
      <div className="relative z-10 min-h-screen">
        <DotFieldBackground />
        <main className="relative z-10 pointer-events-none *:pointer-events-auto">
          <Hero />
          <About />
          <Projects />
          <FeaturedShowcase />
          <Services />
          <Skills />
          <Contact />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </ProjectModalProvider>
  );
}

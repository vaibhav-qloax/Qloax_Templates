import Hero from "@/components/home/Hero";
import BrandBand from "@/components/home/BrandBand";
import WhoWeAre from "@/components/home/WhoWeAre";
import Capabilities from "@/components/home/Capabilities";
import ProductShowcase from "@/components/home/ProductShowcase";
import SystemsStory from "@/components/home/SystemsStory";
import Industries from "@/components/home/Industries";
import Principles from "@/components/home/Principles";
import Process from "@/components/home/Process";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandBand />
      <WhoWeAre />
      <Capabilities />
      <ProductShowcase />
      <SystemsStory />
      <Industries />
      <Principles />
      <Process />
      <CTA />
    </>
  );
}

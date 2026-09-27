import LenisProvider from "@/components/shared/LenisProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import T1Navbar from "@/templates/template-1/components/T1Navbar";
import T1Hero from "@/templates/template-1/components/T1Hero";
import T1Products from "@/templates/template-1/components/T1Products";
import T1ContinuousStory from "@/templates/template-1/components/T1ContinuousStory";
import T1CTA from "@/templates/template-1/components/T1CTA";
import T1Footer from "@/templates/template-1/components/T1Footer";

export const metadata = {
  title: "QLOAX — Cinematic Engineering (Template 01)",
  description: "ENGINEERING Intelligence, Empowering Industry. Award-winning continuous motion web experience.",
};

export default function Template1Page() {
  return (
    <LenisProvider>
      <CustomCursor />
      <main className="bg-[#030303] text-white selection:bg-[#C40024] selection:text-white">
        <T1Navbar />
        <T1Hero />
        <T1Products />
        <T1ContinuousStory />
        <T1CTA />
        <T1Footer />
      </main>
    </LenisProvider>
  );
}

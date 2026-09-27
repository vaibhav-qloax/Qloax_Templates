import LenisProvider from "@/components/shared/LenisProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import T3Navbar from "@/templates/template-3/components/T3Navbar";
import T3Hero from "@/templates/template-3/components/T3Hero";
import T3ScrollStory from "@/templates/template-3/components/T3ScrollStory";
import T3ProductEcosystem from "@/templates/template-3/components/T3ProductEcosystem";
import T3WorkStory from "@/templates/template-3/components/T3WorkStory";
import T3CTA from "@/templates/template-3/components/T3CTA";
import T3Footer from "@/templates/template-3/components/T3Footer";

export const metadata = {
  title: "QLOAX — Future of Industry (Template 03)",
  description: "Industrial technology visual experience with 6-stage transformation scroll story.",
};

export default function Template3Page() {
  return (
    <LenisProvider>
      <CustomCursor />
      <main className="bg-[#030303] text-white selection:bg-[#C40024] selection:text-white min-h-screen">
        <T3Navbar />
        <T3Hero />
        <T3ScrollStory />
        <T3ProductEcosystem />
        <T3WorkStory />
        <T3CTA />
        <T3Footer />
      </main>
    </LenisProvider>
  );
}

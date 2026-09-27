import LenisProvider from "@/components/shared/LenisProvider";
import CustomCursor from "@/components/shared/CustomCursor";
import T2Navbar from "@/templates/template-2/components/T2Navbar";
import T2Hero from "@/templates/template-2/components/T2Hero";
import T2SystemDiagram from "@/templates/template-2/components/T2SystemDiagram";
import T2CapabilitiesGrid from "@/templates/template-2/components/T2CapabilitiesGrid";
import T2ProductsEditorial from "@/templates/template-2/components/T2ProductsEditorial";
import T2WorkMatrix from "@/templates/template-2/components/T2WorkMatrix";
import T2CTA from "@/templates/template-2/components/T2CTA";
import T2Footer from "@/templates/template-2/components/T2Footer";

export const metadata = {
  title: "QLOAX — Enterprise Mobile & Frontend Architecture (Template 02)",
  description: "Enterprise Slate software developer experience focusing on React Native, Expo, and scalable UI architectures.",
};

export default function Template2Page() {
  return (
    <LenisProvider>
      <CustomCursor />
      <main className="bg-[#090D16] text-[#F1F5F9] selection:bg-[#3B82F6] selection:text-white min-h-screen">
        <T2Navbar />
        <T2Hero />
        <T2WorkMatrix />
        <T2SystemDiagram />
        <T2CapabilitiesGrid />
        <T2ProductsEditorial />
        <T2CTA />
        <T2Footer />
      </main>
    </LenisProvider>
  );
}

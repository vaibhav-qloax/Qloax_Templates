"use client";

import Diagram, { useInViewProgress } from "@/components/diagrams/Diagram";
import type { Diagram as DiagramData } from "@/content/projects";

/** Case-study diagrams play once when they enter the viewport. */
export default function InViewDiagram({ diagram }: { diagram: DiagramData }) {
  const { ref, progress } = useInViewProgress(2.6);
  return (
    <div ref={ref}>
      <Diagram diagram={diagram} progress={progress} />
    </div>
  );
}

// import { SectionCard } from "./SectionCard";
// import type { Section } from "../../types";

import type { Section } from "@/types";
import { SectionCard } from "./SectionCard";

// In a real app you'd fetch sections from an API; these are passed as props.
interface TaskBoardProps {
  sections: Section[];
}

export function TaskBoard({ sections }: TaskBoardProps) {
//   const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-5">
      {sections.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}

export interface TimelineStep {
  id: string;
  title: string;
  description?: string;
  position: "top" | "bottom";
}

export const HOW_IT_WORKS_DATA: TimelineStep[] = [
  {
    id: "step-1",
    title: "Write naturally.",
    description:
      "Type what you want in plain English.\nPrefix with > for instant local tool orchestration.",
    position: "top",
  },
  {
    id: "step-2",
    title: "AI understands.",
    description:
      "Cero parses intent and resolves environment paths\nusing 100% offline local models.",
    position: "bottom",
  },
  {
    id: "step-3",
    title: "Execute safely.",
    description:
      "Review proposed actions with zero-trust protection.\nDestructive operations require explicit approval.",
    position: "top",
  },
  {
    id: "step-4",
    title: "Self-heal & adapt.",
    description:
      "SERL monitors exit codes and runtime stderr,\nauto-remediating issues with 3-strike reliability.",
    position: "bottom",
  },
];

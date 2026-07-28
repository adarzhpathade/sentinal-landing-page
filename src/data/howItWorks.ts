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
      "Type what you want in plain English.\nNo memorizing commands. No syntax lookup.",
    position: "top",
  },
  {
    id: "step-2",
    title: "AI understands.",
    description:
      "Sentinel analyzes your intent using\ncompletely local AI models.",
    position: "bottom",
  },
  {
    id: "step-3",
    title: "Execute safely.",
    description:
      "Review proposed actions before they run.\nYou are always in control of what happens.",
    position: "top",
  },
  {
    id: "step-4",
    title: "Get results.",
    description:
      "Instantly see the output formatted perfectly.\nSpeed up your entire workflow seamlessly.",
    position: "bottom",
  },
];

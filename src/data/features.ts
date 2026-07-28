export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const FEATURES_DATA: Feature[] = [
  {
    id: "feature-1",
    title: "Write Naturally.",
    description:
      "Type what you want in plain English.\nNo memorizing commands. No syntax lookup.",
  },
  {
    id: "feature-2",
    title: "Execute Securely.",
    description:
      "Review every generated command before execution.\nStay in control with safe, transparent workflows.",
  },
  {
    id: "feature-3",
    title: "Works Completely Offline.",
    description:
      "All AI processing happens locally on your machine.\nNo cloud dependency. No data leaves your device.",
  },
  {
    id: "feature-4",
    title: "Automate Repetitive Tasks.",
    description:
      "Turn multi-step workflows into reusable automations.\nSave time on everyday development tasks.",
  },
  {
    id: "feature-5",
    title: "Understands Your Environment.",
    description:
      "Recognizes your shell, files, and project context.\nDelivers accurate, context-aware assistance.",
  },
  {
    id: "feature-6",
    title: "Developer Focused.",
    description:
      "Built for developers and power users.\nA modern terminal for maximum productivity.",
  },
];

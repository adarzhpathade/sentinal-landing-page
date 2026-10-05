export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const FEATURES_DATA: Feature[] = [
  {
    id: "feature-1",
    title: "Natural Shell & OS Control.",
    description:
      "Control Wi-Fi, audio, dark mode, and apps in plain English.\nPrefix with > for instant local tool orchestration.",
  },
  {
    id: "feature-2",
    title: "Self-Healing SERL Engine.",
    description:
      "Catches nonzero exit codes and parses runtime stderr.\nOffers 3-strike automated diagnostic remediation.",
  },
  {
    id: "feature-3",
    title: "100% Offline Local Models.",
    description:
      "Runs embedded quantized models (0.5B to 4B parameters).\nAccelerated by Metal and Vulkan. No cloud required.",
  },
  {
    id: "feature-4",
    title: "Declarative .flow Automation.",
    description:
      "Turn multi-step terminal procedures into .flow scripts.\nExecute complex setups with a single companion CLI command.",
  },
  {
    id: "feature-5",
    title: "Universal IDE Launchers.",
    description:
      "Open projects in VS Code, Cursor, Antigravity, or Xcode.\nNaturally resolves target paths to your active workspace.",
  },
  {
    id: "feature-6",
    title: "Zero-Trust Security Gate.",
    description:
      "Interactive permission holds for destructive operations.\nAll API secrets securely kept in your native OS Keychain.",
  },
];

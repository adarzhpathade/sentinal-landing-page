export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "offline",
    question: "Is Cero completely offline?",
    answer:
      "Yes. Cero embeds local quantized models (0.5B to 4B parameters) powered by llama.cpp with Metal (macOS) and Vulkan (Windows/Linux) hardware acceleration. Your code, shell history, and environment variables never leave your machine.",
  },
  {
    id: "platforms",
    question: "Which operating systems and formats are available?",
    answer:
      "Cero is available as native desktop builds for macOS (Apple Silicon & Intel DMG), Windows 10/11 x64 (Standalone Setup & MSI Package), and Linux (.deb, .rpm, .AppImage, and Arch .pkg.tar.zst).",
  },
  {
    id: "hardware",
    question: "What hardware is recommended for local AI models?",
    answer:
      "Compact 0.5B and 1.5B parameter models run smoothly on standard 8GB RAM systems. For the higher-reasoning 3B and 4B models, 16GB+ RAM is recommended. You can also connect to local Ollama or your own cloud API keys.",
  },
  {
    id: "serl",
    question: "How does the SERL self-healing engine work?",
    answer:
      "When a shell command fails with a non-zero exit code or stderr stream, Cero's Self-Evolving Reinforcement Learning loop analyzes the failure diagnostic, pinpoints root causes (such as port conflicts or missing dependencies), and offers a 3-strike safe auto-remediation fix.",
  },
  {
    id: "system-settings",
    question: "Can Cero control my operating system settings?",
    answer:
      "Yes. By typing natural instructions like > turn wifi off, > dark mode, > set volume to 50%, or > bluetooth, Cero interacts directly with native OS system services without requiring complex shell scripts.",
  },
  {
    id: "cli-launcher",
    question: "How do I launch Cero from my existing shell or run workflows?",
    answer:
      "You can install our companion global launcher via npm install -g @netpranav/cero-cli. This lets you run 'cero' in any directory or execute declarative automation scripts using 'cero setup.flow'.",
  },
  {
    id: "security",
    question: "How are destructive commands and secrets protected?",
    answer:
      "Cero enforces a Zero-Trust security model. Destructive file operations (e.g. recursive deletions or disk partitions) require explicit interactive confirmation before executing. Cloud API keys are stored in your encrypted OS Keychain, never in plaintext.",
  },
];

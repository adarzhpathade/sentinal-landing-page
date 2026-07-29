export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "offline",
    question: "Is Sentinel completely offline?",
    answer:
      "Yes, Sentinel runs entirely locally on your machine. Your code, data, and terminal history never leave your device.",
  },
  {
    id: "replace",
    question: "Does Sentinel replace my terminal?",
    answer:
      "Sentinel is designed to be a drop-in replacement for your existing terminal, enhancing it with AI capabilities without sacrificing performance.",
  },
  {
    id: "os",
    question: "Which operating systems are supported?",
    answer:
      "Sentinel is built for macOS, Linux, and Windows, providing a consistent experience across all major desktop platforms.",
  },
  {
    id: "shell",
    question: "Can I use my existing shell?",
    answer:
      "Yes, Sentinel supports bash, zsh, fish, and PowerShell seamlessly.",
  },
  {
    id: "nl",
    question: "How does natural language execution work?",
    answer:
      "Sentinel translates your natural language requests into shell commands using local AI models, explaining the command before execution.",
  },
  {
    id: "internet",
    question: "Do I need an internet connection?",
    answer:
      "No. All core features, including natural language execution, run entirely offline.",
  },
];

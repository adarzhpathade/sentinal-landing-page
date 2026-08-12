export interface HeroCTA {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroContentConfig {
  title: {
    line1: string;
    line2: string;
  };
  description: string;
  primaryCta: HeroCTA;
  secondaryCta: HeroCTA;
}

export const HERO_DATA: HeroContentConfig = {
  title: {
    line1: "Sentinel / The AI-Native",
    line2: "Terminal.",
  },
  description:
    "Execute shell commands, automate workflows, and control your desktop using natural language—all completely offline.",
  primaryCta: {
    label: "DOWNLOAD",
    href: "/download",
    variant: "primary",
  },
  secondaryCta: {
    label: "Developer Docs",
    href: "/docs",
    variant: "secondary",
  },
};

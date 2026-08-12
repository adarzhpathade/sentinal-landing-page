export interface DocsNavItem {
  id: string;
  label: string;
  href: string;
}

export interface DocsNavGroup {
  title?: string;
  items: DocsNavItem[];
}

export const DOCS_NAVIGATION: DocsNavGroup[] = [
  {
    title: "// GETTING STARTED",
    items: [
      { id: "introduction", label: "Introduction", href: "/docs" },
      { id: "installation", label: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "// CORE FEATURES",
    items: [
      { id: "architecture", label: "Architecture", href: "/docs/architecture" },
    ],
  },
  {
    title: "// REFERENCE",
    items: [
      { id: "commands", label: "Command Reference", href: "/docs/commands" },
    ],
  },
  {
    title: "// UPDATES",
    items: [
      { id: "releases", label: "Release Notes", href: "/docs/releases" },
    ],
  },
];

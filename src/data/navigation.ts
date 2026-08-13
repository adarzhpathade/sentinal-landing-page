export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface MenuInfoItem {
  label: string;
  href?: string;
  external?: boolean;
}

export interface NavigationConfig {
  brand: string;
  brandUrl?: string;
  menuTrigger: string;
  menuClose: string;
  ctaButton: {
    label: string;
    href: string;
  };
  items: NavigationItem[];
  menuInfo: {
    topLeft: MenuInfoItem;
    developers: MenuInfoItem[];
    bottomLeft: MenuInfoItem;
    emails: MenuInfoItem[];
  };
  menuActions: {
    top: MenuInfoItem[];
    bottom: MenuInfoItem;
  };
}

export const NAVIGATION_DATA: NavigationConfig = {
  brand: "SENTINAL",
  brandUrl: "/",
  menuTrigger: "MENU",
  menuClose: "CLOSE",
  ctaButton: {
    label: "DOWNLOAD",
    href: "/download",
  },
  items: [
    { id: "home", label: "Home", href: "/" },
    { id: "features", label: "Features", href: "/#features" },
    { id: "how-it-works", label: "How it Works ?", href: "/#how-it-works" },
    { id: "faq", label: "FAQ\u2019s", href: "/#faq" },
    { id: "download", label: "Get it Now", href: "/#download" },
  ],
  menuInfo: {
    topLeft: { label: "Developed by" },
    developers: [
      { label: "Pranav Dubey", href: "https://github.com/NetPranav" },
      { label: "Adarsh Pathade", href: "https://github.com/adarzhpathade" },
    ],
    bottomLeft: { label: "Any Queries ?" },
    emails: [
      { label: "devanshdubey@gmail.com", href: "mailto:devanshdubey@gmail.com" }
    ],
  },
  menuActions: {
    top: [
      { label: "Get Sentinel Now", href: "/download" },
      { label: "Check Docs", href: "/docs", external: true },
    ],
    bottom: { label: "github/sentinel", href: "https://github.com/NetPranav/Sentinal-Terminal", external: true },
  },
};

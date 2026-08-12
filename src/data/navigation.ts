export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brand: string;
  brandUrl?: string;
  menuTrigger: string;
  ctaButton: {
    label: string;
    href: string;
  };
  items: NavigationItem[];
}

export const NAVIGATION_DATA: NavigationConfig = {
  brand: "SENTINEL",
  brandUrl: "/",
  menuTrigger: "MENU",
  ctaButton: {
    label: "DOWNLOAD",
    href: "/download",
  },
  items: [
    { id: "home", label: "Home", href: "/" },
    { id: "features", label: "Features", href: "/#features" },
    { id: "pricing", label: "Pricing", href: "/#pricing" },
    { id: "about", label: "About", href: "/#about" },
  ],
};

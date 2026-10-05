export interface ReleaseDownloadItem {
  id: string;
  name: string;
  format: string;
  url: string;
  recommended?: boolean;
}

export interface OsReleaseCategory {
  title: string;
  cliCommand: string;
  items: ReleaseDownloadItem[];
}

export const RELEASES_CONFIG = {
  versions: {
    mac: "v2.2.0",
    windows: "v2.2.0",
    linux: "v2.2.3",
  },
  githubRepo: "https://github.com/NetPranav/Cero-Terminal",
  githubReleases: "https://github.com/NetPranav/Cero-Terminal/releases",
  mac: {
    title: "Mac",
    cliCommand: "brew install cero",
    items: [
      {
        id: "mac-arm64",
        name: "Apple Silicon (M1/M2/M3/M4)",
        format: ".dmg",
        url: "https://github.com/NetPranav/Cero-Terminal/releases/download/v2.2.0-macos/Cero.Terminal_2.2.0_aarch64.dmg",
        recommended: true,
      },
      {
        id: "mac-intel",
        name: "Intel Processor (x64)",
        format: ".dmg",
        url: "https://github.com/NetPranav/Cero-Terminal/releases/download/v2.2.0-macos/Cero_2.2.0_x64.dmg",
      },
    ],
  },
  windows: {
    title: "Windows",
    cliCommand: "winget install cero",
    items: [
      {
        id: "win-setup",
        name: "Windows 10/11 x64 (Setup)",
        format: ".exe",
        url: "https://github.com/NetPranav/Cero-Terminal/releases/download/v2.2.0-windows/Cero_2.2.0_x64-setup.exe",
        recommended: true,
      },
      {
        id: "win-msi",
        name: "Windows 10/11 x64 (MSI Package)",
        format: ".msi",
        url: "https://github.com/NetPranav/Cero-Terminal/releases/download/v2.2.0-windows/Cero_2.2.0_x64_en-US.msi",
      },
    ],
  },
  linux: {
    title: "Linux",
    cliCommand: "curl -sS https://cero.sh | sh",
    items: [
      {
        id: "linux-deb",
        name: "Debian / Ubuntu (x64)",
        format: ".deb",
        url: "https://github.com/NetPranav/Cero-Terminal/releases/download/v2.2.3-linux/Cero_2.2.3_amd64.deb",
        recommended: true,
      },
      {
        id: "linux-appimage",
        name: "Universal Linux (AppImage)",
        format: ".AppImage",
        url: "https://github.com/NetPranav/Cero-Terminal/releases/download/v2.2.3-linux/Cero_2.2.3_amd64.AppImage",
      },
      {
        id: "linux-rpm",
        name: "Fedora / RHEL / openSUSE",
        format: ".rpm",
        url: "https://github.com/NetPranav/Cero-Terminal/releases/download/v2.2.3-linux/Cero-2.2.3-1.x86_64.rpm",
      },
    ],
  },
};

/**
 * Client helper to detect visitor's operating system
 */
export function getDetectedOs(): "mac" | "windows" | "linux" | null {
  if (typeof window === "undefined" || !navigator) return null;
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("mac") || userAgent.includes("darwin")) return "mac";
  if (userAgent.includes("win")) return "windows";
  if (userAgent.includes("linux") || userAgent.includes("x11")) return "linux";
  return null;
}

/**
 * Returns primary direct download URL based on detected or specified OS
 */
export function getPrimaryDownloadUrl(os?: "mac" | "windows" | "linux" | null): string {
  if (os === "windows") {
    return RELEASES_CONFIG.windows.items[0].url;
  }
  if (os === "linux") {
    return RELEASES_CONFIG.linux.items[0].url;
  }
  // Default to Apple Silicon Mac or general Mac
  return RELEASES_CONFIG.mac.items[0].url;
}

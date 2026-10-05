export interface CommandItem {
  id: string;
  category: "system" | "ide" | "git" | "serl" | "memory" | "cli";
  categoryLabel: string;
  command: string;
  tool: string;
  description: string;
  exampleOutput?: string;
  prefix: ">" | "/" | "cli";
}

export interface CommandCategory {
  id: "all" | "system" | "ide" | "git" | "serl" | "memory" | "cli";
  label: string;
}

export const COMMAND_CATEGORIES: CommandCategory[] = [
  { id: "all", label: "ALL" },
  { id: "system", label: "SYSTEM SETTINGS" },
  { id: "ide", label: "IDES & EDITORS" },
  { id: "git", label: "GIT & WORKFLOW" },
  { id: "serl", label: "SERL RECOVERY" },
  { id: "memory", label: "TEACHING & RULES" },
  { id: "cli", label: "CLI & FLOWS" },
];

export const COMMAND_ITEMS: CommandItem[] = [
  // System Settings & OS Control
  {
    id: "sys-wifi-off",
    category: "system",
    categoryLabel: "System Settings",
    command: "> turn wifi off",
    tool: "system.wifi",
    description: "Toggles the host OS Wi-Fi network interface off via native system call.",
    prefix: ">",
  },
  {
    id: "sys-wifi-on",
    category: "system",
    categoryLabel: "System Settings",
    command: "> turn wifi on",
    tool: "system.wifi",
    description: "Re-enables the host OS Wi-Fi network adapter and reconnects to known networks.",
    prefix: ">",
  },
  {
    id: "sys-dark-mode",
    category: "system",
    categoryLabel: "System Settings",
    command: "> turn on dark mode",
    tool: "system.appearance",
    description: "Sets the operating system appearance theme to Dark Mode across all displays.",
    prefix: ">",
  },
  {
    id: "sys-light-mode",
    category: "system",
    categoryLabel: "System Settings",
    command: "> switch to light mode",
    tool: "system.appearance",
    description: "Restores system-wide light mode appearance theme.",
    prefix: ">",
  },
  {
    id: "sys-volume",
    category: "system",
    categoryLabel: "System Settings",
    command: "> set volume to 50%",
    tool: "system.audio",
    description: "Adjusts master system audio output level to exactly 50%.",
    prefix: ">",
  },
  {
    id: "sys-mute",
    category: "system",
    categoryLabel: "System Settings",
    command: "> mute system audio",
    tool: "system.audio",
    description: "Mutes active master audio device without altering current output volume percentage.",
    prefix: ">",
  },
  {
    id: "sys-bluetooth-off",
    category: "system",
    categoryLabel: "System Settings",
    command: "> turn bluetooth off",
    tool: "system.bluetooth",
    description: "Powers off host Bluetooth controller hardware.",
    prefix: ">",
  },
  {
    id: "sys-clear",
    category: "system",
    categoryLabel: "System Operations",
    command: "> clear terminal",
    tool: "system.clear",
    description: "Performs direct zero-latency WebGL xterm.js buffer wipe.",
    prefix: ">",
  },

  // IDEs & Launchers
  {
    id: "ide-vscode",
    category: "ide",
    categoryLabel: "Development & IDEs",
    command: "> open this folder in vs code",
    tool: "developer.vscode",
    description: "Resolves current relative path '.' to absolute path and launches Visual Studio Code.",
    prefix: ">",
  },
  {
    id: "ide-cursor",
    category: "ide",
    categoryLabel: "Development & IDEs",
    command: "> open current directory in cursor",
    tool: "developer.cursor",
    description: "Launches Cursor AI editor focused on your active workspace root.",
    prefix: ">",
  },
  {
    id: "ide-antigravity",
    category: "ide",
    categoryLabel: "Development & IDEs",
    command: "> open this folder inside antigravity",
    tool: "developer.antigravity",
    description: "Resolves project path and opens Google Antigravity IDE workspace.",
    prefix: ">",
  },
  {
    id: "ide-intellij",
    category: "ide",
    categoryLabel: "Development & IDEs",
    command: "> open project in intellij",
    tool: "developer.intellij",
    description: "Locates IDE configuration files (.idea or pom.xml) and launches IntelliJ IDEA.",
    prefix: ">",
  },
  {
    id: "ide-xcode",
    category: "ide",
    categoryLabel: "Development & IDEs",
    command: "> open in xcode",
    tool: "developer.xcode",
    description: "Scans working directory for .xcworkspace or .xcodeproj and opens native Xcode.",
    prefix: ">",
  },

  // Git & Workflow Operations
  {
    id: "git-branch",
    category: "git",
    categoryLabel: "Version Control",
    command: "> create branch feat/auth and switch to it",
    tool: "git.branch",
    description: "Executes 'git checkout -b feat/auth' with branch name sanitation and status check.",
    prefix: ">",
  },
  {
    id: "git-undo-commit",
    category: "git",
    categoryLabel: "Version Control",
    command: "> undo last commit but keep changes",
    tool: "git.reset",
    description: "Executes soft reset 'git reset HEAD~1', preserving modified files in working tree.",
    prefix: ">",
  },
  {
    id: "git-stash",
    category: "git",
    categoryLabel: "Version Control",
    command: "> stash untracked files with message wip",
    tool: "git.stash",
    description: "Executes 'git stash push -u -m wip' including untracked workspace additions.",
    prefix: ">",
  },

  // SERL Self-Healing
  {
    id: "serl-diagnose",
    category: "serl",
    categoryLabel: "Self-Healing Engine",
    command: "> why did my last command fail?",
    tool: "serl.diagnose",
    description: "Analyzes captured stderr output and non-zero exit code to pinpoint exact error cause.",
    prefix: ">",
  },
  {
    id: "serl-port",
    category: "serl",
    categoryLabel: "Self-Healing Engine",
    command: "> fix port 3000 already in use",
    tool: "serl.remediate",
    description: "Finds process PID listening on port 3000 and presents interactive termination prompt.",
    prefix: ">",
  },
  {
    id: "serl-deps",
    category: "serl",
    categoryLabel: "Self-Healing Engine",
    command: "> fix missing dependencies and retry",
    tool: "serl.patch",
    description: "Detects missing package import, executes package manager install, and re-executes command.",
    prefix: ">",
  },

  // Teaching Cero & Memory Rules
  {
    id: "mem-learn-pm",
    category: "memory",
    categoryLabel: "Memory & Preferences",
    command: "/learn always use pnpm instead of npm",
    tool: "memory.learn",
    description: "Persists developer preference to local database; future commands auto-substitute pnpm.",
    prefix: "/",
  },
  {
    id: "mem-learn-env",
    category: "memory",
    categoryLabel: "Memory & Preferences",
    command: "/learn staging server url is api.staging.internal",
    tool: "memory.learn",
    description: "Associates workspace context fact with current project repository.",
    prefix: "/",
  },
  {
    id: "mem-list",
    category: "memory",
    categoryLabel: "Memory & Preferences",
    command: "/learned",
    tool: "memory.list",
    description: "Renders table of all active persistent rules, user preferences, and workspace facts.",
    prefix: "/",
  },
  {
    id: "mem-forget",
    category: "memory",
    categoryLabel: "Memory & Preferences",
    command: "/forget rule-04",
    tool: "memory.forget",
    description: "Deletes specified rule ID from persistent local memory store.",
    prefix: "/",
  },

  // Companion CLI & .flow Automation
  {
    id: "cli-open-here",
    category: "cli",
    categoryLabel: "CLI Launcher",
    command: "cero",
    tool: "cli.launch",
    description: "Opens Cero desktop terminal in the current directory from bash, zsh, fish, or PowerShell.",
    prefix: "cli",
  },
  {
    id: "cli-open-path",
    category: "cli",
    categoryLabel: "CLI Launcher",
    command: "cero ~/projects/backend",
    tool: "cli.launch",
    description: "Spawns Cero focused directly on the provided target directory path.",
    prefix: "cli",
  },
  {
    id: "cli-run-flow",
    category: "cli",
    categoryLabel: "Workflow Engine",
    command: "cero setup.flow",
    tool: "workflow.execute",
    description: "Executes declarative multi-step automation workflow without interactive prompt overhead.",
    prefix: "cli",
  },
  {
    id: "cli-gen-flow",
    category: "cli",
    categoryLabel: "Workflow Engine",
    command: "> generate workflow for docker postgres and redis",
    tool: "workflow.generate",
    description: "Synthesizes executable .flow file with multi-container health checks and setup commands.",
    prefix: ">",
  },
];

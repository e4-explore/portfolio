"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, Navigation, Bot, Pencil, LayoutGrid, Sparkles, Palette } from "lucide-react";

const LIGHT_ROLE_STYLES: Record<string, { accent: string; bg: string; bgHover: string }> = {
  "product-designer": {
    accent: "#E85D2D",
    bg: "rgba(232, 93, 45, 0.14)",
    bgHover: "rgba(232, 93, 45, 0.20)",
  },
  illustrator: {
    accent: "#7C3AED",
    bg: "rgba(124, 58, 237, 0.14)",
    bgHover: "rgba(124, 58, 237, 0.20)",
  },
  "web-designer": {
    accent: "#0EA5E9",
    bg: "rgba(14, 165, 233, 0.14)",
    bgHover: "rgba(14, 165, 233, 0.20)",
  },
  animator: {
    accent: "#EC4899",
    bg: "rgba(236, 72, 153, 0.14)",
    bgHover: "rgba(236, 72, 153, 0.20)",
  },
  "brand-designer": {
    accent: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.14)",
    bgHover: "rgba(245, 158, 11, 0.20)",
  },
};

const DARK_ROLE_STYLES: Record<string, { accent: string; bg: string; bgHover: string }> = {
  // vibe-coder mode (dark theme)
  "product-designer": {
    accent: "#39FF14",
    bg: "rgba(57, 255, 20, 0.14)",
    bgHover: "rgba(57, 255, 20, 0.20)",
  },
  entrepreneur: {
    accent: "#00E5FF",
    bg: "rgba(0, 229, 255, 0.12)",
    bgHover: "rgba(0, 229, 255, 0.18)",
  },
  "golf-apparel": {
    accent: "#FFD400",
    bg: "rgba(255, 212, 0, 0.14)",
    bgHover: "rgba(255, 212, 0, 0.20)",
  },
  "movies-tv": {
    accent: "#FF2BD6",
    bg: "rgba(255, 43, 214, 0.12)",
    bgHover: "rgba(255, 43, 214, 0.18)",
  },
  animator: {
    accent: "#FF7A18",
    bg: "rgba(255, 122, 24, 0.14)",
    bgHover: "rgba(255, 122, 24, 0.20)",
  },
};

const LIGHT_ROLES = [
  {
    id: "product-designer",
    label: "product designer",
    icon: Navigation,
    isDefault: true,
  },
  {
    id: "illustrator",
    label: "illustrator",
    icon: Pencil,
  },
  {
    id: "web-designer",
    label: "web designer",
    icon: LayoutGrid,
  },
  {
    id: "animator",
    label: "animator",
    icon: Sparkles,
  },
  {
    id: "brand-designer",
    label: "brand designer",
    icon: Palette,
  },
];

const DARK_ROLES = [
  {
    // Keep the same id so existing logic that special-cases product-designer works.
    id: "product-designer",
    label: "vibe coder",
    icon: Bot,
    isDefault: true,
  },
  { id: "entrepreneur", label: "entrepreneur", icon: LayoutGrid },
  { id: "golf-apparel", label: "golf brand owner", icon: Palette },
  { id: "movies-tv", label: "movies & tv nerd", icon: Bot },
  { id: "animator", label: "animation enjoyer", icon: Pencil },
];

type Role = (typeof LIGHT_ROLES)[number] | (typeof DARK_ROLES)[number];

export function RoleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("product-designer");
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  // Prevent hydration mismatch: server can't know system theme.
  useEffect(() => {
    setMounted(true);
  }, []);

  const roles = useMemo(() => (isDark ? DARK_ROLES : LIGHT_ROLES), [isDark]);
  const selectedRole = useMemo<Role>(() => {
    return (roles.find((r) => r.id === selectedRoleId) ?? roles[0]) as Role;
  }, [roles, selectedRoleId]);

  // If we switch themes and the current selection doesn't exist, fall back to default.
  useEffect(() => {
    if (!roles.some((r) => r.id === selectedRoleId)) {
      setSelectedRoleId(roles[0]?.id ?? "product-designer");
    }
  }, [roles, selectedRoleId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSelect = (role: Role) => {
    setSelectedRoleId(role.id);
    setIsOpen(false);
  };

  const SelectedIcon = selectedRole.icon;
  const selectedLabel =
    selectedRole.id === "product-designer" && isDark
      ? "Vibe Coder"
      : selectedRole.label;

  const roleStyle = useMemo(() => {
    const styles = isDark ? DARK_ROLE_STYLES : LIGHT_ROLE_STYLES;
    return styles[selectedRole.id] ?? (isDark ? DARK_ROLE_STYLES["product-designer"] : LIGHT_ROLE_STYLES["product-designer"]);
  }, [isDark, selectedRole.id]);

  // Push role tint into global tokens (links + text selection).
  // This runs client-side after mount (safe for hydration).
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--role-accent", roleStyle.accent);
    root.style.setProperty("--role-accent-bg", roleStyle.bg);
    root.style.setProperty("--role-accent-bg-hover", roleStyle.bgHover);
    root.style.setProperty("--selection-bg", roleStyle.bg);
    root.style.setProperty("--selection-fg", "var(--foreground)");

    // Make link styling follow the current role accent.
    root.style.setProperty("--link", roleStyle.accent);
    root.style.setProperty("--link-underline", roleStyle.accent);
  }, [roleStyle.accent, roleStyle.bg, roleStyle.bgHover]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={
          {
            "--role-accent": roleStyle.accent,
            "--role-accent-bg": roleStyle.bg,
            "--role-accent-bg-hover": roleStyle.bgHover,
          } as React.CSSProperties
        }
        className="inline-flex h-16 md:h-20 items-center gap-3 px-7 md:px-10 rounded-full transition-colors duration-200 cursor-pointer border border-[var(--role-accent)] bg-[var(--role-accent-bg)] hover:bg-[var(--role-accent-bg-hover)] text-foreground"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <SelectedIcon
          className="w-7 h-7 md:w-9 md:h-9 shrink-0"
          style={{ color: "var(--role-accent)" }}
        />
        <span
          className="capitalize text-2xl md:text-4xl font-bold leading-none"
          style={{ color: "var(--role-accent)" }}
        >
          {selectedLabel}
        </span>
        <ChevronDown 
          className={`w-7 h-7 md:w-9 md:h-9 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
          style={{ color: "var(--role-accent)" }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-3 w-80 bg-background rounded-2xl shadow-xl border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
          aria-label="Select role"
        >
          <div className="p-2">
            {roles.filter((role) => role.id !== selectedRole.id).map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleSelect(role)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-foreground font-semibold text-xl md:text-2xl hover:bg-muted rounded-xl transition-colors duration-150"
                  role="option"
                  aria-selected={selectedRole.id === role.id}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
                  <span className="capitalize">{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

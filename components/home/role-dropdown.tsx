"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Navigation, Bot, Pencil, LayoutGrid, Sparkles, Palette } from "lucide-react";

const roles = [
  {
    id: "product-designer",
    label: "product designer",
    icon: Navigation,
    isDefault: true,
  },
  {
    id: "design-engineer",
    label: "design engineer",
    icon: Bot,
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

export function RoleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = (role: typeof roles[0]) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  const SelectedIcon = selectedRole.icon;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF5F0] hover:bg-[#FFE8DD] text-[#E85D2D] font-semibold text-xl md:text-2xl rounded-xl transition-colors duration-200 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <SelectedIcon className="w-5 h-5 md:w-6 md:h-6" />
        <span>{selectedRole.label}</span>
        <ChevronDown 
          className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-2 w-72 bg-background rounded-2xl shadow-xl border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
          aria-label="Select role"
        >
          <div className="p-2">
            {roles.filter(role => role.id !== selectedRole.id).map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleSelect(role)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-foreground font-semibold text-xl hover:bg-muted rounded-xl transition-colors duration-150"
                  role="option"
                  aria-selected={selectedRole.id === role.id}
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

export type StoriesTab = "reels" | "read";

interface StoriesToggleProps {
  active: StoriesTab;
  onChange: (tab: StoriesTab) => void;
}

export default function StoriesToggle({ active, onChange }: StoriesToggleProps) {
  const tabs: { id: StoriesTab; label: string }[] = [
    { id: "reels", label: "60s Reels" },
    { id: "read", label: "Read Stories" },
  ];

  return (
    <div className="inline-flex rounded-full border border-bestie-border bg-white p-1 shadow-card">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            active === tab.id
              ? "bg-bestie-purple text-white shadow-button"
              : "text-bestie-muted hover:text-bestie-text"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

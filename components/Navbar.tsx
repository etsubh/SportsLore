import Link from "next/link";

const navItems = [
  { href: "/reels", label: "60s Lore", featured: true },
  { href: "/prep", label: "Catch Me Up" },
  { href: "/lore", label: "Lore" },
  { href: "/why-care", label: "Why Care?" },
  { href: "/quiz", label: "Quiz" },
  { href: "/chat", label: "Chat" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-bestie-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl transition-transform group-hover:scale-110">🫶</span>
          <span className="bg-gradient-to-r from-bestie-pink to-bestie-purple bg-clip-text text-lg font-bold text-transparent sm:text-xl">
            Sports Bestie
          </span>
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-2 py-1.5 text-xs font-medium transition-all hover:bg-white/10 hover:text-white sm:px-3 sm:text-sm ${
                item.featured
                  ? "text-bestie-pink"
                  : "text-white/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

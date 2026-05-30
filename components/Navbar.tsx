import Link from "next/link";
import Mascot from "@/components/Mascot";
import Button from "@/components/Button";

const navItems = [
  { href: "/lore", label: "Stories" },
  { href: "/prep", label: "Catch Me Up" },
  { href: "/why-care", label: "Why Care?" },
  { href: "/quiz", label: "Find My Sport" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bestie-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <Mascot size={40} className="transition-transform group-hover:scale-110" />
          <span className="font-serif text-xl font-bold text-bestie-purple sm:text-2xl">
            laces
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-bestie-muted transition-colors hover:text-bestie-text"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Button href="/chat" className="!px-5 !py-2 text-sm">
          Start Chatting
        </Button>
      </div>
    </nav>
  );
}

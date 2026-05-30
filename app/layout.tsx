import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GradientBackground from "@/components/GradientBackground";
import { AppProvider } from "@/context/AppContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Sports Bestie — Never Feel Lost in a Sports Conversation",
  description:
    "Get caught up on the stories, rivalries, players, and drama that make sports worth caring about. Built for social confidence, not sports expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-display antialiased`}>
        <AppProvider>
          <GradientBackground>
            <Navbar />
            <main className="pt-16">{children}</main>
          </GradientBackground>
        </AppProvider>
      </body>
    </html>
  );
}

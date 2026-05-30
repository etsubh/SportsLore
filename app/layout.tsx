import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GradientBackground from "@/components/GradientBackground";
import { AppProvider } from "@/context/AppContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "laces — Never Feel Lost in a Sports Conversation",
  description:
    "Catch up fast on the stories, rivalries, and drama that make sports worth caring about. Built for social confidence, not sports expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}>
        <AppProvider>
          <GradientBackground>
            <Navbar />
            <main className="pt-20">{children}</main>
          </GradientBackground>
        </AppProvider>
      </body>
    </html>
  );
}

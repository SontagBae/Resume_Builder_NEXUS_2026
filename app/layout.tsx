import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using a modern tech font
import "./globals.css";
import { NavigationHost } from "@/components/layout/NavigationHost";
import { WorkspaceProvider } from "@/components/layout/WorkspaceProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "NEXUS-RESUME (v2026)",
  description: "Next-gen AI Career Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-white/20">
        <WorkspaceProvider>
          <NavigationHost />
          <main className="pt-28 pb-10 min-h-screen px-6 max-w-7xl mx-auto">
            {children}
          </main>
        </WorkspaceProvider>
      </body>
    </html>
  );
}

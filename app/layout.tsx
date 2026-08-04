// Importacion de libreias
import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

// Configuramos la fuente
const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "900"]
});

export const metadata: Metadata = {
  title: "BrewKoffee - Ordering system for cafeterias",
  description: "Order management system for cafes, with administration panel and real-time tracking with role distribution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} antialiased h-full overflow-hidden`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <ThemeProvider attribute="class" defaultTheme="dark" storageKey="brewkoffee-theme">
          {children}
          <Toaster 
            position="top-right" 
            richColors 
            closeButton
            theme="system"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

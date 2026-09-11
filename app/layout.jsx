import { RootProvider } from "fumadocs-ui/provider/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const bodyFont = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body"
});

const displayFont = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display"
});

export const metadata = {
  title: {
    default: "bored documentation",
    template: "%s | bored documentation"
  },
  description: "Documentation for the bored Discord bot.",
  icons: {
    icon: "/logo/design3transparent.png",
    shortcut: "/logo/design3transparent.png",
    apple: "/logo/design3transparent.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable} flex min-h-screen flex-col`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

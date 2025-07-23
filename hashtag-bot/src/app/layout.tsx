import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HASHTAG BOT - Mini-Application",
  description: "Application mobile pour la boutique HASHTAG BOT. Numero 1 dans le Nord Pas-de-Calais.",
  keywords: ["hashtag", "bot", "cannabis", "cbd", "nord", "pas-de-calais"],
  authors: [{ name: "HASHTAG BOT Team" }],
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#1a1a1a",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HASHTAG BOT",
  },
  openGraph: {
    title: "HASHTAG BOT - Mini-Application",
    description: "Application mobile pour la boutique HASHTAG BOT",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

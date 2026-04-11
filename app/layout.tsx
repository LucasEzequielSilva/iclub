import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CurrencyProvider from "@/components/CurrencyProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iclub-two.vercel.app"),
  title: {
    default: "iCLUB Store | iPhones verificados al mejor precio",
    template: "%s | iCLUB Store",
  },
  description:
    "iPhones seminuevos con batería al 100% y garantía de 30 días. Precios en USD, entrega en el día en CABA/GBA. iPhone 11 al 17 Pro Max.",
  keywords: [
    "iPhone",
    "iPhones seminuevos",
    "iPhones usados",
    "comprar iPhone Argentina",
    "iPhone batería 100",
    "iPhone garantía",
    "iCLUB Store",
    "iPhone CABA",
    "iPhone GBA",
    "iPhone precio dólar",
  ],
  authors: [{ name: "iCLUB Store" }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "iCLUB Store | iPhones verificados al mejor precio",
    description:
      "iPhones seminuevos con batería al 100% y garantía de 30 días. Precios en USD, entrega en el día en CABA/GBA.",
    url: "https://iclub-two.vercel.app",
    siteName: "iCLUB Store",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iCLUB Store | iPhones verificados al mejor precio",
    description:
      "iPhones seminuevos con batería al 100% y garantía de 30 días. Entrega en el día en CABA/GBA.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} ${spaceGrotesk.variable} bg-white text-slate-700 antialiased`}>
        <CurrencyProvider>{children}</CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}

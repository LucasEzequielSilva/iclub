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
  title: "iCLUB Store | iPhones verificados al mejor precio",
  description:
    "iPhones seminuevos con batería al 100% y garantía de 30 días. Precios en USD, entrega en el día en CABA/GBA. iPhone 11 al 16 Pro Max.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "iCLUB Store | iPhones verificados al mejor precio",
    description:
      "iPhones seminuevos con batería al 100% y garantía de 30 días. Precios en USD, entrega en el día en CABA/GBA.",
    locale: "es_AR",
    type: "website",
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

export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QualityGallery from "@/components/QualityGallery";
import Featured from "@/components/Featured";
import Inventory from "@/components/Inventory";
import Warranty from "@/components/Warranty";
import Reviews from "@/components/Reviews";
import TradeInBanner from "@/components/TradeInBanner";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "iCLUB Store",
  description: "iPhones verificados con batería al 100% y garantía de 30 días. Precios en USD, entrega en el día en CABA/GBA.",
  url: "https://iclub-two.vercel.app",
  logo: "https://iclub-two.vercel.app/logo iclub.png",
  telephone: "+541173747929",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ramos Mejía",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [
    "https://www.instagram.com/_iclubstore/",
  ],
};

export default function Home() {
  return (
    <HomeClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <QualityGallery />
      <Featured />
      <Inventory />
      <Warranty />
      <Reviews />
      <TradeInBanner />
      <Footer />
    </HomeClient>
  );
}

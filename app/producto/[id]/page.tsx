import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  getProductById,
  iphoneSpecsMap,
  formatPrice,
} from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/product-detail/Breadcrumbs";
import ProductGallery from "@/components/product-detail/ProductGallery";
import ProductHeader from "@/components/product-detail/ProductHeader";
import ProductPricing from "@/components/product-detail/ProductPricing";
import ConditionExplainer from "@/components/product-detail/ConditionExplainer";
import WhatsAppCTA from "@/components/product-detail/WhatsAppCTA";
import TrustBadges from "@/components/product-detail/TrustBadges";
import SpecsTable from "@/components/product-detail/SpecsTable";
import ShippingInfo from "@/components/product-detail/ShippingInfo";
import WarrantyInfo from "@/components/product-detail/WarrantyInfo";
import PaymentMethods from "@/components/product-detail/PaymentMethods";
import RelatedProducts from "@/components/product-detail/RelatedProducts";
import StickyBottomBar from "@/components/product-detail/StickyBottomBar";
import ProductVariants from "@/components/product-detail/ProductVariants";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Producto no encontrado | iCLUB Store" };

  const title = `${product.name} ${product.capacity} ${product.color}`;
  const description = `${product.name} ${product.capacity} en color ${product.color}. Condición: ${product.condition}. ${formatPrice(product.price)}. Garantía iCLUB incluida.`;
  const image = product.images?.[0] ? `https://iclub-two.vercel.app${product.images[0]}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description: `Comprá tu ${product.name} al mejor precio. ${product.condition}. ${formatPrice(product.price)}.`,
      url: `https://iclub-two.vercel.app/producto/${product.id}`,
      images: image ? [{ url: image, width: 800, height: 600, alt: title }] : undefined,
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${product.name} ${product.condition} a ${formatPrice(product.price)}. Garantía iCLUB incluida.`,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const specs = iphoneSpecsMap[product.modelKey] ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.capacity} ${product.color}`,
    description: `${product.name} ${product.capacity} en color ${product.color}. Condición: ${product.condition}. ${formatPrice(product.price)}. Garantía iCLUB de 30 días incluida.`,
    image: product.images?.[0] ? `https://iclub-two.vercel.app${product.images[0]}` : undefined,
    brand: {
      "@type": "Brand",
      name: "Apple",
    },
    offers: {
      "@type": "Offer",
      url: `https://iclub-two.vercel.app/producto/${product.id}`,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: product.condition === "Sellado"
        ? "https://schema.org/NewCondition"
        : "https://schema.org/UsedCondition",
      seller: {
        "@type": "Organization",
        name: "iCLUB Store",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pb-20 lg:pb-0">
        <Breadcrumbs product={product} />

        {/* Two-column layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Left: Gallery */}
            <ProductGallery product={product} specs={specs} />

            {/* Right: Info — sticky on desktop */}
            <div className="space-y-5 sm:space-y-6 lg:sticky lg:top-28 lg:self-start">
              <ProductHeader product={product} />
              <ProductVariants product={product} />
              <ProductPricing product={product} />
              <ConditionExplainer condition={product.condition} />
              <WhatsAppCTA product={product} />
              <TrustBadges category={product.category} condition={product.condition} productName={product.name} />
            </div>
          </div>
        </section>

        {/* Specs */}
        {specs && <SpecsTable specs={specs} capacity={product.capacity} />}

        {/* Info panels */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 py-8 sm:py-10">
          <ShippingInfo />
          <WarrantyInfo condition={product.condition} />
          <PaymentMethods />
        </div>

        {/* Related */}
        <RelatedProducts product={product} />
      </main>
      <StickyBottomBar product={product} />
      <Footer />
    </>
  );
}

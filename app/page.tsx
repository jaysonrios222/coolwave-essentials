"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import {
  Snowflake,
  Droplets,
  Sun,
  ShieldCheck,
  Truck,
  Star,
} from "lucide-react";

type ShopifyProduct = {
  handle: string;
  title: string;
  description: string;
  image: string;
  variants: {
    id: string;
    price: string;
  }[];
};

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  /* Fade-in (mobile safe) */
  useEffect(() => {
    setLoaded(true);
  }, []);

  /* Fetch products from Shopify */
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();

      const parsed: ShopifyProduct[] = data.products.edges.map(
        ({ node }) => ({
          handle: node.handle,
          title: node.title,
          description: node.description,
          image: node.images.edges[0]?.node.url ?? "",
          variants: node.variants.edges.map(({ node: v }) => ({
            id: v.id,
            price: v.price.amount,
          })),
        })
      );

      setProducts(parsed);
    }

    loadProducts();
  }, []);

  async function handleBuy(variantId: string) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId }),
    });

    const data = await res.json();
    window.location.href = data.checkoutUrl;
  }

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-sky-50 to-white transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/images/coolwave-logo.png"
            alt="Coolwave Essentials"
            className="h-14 sm:h-16 w-auto"
          />
        </Link>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 text-center pt-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Beat Extreme Heat — Instantly
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Reusable cooling solutions built for hot climates.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Snowflake className="h-4 w-4 text-sky-500" />
            Instant Cooling
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-sky-500" />
            Reusable
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-sky-500" />
            Extreme Heat Ready
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.handle}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
          >
            <Link href={`/products/${product.handle}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full aspect-[4/3] object-cover rounded-xl mb-4"
              />
            </Link>

            <h3 className="text-xl font-semibold mb-1">
              {product.title}
            </h3>

            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>

            <p className="text-lg font-bold mb-4">
              ${product.variants[0]?.price}
            </p>

            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={() => handleBuy(product.variants[0].id)}
                className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl py-3 font-semibold transition"
              >
                Buy Now
              </button>

              <Link
                href={`/products/${product.handle}`}
                className="text-center text-sm font-medium text-sky-600 hover:underline"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* TRUST STRIP */}
      <section className="flex flex-wrap justify-center gap-6 py-12 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-sky-500" />
          30-Day Guarantee
        </div>
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-sky-500" />
          Fast Shipping
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Rated 4.8/5
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 pb-10">
        © {new Date().getFullYear()} Coolwave Essentials
      </footer>
    </main>
  );
}

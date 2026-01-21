"use client";

import { useEffect, useState } from "react";
import {
  Snowflake,
  Sun,
  Droplets,
  ShieldCheck,
  Truck,
  Star,
} from "lucide-react";

/* =========================
   SHOPIFY CONFIG (EDIT HERE ONLY)
   ========================= */

const SHOPIFY_DOMAIN = "coolwave-essentials.myshopify.com";
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_BUY_TOKEN;

/*
  👉 HOW TO ADD / CHANGE PRODUCTS
  - handle = matches /products/[handle]
  - buyButtonId = Shopify PRODUCT ID (numbers only)
  - image must exist in /public/images
*/

const products = [
  {
    name: "Instant Cooling Towel",
    handle: "instant-cooling-towel",
    price: "$14.99",
    image: "/images/cooling-towel.jpg",
    buyButtonId: "9159178092759",
  },
  {
    name: "Cooling Towel 2-Pack",
    handle: "cooling-towel-2-pack",
    price: "$24.99",
    image: "/images/cooling-towel-2-pack.jpg",
    buyButtonId: "7582488690767",
  },
  {
    name: "Cooling Neck Wrap",
    handle: "cooling-neck-wrap",
    price: "$18.99",
    image: "/images/cooling-neck-wrap.jpg",
    buyButtonId: "9159178158295",
  },
];

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  /* Fade-in on mount */
  useEffect(() => {
    setLoaded(true);
  }, []);

  /* Load Shopify Buy Button SDK */
  useEffect(() => {
    if (window.ShopifyBuy) return;

    const script = document.createElement("script");
    script.src =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* Initialize Buy Buttons */
  useEffect(() => {
    if (!SHOPIFY_TOKEN) return;

    const interval = setInterval(() => {
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) return;

      clearInterval(interval);

      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: SHOPIFY_TOKEN,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        products.forEach((product, index) => {
          const node = document.getElementById(`buy-button-${index}`);
          if (!node) return;

          node.innerHTML = "";

          ui.createComponent("product", {
            id: product.buyButtonId,
            node,
            options: {
              product: {
                contents: {
                  img: false,
                  title: false,
                  price: false,
                },
                text: {
                  button: "Buy Now",
                },
              },
              cart: {
                startOpen: false,
              },
            },
          });
        });
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-sky-50 to-white transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 pt-6">
        <a href="/" className="inline-flex items-center">
          <img
            src="/images/coolwave-logo.png"
            alt="Coolwave Essentials"
            className="h-12 sm:h-14 w-auto"
          />
        </a>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-12 text-center">
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
        {products.map((product, index) => (
          <div
            key={product.handle}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-[4/3] object-cover rounded-xl mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">
              {product.name}
            </h3>

            <p className="text-lg font-bold mb-4">{product.price}</p>

            {/* VIEW PRODUCT */}
            <a
              href={`/products/${product.handle}`}
              className="mb-3 inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              View Product
            </a>

            {/* SHOPIFY BUY BUTTON */}
            <div id={`buy-button-${index}`} className="mt-auto" />
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

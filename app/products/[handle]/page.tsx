"use client";

import { useEffect } from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

/* =========================
   SHOPIFY CONFIG
   ========================= */

const SHOPIFY_DOMAIN = "coolwave-essentials.myshopify.com";
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_BUY_TOKEN;

/* =========================
   PRODUCT MAP
   ========================= */

const PRODUCT_MAP = {
  "instant-cooling-towel": {
    name: "Instant Cooling Towel",
    price: "$14.99",
    image: "/images/cooling-towel.jpg",
    buyButtonId: "9159178092759",
    description:
      "Instant cooling relief designed for extreme heat, workouts, and outdoor use.",
  },
  "cooling-towel-2-pack": {
    name: "Cooling Towel 2-Pack",
    price: "$24.99",
    image: "/images/cooling-towel-2-pack.jpg",
    buyButtonId: "7582488690767",
    description:
      "Double the cooling power — perfect for families or long outdoor days.",
  },
  "cooling-neck-wrap": {
    name: "Cooling Neck Wrap",
    price: "$18.99",
    image: "/images/cooling-neck-wrap.jpg",
    buyButtonId: "9159178158295",
    description:
      "Targeted neck cooling for maximum heat relief and comfort.",
  },
} as const;

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

type ProductHandle = keyof typeof PRODUCT_MAP;

/* =========================
   PAGE
   ========================= */

export default function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  // ✅ UNWRAP PARAMS (THIS FIXES YOUR ERROR)
  const { handle } = use(params);

  const product = PRODUCT_MAP[handle as ProductHandle];

  if (!product) {
    notFound();
  }

  /* Load Shopify Buy Button SDK */
  useEffect(() => {
    if (window.ShopifyBuy) return;

    const script = document.createElement("script");
    script.src =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* Initialize Buy Button */
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
        const node = document.getElementById("buy-button-product");
        if (!node) return;

        node.innerHTML = "";

        ui.createComponent("product", {
          id: product.buyButtonId,
          node,
          options: {
            product: {
              layout: "vertical",
              contents: {
                img: false,
                title: false,
                price: false,
              },
              text: {
                button: "Add to Cart",
              },
            },
            cart: {
              startOpen: false,
            },
          },
        });
      });
    }, 200);

    return () => clearInterval(interval);
  }, [product.buyButtonId]);

	return (
  <main className="min-h-screen bg-white px-6 py-12">
    {/* HEADER / LOGO */}
    <header className="max-w-6xl mx-auto mb-10">
      <Link
        href="/"
        className="flex justify-center sm:justify-start"
        aria-label="Return to homepage"
      >
        <img
          src="/images/coolwave-logo.png"
          alt="Coolwave Essentials"
          className="h-16 sm:h-14 w-auto"
        />
      </Link>
    </header>

    {/* PRODUCT CONTENT */}
    <div className="max-w-4xl mx-auto">

      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md mx-auto rounded-xl mb-8"
      />

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl font-semibold mb-4">{product.price}</p>

      <p className="text-gray-600 mb-8">{product.description}</p>

          {/* SHOPIFY BUY BUTTON TARGET */}
      <div id="buy-button-product" />
    </div>
  </main>
);
}

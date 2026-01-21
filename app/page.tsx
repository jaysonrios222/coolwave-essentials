"use client";

<header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
  <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img
        src="/images/coolwave-logo.png"
        alt="Coolwave Essentials"
        className="h-8 w-auto sm:h-10"
      />
      <span className="sr-only">Coolwave Essentials</span>
    </div>

    <a
      href="https://coolwave-essentials.myshopify.com"
      className="text-sm font-medium text-gray-700 hover:text-black"
    >
      Shop
    </a>
  </div>
</header>

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Snowflake, Droplets, Sun, Star } from "lucide-react";

const SHOPIFY_DOMAIN = "coolwave-essentials.myshopify.com";
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN!;

type Product = {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: string;
};

export default function CoolingStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(
        `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
          },
          body: JSON.stringify({
            query: `
            {
              products(first: 6) {
                edges {
                  node {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                    variants(first: 1) {
                      edges {
                        node {
                          price {
                            amount
                          }
                        }
                      }
                    }
                  }
                }
              }
            }`,
          }),
        }
      );

      const json = await res.json();
      const items = json.data.products.edges.map((p: any) => ({
        title: p.node.title,
        handle: p.node.handle,
        image: p.node.images.edges[0]?.node.url,
        price: `$${Number(p.node.variants.edges[0].node.price.amount).toFixed(2)}`,
      }));

      setProducts(items);
    }

    loadProducts();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (!sliderRef.current || products.length === 0) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % products.length;
      sliderRef.current!.scrollTo({
        left: sliderRef.current!.clientWidth * index,
        behavior: "smooth",
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pb-24">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-12 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Beat Extreme Heat — Instantly
          </h1>

          <p className="text-gray-600 mb-6">
            Cooling solutions designed for hot climates. No batteries. No bulk.
            Just relief.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex gap-2"><Snowflake className="text-sky-500" /> Activates instantly</li>
            <li className="flex gap-2"><Droplets className="text-sky-500" /> Reusable & breathable</li>
            <li className="flex gap-2"><Sun className="text-sky-500" /> Built for extreme heat</li>
          </ul>

          {products[0] && (
            <Button
              size="lg"
              className="rounded-xl w-full sm:w-auto"
              onClick={() =>
                (window.location.href =
                  `https://${SHOPIFY_DOMAIN}/products/${products[0].handle}`)
              }
            >
              Buy Now — {products[0].price}
            </Button>
          )}

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-400" />
            Rated 4.8/5 by outdoor workers
          </div>
        </motion.div>

        {/* PRODUCT CAROUSEL */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
            >
              {products.map((p, i) => (
                <div
                  key={i}
                  className="min-w-full snap-center p-4 text-center"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full aspect-[4/3] object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <span className="text-lg font-bold">{p.price}</span>

                  <Button
                    className="mt-4 w-full rounded-xl"
                    onClick={() =>
                      (window.location.href =
                        `https://${SHOPIFY_DOMAIN}/products/${p.handle}`)
                    }
                  >
                    View Product
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-10">
        © {new Date().getFullYear()} Coolwave Essentials
      </footer>
    </div>
  );
}

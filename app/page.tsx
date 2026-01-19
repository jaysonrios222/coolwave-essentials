"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Sun, Droplets, ShieldCheck, Truck, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function CoolingStore() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const products = [
    {
      name: "Instant Cooling Towel",
      handle: "instant-cooling-towel",
      price: "$14.99",
      description:
        "Instant evaporative cooling — reusable, breathable, and built for extreme heat.",
      image:
        "https://cdn.shopify.com/s/files/1/0000/0000/products/cooling-towel.jpg",
      variantId: "gid://shopify/ProductVariant/1234567890",
      shopifyUrl:
        "https://coolwave-essentials.myshopify.com/products/instant-cooling-towel",
    },
    {
      name: "Cooling Towel 2-Pack",
      handle: "cooling-towel-2-pack",
      price: "$24.99",
      description: "Best value for daily use or sharing.",
      image:
        "https://cdn.shopify.com/s/files/1/0000/0000/products/cooling-towel-2-pack.jpg",
      variantId: "gid://shopify/ProductVariant/2222222222",
      shopifyUrl:
        "https://coolwave-essentials.myshopify.com/products/cooling-towel-2-pack",
    },
    {
      name: "Cooling Neck Wrap",
      handle: "cooling-neck-wrap",
      price: "$18.99",
      description: "Targeted neck cooling for work, travel, and workouts.",
      image:
        "https://cdn.shopify.com/s/files/1/0000/0000/products/cooling-neck-wrap.jpg",
      variantId: "gid://shopify/ProductVariant/3333333333",
      shopifyUrl:
        "https://coolwave-essentials.myshopify.com/products/cooling-neck-wrap",
    },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % products.length;
      slider.scrollTo({
        left: slider.clientWidth * index,
        behavior: "smooth",
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Beat Extreme Heat — Instantly
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Stay cool anywhere with instant evaporative cooling. No batteries. No
            electricity. Just relief.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-sky-500" />
              Activates in seconds
            </li>
            <li className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-sky-500" />
              Reusable & breathable
            </li>
            <li className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-sky-500" />
              Built for hot climates
            </li>
          </ul>

          <Button
            size="lg"
            className="rounded-xl w-full sm:w-auto"
            onClick={() =>
              (window.location.href = products[0].shopifyUrl)
            }
          >
            Buy Now — {products[0].price}
          </Button>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-400" />
            Rated 4.8/5 by outdoor workers & travelers
          </div>
        </motion.div>

        {/* PRODUCT SLIDER */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="w-full rounded-2xl overflow-hidden shadow-lg">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
            >
              {products.map((product, i) => (
                <div
                  key={i}
                  className="min-w-full snap-center p-4 text-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-[4/3] object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <span className="text-lg font-bold">{product.price}</span>
                  <Button
                    className="mt-4 rounded-xl w-full"
                    onClick={() =>
                      (window.location.href = product.shopifyUrl)
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

      {/* SOCIAL PROOF */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted in Hot Climates Worldwide
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {["Texas", "Florida", "Arizona"].map((region, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-2">
                  “This towel saved me working outdoors in {region} heat.
                  Instant relief.”
                </p>
                <span className="text-sm text-gray-500">
                  Verified Customer · {region}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
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
          <Snowflake className="h-5 w-5 text-sky-500" />
          Designed for Extreme Heat
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 pb-10">
        © {new Date().getFullYear()} Coolwave Essentials · Built for hot climates
      </footer>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Snowflake, Sun, Droplets, ShieldCheck, Truck, Star } from "lucide-react";

export default function CoolingStore() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const products = [
    {
      name: "Instant Cooling Towel",
      price: "$14.99",
      description: "Instant evaporative cooling for extreme heat.",
      image: "/images/product-1.jpg",
      buyButtonId: "9159178092759",
    },
    {
      name: "Cooling Towel 2-Pack",
      price: "$24.99",
      description: "Best value for daily use or sharing.",
      image: "/images/product-2.jpg",
      buyButtonId: "PRODUCT_ID_2",
    },
    {
      name: "Cooling Neck Wrap",
      price: "$18.99",
      description: "Targeted neck cooling for work & travel.",
      image: "/images/product-3.jpg",
      buyButtonId: "PRODUCT_ID_3",
    },
  ];
  useEffect(() => {
  if (typeof window === "undefined") return;

  if ((window as any).ShopifyBuy) return;

  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

	// Buy Button Initialization
	useEffect(() => {
  if (typeof window === "undefined") return;

  const interval = setInterval(() => {
    const ShopifyBuy = (window as any).ShopifyBuy;

    if (!ShopifyBuy || !ShopifyBuy.UI) return;

    clearInterval(interval);

    const client = ShopifyBuy.buildClient({
      domain: "coolwave-essentials.myshopify.com",
      storefrontAccessToken:
        process.env.NEXT_PUBLIC_SHOPIFY_BUY_TOKEN,
    });

    ShopifyBuy.UI.onReady(client).then((ui: any) => {
      products.forEach((product, index) => {
        const node = document.getElementById(`buy-button-${index}`);
        if (!node) return;

        node.innerHTML = "";

        ui.createComponent("product", {
          id: product.buyButtonId, // MUST be numeric
          node,
          options: {
            product: {
              layout: "vertical",
              buttonDestination: "checkout",
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


  // Auto-slide carousel (mobile safe)
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
  }, []);

  // Load Shopify Buy Button SDK
  useEffect(() => {
    if ((window as any).ShopifyBuy) return;

    const script = document.createElement("script");
    script.src =
      "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <img
            src="/images/coolwave-logo.png"
            alt="Coolwave Essentials"
            className="h-9 w-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="text-sm font-medium text-gray-600">
            Built for extreme heat
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Beat Extreme Heat — Instantly
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Cooling relief anywhere. No batteries. No electricity.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-sky-500" /> Activates in seconds
            </li>
            <li className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-sky-500" /> Reusable & breathable
            </li>
            <li className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-sky-500" /> Designed for hot climates
            </li>
          </ul>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            Rated 4.8/5 by outdoor workers
          </div>
        </div>

        {/* PRODUCT CAROUSEL */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
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
                  className="w-full aspect-square object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mb-2">
                  {product.description}
                </p>
                <span className="text-lg font-bold">{product.price}</span>

                {/* Shopify Buy Button container */}
                <div
                  id={`buy-button-${i}`}
                  className="mt-4"
                  data-product-id={product.buyButtonId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="flex flex-wrap justify-center gap-6 py-12 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-sky-500" /> 30-Day Guarantee
        </div>
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-sky-500" /> Fast Shipping
        </div>
        <div className="flex items-center gap-2">
          <Snowflake className="h-5 w-5 text-sky-500" /> Extreme Heat Tested
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 pb-10">
        © {new Date().getFullYear()} Coolwave Essentials
      </footer>
    </div>
  );
}

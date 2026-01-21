const SHOPIFY_DOMAIN = "coolwave-essentials.myshopify.com";
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  const res = await fetch(
    `https://${domain}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Shopify response status:", res.status);
    const text = await res.text();
    console.error("Shopify response body:", text);
    throw new Error("Shopify fetch failed");
  }

  const json = await res.json();
  return json.data;
}
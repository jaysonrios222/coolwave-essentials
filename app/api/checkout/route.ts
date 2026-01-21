import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { variantId, quantity = 1 } = await req.json();

    if (!variantId) {
      return NextResponse.json(
        { error: "Missing variantId" },
        { status: 400 }
      );
    }

    const data = await shopifyFetch<{
      checkoutCreate: {
        checkout: {
          webUrl: string;
        };
      };
    }>({
      query: `
        mutation CreateCheckout($variantId: ID!, $quantity: Int!) {
          checkoutCreate(
            input: {
              lineItems: [
                {
                  variantId: $variantId
                  quantity: $quantity
                }
              ]
            }
          ) {
            checkout {
              webUrl
            }
          }
        }
      `,
      variables: {
        variantId,
        quantity,
      },
    });

    return NextResponse.json({
      checkoutUrl: data.checkoutCreate.checkout.webUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Checkout creation failed" },
      { status: 500 }
    );
  }
}

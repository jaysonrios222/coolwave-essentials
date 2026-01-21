import { shopifyFetch } from "./shopify";

export async function getProducts() {
  return shopifyFetch<{
    products: {
      edges: {
        node: {
          id: string;
          handle: string;
          title: string;
          description: string;
          images: {
            edges: {
              node: {
                url: string;
              };
            }[];
          };
          variants: {
            edges: {
              node: {
                id: string;
                title: string;
                price: {
                  amount: string;
                };
                selectedOptions: {
                  name: string;
                  value: string;
                }[];
              };
            }[];
          };
        };
      }[];
    };
  }>({
    query: `
      {
        products(first: 10) {
          edges {
            node {
              id
              handle
              title
              description
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
}

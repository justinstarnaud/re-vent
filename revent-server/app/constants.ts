export const ALL_PRODUCTS_QUERY = `query getProductList {
    products(sortKey: TITLE, first: 10) {
      edges {
        node {
          id
          handle
          description
          title
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }`;

export const PRODUCT_BY_HANDLE_QUERY = `query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      description
      title
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      vendor
    }
  }`;
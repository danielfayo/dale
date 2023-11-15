import { Product } from "@/lib/types";
import {
  Body,
  Container,
  Head,
  // Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

// const productFile: Product = {
//   creatorId: "",
//   productCategory: "",
//   productContentURLs: [
//     "https://firebasestorage.googleapis.com/v0/b/dale-4f438.appspot.com/o/contentFiles%2F84TUSpTHpVHOIRhJYLZp3%2F0?alt=media&token=bac62d0a-a1de-4006-b43a-cfd1f162dfa9",
//     "https://firebasestorage.googleapis.com/v0/b/dale-4f438.appspot.com/o/contentFiles%2FAF2S3tP6fdVJA0Xwdw0Za%2F0?alt=media&token=ba2edd46-6d2a-49aa-912c-5231fe92bbe9",
//   ],
//   productCoverURL:
//     "https://firebasestorage.googleapis.com/v0/b/dale-4f438.appspot.com/o/productCovers%2FAF2S3tP6fdVJA0Xwdw0Za%2Fimage?alt=media&token=f7d286ea-f661-4f4a-bb10-991556723c15",
//   productName:
//     "A collection of high-quality, unstyled components for creating beautiful emails using React and TypeScript.",
//   productDesc: "",
//   productId: "",
//   productPrice: "",
//   sales: 0,
// };
export interface PurchaseEmailProps {
  product: Product;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const PurchaseEmail = ({
  product,
}: PurchaseEmailProps) => (
  <Html>
    <Head />
    <Preview>Product Purchase</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={h1}>{product?.productName}</Text>
        {/* <Link
            href="https://notion.so"
            target="_blank"
            style={{
              ...link,
              display: 'block',
              marginBottom: '16px',
            }}
          >
            Here is a link to the product you purchased
          </Link> */}
        <Img src={product.productCoverURL!} alt="Product image" width={340} />
        <Text style={{ ...text, marginBottom: "14px" }}>
          Download your file(s) here:
        </Text>
        {/* <code style={code}>{loginCode}</code> */}
        {product.productContentURLs.map((each, id) => (
          <Container
            style={{
              padding: "16px 4.5%",
              width: "100%",
              backgroundColor: "#f4f4f4",
              borderRadius: "5px",
              border: "1px solid #eee",
              color: "#333",
              marginBottom: "8px",
            }}
            key={id}
          >
            <Text
              style={{
                color: "#333",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                fontSize: "14px",
              }}
            >
              File {id + 1}
            </Text>
            <a style={link} href={each} download>
              Go to file
            </a>
            {/* <Link style={{...link, cursor: "pointer"}}></Link> */}
          </Container>
        ))}
        {/* <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "14px",
            marginBottom: "16px",
          }}
        >
          If you didn&apos;t try to login, you can safely ignore this email.
        </Text> */}
        <Text
          style={{
            ...text,
            color: "#ababab",
            marginTop: "12px",
            marginBottom: "38px",
          }}
        >
          Hint: You can star this mail so that it can be easily found whenever
          you need it.
        </Text>
        {/* <Img
            src={`${baseUrl}/static/notion-logo.png`}
            width="32"
            height="32"
            alt="Notion's Logo"
          /> */}
        <Text style={footer}>
          <Link
            href="https://dale-one.vercel.app"
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            Dale
          </Link>
          , enables content creators
          <br />
          to monetize their work.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PurchaseEmail;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};

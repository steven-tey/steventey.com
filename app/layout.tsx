import { GeistSans, GeistMono } from "geist/font";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import Container from "./components/container";
import NavBar from "./components/navbar";

export const metadata = {
  title: "Steven Tey",
  description: "Personal website of Steven Tey",
  metadataBase: "https://steventey.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(GeistSans.variable, GeistMono.variable)}>
      <body className="overflow-x-hidden">
        <Analytics />
        <NavBar />
        <Container>{children}</Container>
      </body>
    </html>
  );
}

import { clash, inter } from "@/styles/fonts";
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
    <html lang="en">
      <body
        className={cx(clash.variable, inter.className, "overflow-x-hidden")}
      >
        <Analytics />
        <NavBar />
        <Container>{children}</Container>
      </body>
    </html>
  );
}

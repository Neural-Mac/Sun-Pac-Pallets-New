import type { Metadata } from "next";
import { Adamina, Poppins } from "next/font/google";
import "./globals.css";

const adamina = Adamina({
  weight: "400",
  variable: "--font-adamina",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pallet Engineer V1",
  description: "Premium manufacturing website for new & custom wood pallets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${adamina.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

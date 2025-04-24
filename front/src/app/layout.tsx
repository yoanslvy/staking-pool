import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solana Staking",
  description: "Stake your SOL and earn rewards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#e6f0eb] antialiased">{children}</body>
    </html>
  );
}

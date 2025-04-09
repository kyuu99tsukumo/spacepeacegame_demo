import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "スペースピースゲーム",
  description: "あなたの価値観でタイプ診断！",
  openGraph: {
    title: "スペースピースゲーム",
    description: "あなたの価値観でタイプ診断！",
    url: "https://spacepeacegame-demo.vercel.app/",
    siteName: "スペースピースゲーム",
    images: [
      {
        url: "https://spacepeacegame-demo.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Space Peace Game",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "スペースピースゲーム",
    description: "あなたの価値観でタイプ診断！",
    site: "@space_peacegg",
    images: ["https://spacepeacegame-demo.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


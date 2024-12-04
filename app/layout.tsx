import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./utils/theme-provider";
import Footer from "./components/Footer";

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

// const imageUrl = "https://bloggng.netlify.app/blog_bg.png";

export const metadata: Metadata = {
  title: "BlogNG",
  description: "Your hub for daily, up-to-date news and info!",
  openGraph: {
    type: "website",
    url: "https://bloggng.netlify.app",
    title: "BlogNG",
    description: "Your hub for daily, up-to-date news and info!",
    images: [
      {
        url: "https://bloggng.netlify.app/blog_bg.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-green-600 selection:text-white py-5`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mx-auto max-w-7xl px-5">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Localization",
  description: "Hack to get",
  openGraph: {
    title: "CSTAD Vulnerable Web Application Laboratory",
    description:
      "This is the lab for students to pratice XSS vulnerabilities attacks",
    url: "http://136.228.158.126:50004/",
    images: "https://store.istad.co/media/icon_images/ISTAD.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

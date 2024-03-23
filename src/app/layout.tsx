import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecoilContextProvider } from "@/providers/RecoilContextProvider";

const inter = Inter({ subsets: ["latin"] });
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Okto AI",
  description: "Okto AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <RecoilContextProvider>
          <div className="flex flex-col justify-between min-h-screen bg-gray-900">
            <div className="flex flex-col">
              <Header />
              {children}
            </div>
            {/* <Footer /> */}
          </div>
        </RecoilContextProvider>
      </body>
    </html>
  );
}

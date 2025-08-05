import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { CloudDownload } from "lucide-react";
import Script from "next/script";

export const metadata = {
  title: 'سوبر رهيب',
  description: 'أفضل متجر للمنتجات الرقمية',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <Script async defer data-domain="example.com" src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      </head>
      <body className="container bg-body max-w-5xl *:select-none">
        <div className="p-5 sm:p-8 min-h-screen">

          <header className="flex items-center justify-between" data-aos="fade-down">
            <Link href="\" className="text-2xl md:text-3xl space-x-2">
              <span className="text-text">سوبر</span>
              <span className="text-primary">رهيب</span>
            </Link>
            <Link href="\downloads">
              <CloudDownload className="size-12 md:size-14 text-text p-2 hover:bg-gray-200 rounded-lg transition-colors" />
            </Link>
          </header>

          {children}
        </div>

        <footer className="mt-auto bg-primary-light/80 w-full h-24 rounded-t-4xl flex items-center justify-between px-[8vw]">
          <Link href="\">
            <Image src='/logo.png' unoptimized className='block w-32 object-contain' alt='robot' width={50} height={50}/>
          </Link>

          <Link href="https://wa.me/201044197802" target="_blank" rel="noopener noreferrer"
            className="text-sm bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition">
            تواصل معنا
          </Link>
        </footer>

      </body>
    </html>
  );
}


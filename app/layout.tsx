import type { Metadata } from "next";
import localFont from "next/font/local";
import { Crimson_Text, Merriweather } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://biblemaximum.com'),
  title: "Bible Quiz & Study | Free Quizzes for All 66 Books with Answers & Explanations | Greek & Hebrew Lexicon Included | Bible Maximum",
  description: "Comprehensive Bible quizzes for all 66 books with 16-25 questions each. Test your biblical knowledge with interactive quizzes covering Old and New Testament. Perfect for Bible study groups, Sunday school, and personal growth.",
  keywords: "bible quiz, scripture test, bible knowledge, christian quiz, bible study, old testament, new testament, bible trivia",
  alternates: { canonical: '/' },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const countryCode = headersList.get('x-country-code') || 'UNKNOWN';

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Head Script */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5PTL3XFC');
          `,
        }}
      />
      {/* Push country code to dataLayer for GTM geo-blocking */}
      <Script
        id="gtm-country-data"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              country_code: '${countryCode}'
            });
          `,
        }}
      />
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${crimsonText.variable} ${merriweather.variable} antialiased min-h-screen flex flex-col bg-primary-light/30`}
    >
      {/* Google Tag Manager - Body (noscript fallback) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5PTL3XFC"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

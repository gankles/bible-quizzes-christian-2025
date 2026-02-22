import type { Metadata } from "next";
import localFont from "next/font/local";
import { Crimson_Text, Merriweather } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonText.variable} ${merriweather.variable} antialiased min-h-screen flex flex-col bg-primary-light/30`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

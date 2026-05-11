import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

// Inter for English — clean professional sans-serif
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PeopleCore — Modern HR Management System",
  description:
    "PeopleCore is the all-in-one HR platform for managing employees, payroll, attendance, and performance. Supports Arabic and English.",
  keywords: "HR software, human resources, payroll, attendance, employee management, Arabic HR",
  openGraph: {
    title: "PeopleCore HR System",
    description: "Streamline your HR operations with PeopleCore",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang and dir are dynamically updated by the i18n context on the client
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for Cairo (Arabic) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

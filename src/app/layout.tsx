import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comprovante R$10500,00 - Forma de pagamento: Pix. Completo",
  description: "Comprovante R$10500,00 - Forma de pagamento: Pix. Completo",
  openGraph: {
    title: "Comprovante R$10500,00 - Forma de pagamento: Pix. Completo",
    description: "Comprovante R$10500,00 - Forma de pagamento: Pix. Completo",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

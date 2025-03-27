import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/default-provider";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Music App",
  description: "Your favorite music app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

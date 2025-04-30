import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import { Toaster } from "sonner";
import { ResumeProvider } from "@/context/ResumeProvider";

const outfit = Outfit({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${outfit.className}  antialiased`}
      >
       <div>
        <Provider>
        <ResumeProvider>
          {children}
        </ResumeProvider>
        </Provider>
        <Toaster richColors />
       </div>
      </body>
    </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/home/sidebar";
import { SessionProvider } from "next-auth/react";
import Wrapper from "@/components/wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Policy Sense",
  description: "Get help regarding your financial policies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <SessionProvider>
        <body className={`${inter.className} bg-[#F1F9FC]`}>
          <Wrapper>
            <div className="flex">
              <Sidebar />
              <div className="flex-1 p-4 md:ml-[330px]">{children}</div>
            </div>
          </Wrapper>
        </body>
      </SessionProvider>
    </html>
  );
}

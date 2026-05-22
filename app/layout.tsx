"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import StrategicFeedback from "@/components/Dashboard/StrategicFeedback";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isOnboarding = pathname === '/onboarding';

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-white antialiased`}>
        <div className="flex">
          {!isOnboarding && <Sidebar />}
          <main className={!isOnboarding ? "flex-1 ml-64 min-h-screen p-8" : "flex-1 min-h-screen"}>
            {children}
            {!isOnboarding && <StrategicFeedback />}
          </main>
        </div>
      </body>
    </html>
  );
}

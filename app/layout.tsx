import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HealthConnect - ดูแลคุณ เหมือนมีคุณหมอเป็นเพื่อนสนิทข้างกาย",
  description:
    "ปรึกษาแพทย์ออนไลน์ได้ทันที ตลอด 24 ชั่วโมง ไม่ต้องรอคิว ไม่ต้องเดินทาง เลือกแพ็กเกจที่ใช่สำหรับคุณ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} antialiased`}>
      <body className={`${prompt.className} min-h-full flex flex-col bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}

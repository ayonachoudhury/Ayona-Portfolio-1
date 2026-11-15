import "./globals.css";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
const d = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-d", weight: ["400","500","600","700"] });
const b = Inter_Tight({ subsets: ["latin"], variable: "--f-b", weight: ["300","400","500","600","700","800"] });
export const metadata = { title: "Ayona Choudhury — Strategy & Stories", description: "Portfolio of Ayona Choudhury, BBA Honours, TAPMI Bengaluru." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${d.variable} ${b.variable} font-body bg-white text-ink antialiased`}>{children}</body></html>;
}

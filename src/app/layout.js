import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hind = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "ASC",
  description: "Al Islah Islami Academy Student Community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={hind.className}>{children}</body>
    </html>
  );
}

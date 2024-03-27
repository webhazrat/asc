import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

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
      <AuthProvider>
        <body className={`${hind.className}`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}

import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/common/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

import { Outfit } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/ReduxProvider"; // 🔥 ADD THIS
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ReduxProvider>   {/* ✅ NOW WHOLE APP CONNECTED */}
          <ThemeProvider>
            <SidebarProvider>
              {children}
              <Toaster position="top-right" reverseOrder={false} />
            </SidebarProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </ThemeProvider>
  )
}

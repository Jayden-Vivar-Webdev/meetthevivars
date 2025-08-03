import WeddingHeader from "./components/partials/header";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        <div className="pt-10"></div>
        <WeddingHeader />
        {children}
      </body>
    </html>
  );
}

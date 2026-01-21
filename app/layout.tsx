import "./globals.css";

export const metadata = {
  title: "Coolwave Essentials",
  description: "Cooling solutions for extreme heat",
  icons: {
    icon: "/images/coolwave-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}

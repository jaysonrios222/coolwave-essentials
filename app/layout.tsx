import "./globals.css";

export const metadata = {
  title: "Coolwave Essentials | Beat the Heat Instantly",
  description:
    "Premium cooling towels and wraps designed for extreme heat. Reusable, breathable, and built for hot climates.",
  icons: {
    icon: "public/images/coolwave-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

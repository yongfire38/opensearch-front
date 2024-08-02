import "./globals.css";

export const metadata = {
  title: "VecSearch",
  description: "A simple search application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>VecSearch</title>
      </head>
      <body className="bg-gray-100 text-gray-900">
        <div className="max-w-4xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}

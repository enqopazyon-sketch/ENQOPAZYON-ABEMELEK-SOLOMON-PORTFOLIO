import "./globals.css";

export const metadata = {
  title: "ENQOPAZYON | ABEMELEK SOLOMON Developer Portfolio",
  description: "Portfolio of ABEMELEK SOLOMON (Melek) - Specialized in building modern web apps, intelligent automation bots, and cross-platform mobile/desktop applications under the brand ENQOPAZYON.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

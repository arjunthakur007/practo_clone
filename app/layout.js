import "./globals.css";
import { lato, open_sans } from "./fonts";
import { colors } from "./colors";

export const metadata = {
  title: "Practo Clone",
  description: "Clone for the practo app",
};

export default function RootLayout({ children }) {
  const fontClasses = `${lato.className} ${open_sans.className}`;

  console.log("Primary color is:", colors.primary);
  return (
    <html lang="en" className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}

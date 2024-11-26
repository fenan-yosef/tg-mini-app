import Footer from "./Footer";
import "./globals.css";

export const metadata = {
  title: "Task Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
      </head>
      <body>
        <main style={{ minHeight: "calc(100vh - 4rem)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

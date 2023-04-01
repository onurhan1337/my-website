import Header from "../components/header";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import "@upstash/claps/style.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div>
        <Header />
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </div>
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;

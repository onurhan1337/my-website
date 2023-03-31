import Header from "../components/header";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import "@upstash/claps/style.css";
import "nprogress/nprogress.css";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

const ProgressBar = dynamic(() => import("../components/progressbar"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      {/* TODO: cursor color will be change  */}
      <div>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <ProgressBar />
      </div>
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;

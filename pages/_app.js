import Header from "../components/header";
import "../styles/globals.css";
import "@upstash/claps/style.css";
import "nprogress/nprogress.css";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

const ProgressBar = dynamic(() => import('../components/progressbar'), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      {/* TODO: cursor color will be change  */}
      <div>
        <AnimatedCursor
          color="214, 188, 250"
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={1.2}
          outerAlpha={0}
          outerStyle={{
            border: "1px solid #2C3333",
          }}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />
        <Header />
            <main>
              <Component {...pageProps} />
            </main>
        <ProgressBar />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
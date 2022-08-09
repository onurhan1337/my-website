import Header from "../components/header";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div>
        <AnimatedCursor
          color="79, 70, 229"
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={1.2}
          outerAlpha={0}
          outerStyle={{
            border: "1px solid black",
            hover: {
              backgroundColor: "red",
              borderColor: "#FEE3B4",
            },
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
      </div>
    </ThemeProvider>
  );
}

export default MyApp;

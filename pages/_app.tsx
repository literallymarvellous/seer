import type { AppProps, NextWebVitalsMetric } from "next/app";
import { GlobalStyles } from "../components/GlobalStyles";

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

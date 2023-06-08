import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";
import { SWRConfig } from "swr";
import { CacheProvider } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default App;

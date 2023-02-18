import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { supabase } from "@/lib/supabase";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionContextProvider>
  );
}

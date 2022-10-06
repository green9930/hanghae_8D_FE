import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import ScrollToTop from "components/etc/ScrollToTop";
import GlobalStyle from "styles/GlobalStyle";
import * as serviceWorkerRegistration from "serviceWorkerRegistration";
import LoadingMessage from "components/etc/LoadingMessage";
import { Suspense } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    suspense: true,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ReactQueryDevtools initialIsOpen={true} />
          <Suspense fallback={<LoadingMessage />}>
            <App />
          </Suspense>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  </>
);

serviceWorkerRegistration.register();

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";
import App from "./App";
import { RecoilRoot } from "recoil";
import LoadingMessage from "components/etc/LoadingMessage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Suspense fallback={<LoadingMessage />}>
      <GlobalStyle />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ReactQueryDevtools initialIsOpen={true} />
            <App />
          </RecoilRoot>
        </QueryClientProvider>
      </BrowserRouter>
    </Suspense>
  </>
);

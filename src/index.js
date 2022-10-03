import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import ScrollToTop from "components/etc/ScrollToTop";
import GlobalStyle from "styles/GlobalStyle";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ReactQueryDevtools initialIsOpen={true} />
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  </>
);

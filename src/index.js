import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";
import App from "./App";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Suspense fallback={<div>로딩 중~~~~</div>}>
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

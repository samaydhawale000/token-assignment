import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from './wallet.js';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);

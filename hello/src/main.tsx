import  { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persist, store } from "./redux/store.ts";
const App = lazy(()=>import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
    <BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* 
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID} >
        */}
      <Provider store={store}>
        <PersistGate persistor={persist}>
            <App />
        </PersistGate>
         <SocketProvider></SocketProvider>
      </Provider>
      {/*
        </GoogleOAuthProvider>
        */}
    </BrowserRouter>
    </Suspense>
  </StrictMode>
);

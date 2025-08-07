import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import {GoogleOAuthProvider} from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { persist, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID} >
          <Provider store={store}>
            <PersistGate persistor={persist}>
             <App />
            </PersistGate>
          </Provider> 
        </GoogleOAuthProvider>
     </BrowserRouter>
  </StrictMode>,
)

{/* <BrowserRouter>
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID}>
    <Toaster position="top-center" reverseOrder={false} />
       <Provider store={store}> 
         <SocketProvider>
           <PersistGate persistor={persist}>
             <HeroUIProvider>
                 <App/>                   
             </HeroUIProvider>
           </PersistGate>
         </SocketProvider>
       </Provider>
</GoogleOAuthProvider>
</BrowserRouter> */}
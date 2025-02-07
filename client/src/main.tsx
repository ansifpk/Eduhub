import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {  persist, store } from './redux/store.ts'
import {Toaster} from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'
import {GoogleOAuthProvider} from '@react-oauth/google';
import {HeroUIProvider} from '@heroui/react'
import { SocketProvider } from './context/socketContext.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  // </StrictMode>,
)

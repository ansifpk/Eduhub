import { StrictMode } from 'react'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <GoogleOAuthProvider clientId="40855809641-qlka8kc3qhg0kdu19ag1k0uoomnf5r55.apps.googleusercontent.com">
    <Toaster position="top-center" reverseOrder={false} />
            <Provider store={store}>
              <PersistGate persistor={persist}>
                   <App/>                   
              </PersistGate>
            </Provider>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY as string);      
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string; 
        
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
        </I18nextProvider>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>,
)
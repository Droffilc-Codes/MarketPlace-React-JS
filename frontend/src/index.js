import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import BagProvider from './Hook/useBag/useBag';
import './axiosConfig'
import { AuthProvider } from './Hook/useAuth';
import { Toaster } from 'react-hot-toast';
import { LoadingProvider } from './Hook/useLoading';
import './Components/Interceptors/AuthInterceptor'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
          <AuthProvider>
            <BagProvider>
            <App />
            <Toaster  // KEep your eyes on it
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
            />
            </BagProvider>
          </AuthProvider>
        </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

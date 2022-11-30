import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App'

ReactDOM.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="your_client_id">
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

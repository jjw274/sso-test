import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
  <Auth0Provider
   domain="dev--73-2m5o.us.auth0.com"
   clientId="z8IuF0a9xHXGaI7eTv3worG0G4IQrVzp"
   redirectUri={window.location.origin}
 >
    <App />
</Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

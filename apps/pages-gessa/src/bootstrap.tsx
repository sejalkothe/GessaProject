import { StrictMode } from 'react';
import './main.css';
import { createRoot } from 'react-dom/client';
import App from './app/app';
import KeycloakLogin from './app/keycloakLogin';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
 
    <KeycloakLogin>
      <App />
    </KeycloakLogin>
 
);

import { StrictMode } from 'react';
import './main.css';
import App from './app/app';
import * as ReactDOM from 'react-dom';
import { environment } from './environments/environment';

ReactDOM.render(
  <div>
    <App />
  </div>,

  document.getElementById('root')
);

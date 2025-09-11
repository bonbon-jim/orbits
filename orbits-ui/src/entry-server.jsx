import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export function render(url) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { ServiceProvider } from './contexts/ServiceContext';
import './index.css';
import router from './router';

localStorage.clear();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ServiceProvider>
      <RouterProvider router={router}/>
    </ServiceProvider>
  </React.StrictMode>
);

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { StrictMode } from 'react';
import './index.css';

import router from './router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

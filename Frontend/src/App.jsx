import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './app.routes.jsx';
import './App.css';

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;

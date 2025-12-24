import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './App.css';

/**
 * App - Main application component
 * Provides the router to the entire application
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;

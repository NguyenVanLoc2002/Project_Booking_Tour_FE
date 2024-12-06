// import './css/main.css';

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const rootElement = document.getElementById('root');

// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(<App />);
// } else {
//   console.error('Root element not found');
// } 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import App component
import './css/main.css'; // Import CSS

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Router> {/* Bao quanh App bằng Router */}
      <App />
    </Router>
  );
} else {
  console.error('Root element not found');
}

// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router, Routes } from 'react-router-dom'
import Routers from './routers/Routers';
// App.jsx
import { LoadingProvider } from "./contexts/LoadingContext";
import { createBrowserHistory } from 'history';
import { Suspense } from 'react';

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <LoadingProvider>
          <Routers />
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

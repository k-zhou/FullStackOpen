import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!);

const renderApp = () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

renderApp();


import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { Provider } from "react-redux";
import './index.css'
import App from './App.tsx'
import store from "./lib/store.ts";

const root = ReactDOM.createRoot(document.getElementById('root')!);

const renderApp = () => {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
}

renderApp();
store.subscribe(renderApp);

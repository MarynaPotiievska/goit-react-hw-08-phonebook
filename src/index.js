import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@mui/material/styles';
import { App } from 'components/App';
import { persistor, store } from 'redux/store';
import theme from 'theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >      
      <BrowserRouter >
        <PersistGate loading={null} persistor={persistor} >
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PersistGate>
      </BrowserRouter>      
    </Provider>
  </React.StrictMode>
);
//  basename="/goit-react-hw-08-phonebook"
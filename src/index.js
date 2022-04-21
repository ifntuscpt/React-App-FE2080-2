import React from 'react';
import MouseParticles from 'react-mouse-particles'
import ReactDOM from 'react-dom';
import './assets/style/index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakraTheme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
        <ToastContainer />
        <MouseParticles
          g={2}
          color="random"
          cull="MuiSvgIcon-root,MuiButton-root"
          level={7}
        />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

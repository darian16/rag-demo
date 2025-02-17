import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import 'assets/scss/custom.css';
import 'assets/scss/messages.css';
import 'assets/scss/chatbot.css';
import 'assets/scss/error_pages.css';
import config from './config';

import "locales/i18n"

import SecurityService from "./services/SecurityService";
// ==============================|| REACT DOM RENDER  ||============================== //

// Run App...
SecurityService.protectByAcl(() => {
  const container = document.getElementById('root');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <Provider store={store}>
      <BrowserRouter basename={config.basename}>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const updateHandler = () => {
    setTimeout(() => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });

      window.caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            return window.caches.delete(key);
          })
        );
      });

      console.log('Updating content...');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 100);
  };
    
  serviceWorker.register({
    onUpdate: updateHandler,
  });
});

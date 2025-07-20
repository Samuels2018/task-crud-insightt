import {  RouterProvider, createBrowserRouter as Router} from 'react-router-dom';
import {router} from './routes/routes.tsx';
import { Auth0Provider } from "@auth0/auth0-react";
import type { AppState } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const appRouter = Router(router);


const onRedirectCallback = (appState?: AppState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

function App() {

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <RouterProvider router={appRouter} />
    </Auth0Provider>
  )
}

export default App

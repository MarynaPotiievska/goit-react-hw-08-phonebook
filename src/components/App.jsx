import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import { PrivateRoute, RestrictedRoute } from './RestrictedAndPrivatRoutes';

const Home = lazy(() => import('pages/Home'));
const LogIn = lazy(() => import('pages/LogIn'));
const Register = lazy(() => import('pages/Register'));
const Contacts = lazy(() => import('pages/Contacts'));

const SharedLayout = lazy(() => import('components/SharedLayout'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={<LogIn />} redirectTo="/contacts" />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                component={<Register />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<Contacts />} redirectTo="/login" />
            }
          />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

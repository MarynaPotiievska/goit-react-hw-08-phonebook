import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Outlet } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivatRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';
import Loader from 'components/Loader/Loader';
import SharedLayout from './SharedLayout';
const Home = lazy(() => import('pages/Home'));
const LogIn = lazy(() => import('pages/LogIn'));
const Register = lazy(() => import('pages/Register'));
const Contacts = lazy(() => import('pages/Contacts'));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <SharedLayout />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            index
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Home />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<LogIn />} />
            }
          />
          <Route
            path="*"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Home />} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />
        </Routes>
        <Outlet />
      </Suspense>
    </>
  );
};
export default App;

// import { Routes, Route, Outlet } from 'react-router-dom';
// import { lazy, Suspense } from 'react';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';

// import { RestrictedRoute } from './RestrictedRoute';
// import { PrivateRoute } from './PrivatRoute';
// import { refreshUser } from 'redux/auth/operations';
// import { useAuth } from 'hooks';
// import SharedLayout from './SharedLayout';
// import Loader from './Loader';

// const Home = lazy(() => import('pages/Home'));
// const LogIn = lazy(() => import('pages/LogIn'));
// const Register = lazy(() => import('pages/Register'));
// const Contacts = lazy(() => import('pages/Contacts'));

// export const App = () => {
//   const dispatch = useDispatch();
//   const { isRefreshing } = useAuth();

//   // useEffect(() => {
//   //   dispatch(refreshUser());
//   // }, [dispatch]);

//   return isRefreshing ? (
//     <b>Refreshing user...</b>
//   ) : (
//     <>
//       <SharedLayout />
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           <Route index element={<RestrictedRoute component={<Home />} />} />
//           <Route
//             path="/login"
//             element={
//               <RestrictedRoute component={<LogIn />} redirectTo="/contacts" />
//             }
//           />
//           <Route
//             path="/register"
//             element={
//               <RestrictedRoute
//                 component={<Register />}
//                 redirectTo="/contacts"
//               />
//             }
//           />
//           <Route
//             path="/contacts"
//             element={
//               <PrivateRoute component={<Contacts />} redirectTo="/login" />
//             }
//           />
//           <Route path="*" element={<Home />} />
//         </Routes>
//         <Outlet />
//       </Suspense>
//     </>
//   );
// };

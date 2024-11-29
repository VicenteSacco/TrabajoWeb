import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useAuthStore from '../store/authStore';

interface PrivateRouteProps extends RouteProps {
  role?: 'admin' | 'user';
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, role, ...rest }) => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Route
      {...rest}
      render={props => {
        // Si no está autenticado, redirigir al login
        if (!isAuthenticated) {
          return <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />;
        }

        // Si se requiere un rol específico y el usuario no lo tiene
        if (role && user?.role !== role) {
          console.log('Role required:', role);
          console.log('User role:', user?.role);
          return <Redirect to={{
            pathname: '/unauthorized',
            state: { from: props.location }
          }} />;
        }

        // Si todo está bien, renderizar el componente
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
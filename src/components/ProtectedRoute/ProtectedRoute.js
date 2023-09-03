import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const token = localStorage.getItem('token');
  return (props.isLoggedIn || token) ? (
    <Component {...props} />
  ) : (
    <Navigate to='/' replace />
  );
};

export default ProtectedRoute;

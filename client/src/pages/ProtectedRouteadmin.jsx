import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const adminLoggedIn = localStorage.getItem('adminLoggedIn');
  if (!adminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

export default ProtectedRoute;

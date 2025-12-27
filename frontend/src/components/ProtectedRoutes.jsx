import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PrivateRoute = ({ role, children, user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: 'protected' }} />;
  }

  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;

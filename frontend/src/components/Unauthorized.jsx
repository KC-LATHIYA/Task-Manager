import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authSlice.user);

  const handleGoBack = () => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else if (user?.role === 'user') {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-lg">
        <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-6" />

        <h1 className="text-6xl font-black text-slate-900 mb-2">403</h1>
        <h2 className="text-3xl font-bold text-slate-800">Access Denied</h2>

        <p className="text-slate-500 mt-4 mb-8 text-lg">
          You do not have the required permissions to view this page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all font-medium flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {user ? "Back to Dashboard" : "Back to Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
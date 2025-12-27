import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLoginuserMutation } from '../services/authAPI';
import { useSelector } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const user = useSelector((state) => state.authSlice.user);

  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginuserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await loginUser(formData).unwrap();
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Invalid email or password');
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex bg-white">

      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800 opacity-90 z-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-20 text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            "TaskFlow has completely transformed how our engineering team tracks sprints. It's simply the best tool out there."
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-medium">Project Tracking</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-medium">Team Analytics</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Sign in to account</h1>
            <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard</p>
          </div>

          {errorMsg && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-sm text-blue-600 font-semibold hover:text-blue-700">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 
                ${isLoading ? 'opacity-70 cursor-not-allowed hover:transform-none' : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500">
              Don't have an account? {' '}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
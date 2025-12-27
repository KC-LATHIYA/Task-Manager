import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useRegisteruserMutation } from '../services/authAPI';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisteruserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    try {
      const result = await registerUser(formData).unwrap();
      navigate('/login');
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Get Started Free</h1>
            <p className="text-slate-500 mt-2">No credit card required. Start managing tasks in minutes.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm animate-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

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
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Create a password (min. 6 chars)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" required className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
              <label className="text-sm text-slate-500">I agree to the Terms & Privacy Policy</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2
              ${isLoading ? 'opacity-70 cursor-not-allowed hover:transform-none' : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500">
              Already have an account? {' '}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-100 z-10"></div>
      
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

        <div className="relative z-20 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join the Community</h2>
          <p className="text-slate-400 mb-8 max-w-sm mx-auto">Connect with 10,000+ developers and project managers building the future.</p>

          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-2xl max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="flex gap-4 mb-4">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-3">
              <div className="h-2 bg-slate-700 rounded w-3/4"></div>
              <div className="h-2 bg-slate-700 rounded w-1/2"></div>
              <div className="h-2 bg-slate-700 rounded w-full"></div>
              <div className="flex gap-2 mt-4">
                <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                <div className="h-8 w-24 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
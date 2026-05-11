import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success('Welcome back! 👋');
      navigate('/products');
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-[#0a0a0a]">

      <div className="flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-sm">

          <Link to="/" className="inline-flex items-center gap-2 mb-10 group">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg">
              Weero<span className="text-violet-600">Hub</span>
            </span>
          </Link>

          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 bg-violet-50 dark:bg-violet-900/20 px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
              Sign In
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Your E-mail
              </label>
              <div className="relative">
                <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-slate-50 dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all
                    ${errors.email
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                      : 'border-slate-200 dark:border-[#2a2a2a] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
                    }`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-500">⚠ {errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm bg-slate-50 dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all
                    ${errors.password
                      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                      : 'border-slate-200 dark:border-[#2a2a2a] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-500">⚠ {errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Continue
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Have an account?{' '}
            <Link to="/register" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>

      <div className="hidden lg:flex bg-slate-50 dark:bg-[#111] border-l border-slate-100 dark:border-[#1e1e1e] items-center justify-center p-12 relative overflow-hidden">

        <div className="absolute top-8 right-8 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-8 left-8 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl" />

        <div className="relative w-full max-w-sm">

          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-[#2a2a2a] shadow-xl p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Products Overview</p>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-[#2a2a2a] px-2 py-1 rounded-lg">This month</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Total', value: '24', color: 'text-violet-600' },
                { label: 'Active', value: '18', color: 'text-emerald-600' },
                { label: 'Draft', value: '6', color: 'text-amber-500' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-50 dark:bg-[#222] rounded-xl p-3 text-center">
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Wireless Headphones', price: '$49.99', color: 'bg-violet-500' },
                { name: 'Smart Watch', price: '$129.00', color: 'bg-emerald-500' },
                { name: 'Laptop Stand', price: '$34.50', color: 'bg-amber-500' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                  <span className="text-xs text-slate-600 dark:text-slate-400 flex-1">{item.name}</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-violet-600 rounded-2xl p-5 text-white">
            <p className="font-bold text-base mb-1">WeeroHub — 100% Free</p>
            <p className="text-violet-200 text-xs leading-relaxed">
              Full-stack product manager with JWT auth, search, filter, and pagination.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['CRUD API', 'JWT Auth', 'Docker'].map((tag) => (
                <span key={tag} className="text-[10px] font-semibold bg-white/15 px-2.5 py-1 rounded-full border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;
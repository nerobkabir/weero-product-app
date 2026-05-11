import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff, FiBox, FiArrowRight, FiShield, FiZap, FiSearch } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

// ── Feature list for the decorative left panel ────────────────────────────────
const FEATURES = [
  { icon: FiShield, label: 'JWT Authentication' },
  { icon: FiZap,    label: 'Fast REST API' },
  { icon: FiSearch, label: 'Search & Filter' },
  { icon: FiBox,    label: 'Full CRUD Operations' },
];

// ── LoginPage ─────────────────────────────────────────────────────────────────
const LoginPage = () => {
  const [form, setForm]               = useState({ email: '', password: '' });
  const [errors, setErrors]           = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // ── Client-side validation ──────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.email.trim())              errs.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password)                  errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // Clear error on input change
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  // ── Handle form submit → call auth context login ────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success('Welcome back! 👋');
      navigate('/products');
    } else {
      toast.error(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ══════════════════════════════════════════════════
          LEFT PANEL — Decorative (hidden on mobile)
      ══════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12 bg-[#0a0a0a]">

        {/* Subtle grid pattern */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/40">
            <FiBox className="text-white" size={20} />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Weero<span className="text-brand-400">Hub</span>
          </span>
        </div>

        {/* Center copy */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Full Stack MERN App
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Manage products
            <br />
            <span className="text-brand-400">beautifully.</span>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            A complete product dashboard with authentication,
            search, pagination, and more.
          </p>

          {/* Feature chips */}
          <div className="flex flex-col gap-2.5">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-brand-500/15 border border-brand-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-brand-400" />
                </div>
                <span className="text-white/60 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-white/25 text-xs">
          © 2026 WeeroHub. All rights reserved.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════
          RIGHT PANEL — Login Form
      ══════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-black">
        <div className="w-full max-w-sm animate-slide-up">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <FiBox className="text-white" size={16} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg">
              Weero<span className="text-brand-500">Hub</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 dark:text-[#666] mt-1.5 text-sm">
              Sign in to manage your products
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

            {/* Email field */}
            <div>
              <label className="input-label">Email address</label>
              <div className="relative">
                <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#555]" />
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="you@example.com"
                  autoComplete="email"
                  className={`input-field !pl-10 ${errors.email ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">⚠ {errors.email}</p>
              )}
            </div>

            {/* Password field with show/hide toggle */}
            <div>
              <label className="input-label">Password</label>
              <div className="relative">
                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#555]" />
                <input
                  type={showPassword ? 'text' : 'password'} name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••" autoComplete="current-password"
                  className={`input-field !pl-10 !pr-11 ${errors.password ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400' : ''}`}
                />
                <button
                  type="button" onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#555] hover:text-slate-700 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">⚠ {errors.password}</p>
              )}
            </div>

            {/* Submit button — shows loading spinner during API call */}
            <button
              type="submit" disabled={loading}
              className="btn-primary w-full justify-center mt-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <FiArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200 dark:bg-[#1e1e1e]" />
            <span className="text-xs text-slate-400 dark:text-[#444]">or</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-[#1e1e1e]" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-slate-500 dark:text-[#666]">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff,
  FiBox, FiArrowRight, FiCheck,
} from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

// ── Reusable input field component (defined OUTSIDE to prevent re-mount bug) ──
const InputField = ({
  icon: Icon, label, name, type, placeholder,
  rightEl, autoComplete, value, onChange, error,
}) => (
  <div>
    <label className="input-label">{label}</label>
    <div className="relative">
      <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#555]" />
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} autoComplete={autoComplete}
        className={`input-field !pl-10 ${rightEl ? '!pr-11' : ''} ${error ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400' : ''}`}
      />
      {/* Show/hide password toggle */}
      {rightEl && (
        <button
          type="button" onClick={rightEl.toggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#555] hover:text-slate-700 dark:hover:text-white transition-colors"
        >
          {rightEl.show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
        </button>
      )}
    </div>
    {error && <p className="mt-1.5 text-xs text-red-500">⚠ {error}</p>}
  </div>
);

// ── Left panel feature list ───────────────────────────────────────────────────
const FEATURES = [
  'Full CRUD product management',
  'JWT-secured private routes',
  'Search, filter & paginate',
  'Responsive on all devices',
  'Dark & light mode support',
];

// ── RegisterPage ──────────────────────────────────────────────────────────────
const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors]     = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  // ── Client-side validation ──────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.name.trim())                errs.name    = 'Name is required';
    else if (form.name.trim().length < 2) errs.name    = 'Name must be at least 2 characters';
    if (!form.email.trim())               errs.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password)                   errs.password = 'Password is required';
    else if (form.password.length < 6)    errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword)            errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // Clear individual field error on change
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  // ── Handle form submit → call auth context register ─────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await register(form.name.trim(), form.email.trim(), form.password);
    if (result.success) {
      toast.success('Account created successfully! 🎉');
      navigate('/products');
    } else {
      toast.error(result.message || 'Registration failed. Please try again.');
    }
  };

  // ── Password strength calculator ────────────────────────────────────────────
  const getStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6)          score++;
    if (p.length >= 10)         score++;
    if (/[A-Z]/.test(p))       score++;
    if (/[0-9]/.test(p))       score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength      = getStrength();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
  const strengthColor = [
    '', 'bg-red-400', 'bg-orange-400',
    'bg-yellow-400', 'bg-emerald-400', 'bg-emerald-500',
  ][strength];

  return (
    <div className="min-h-screen flex">

      {/* ══════════════════════════════════════════════════
          LEFT PANEL — Decorative (hidden on mobile)
      ══════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-slate-950 to-[#0d0d1a]">

        {/* Grid pattern */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff06 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-violet-500/8 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
            <FiBox className="text-white" size={20} />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Weero<span className="text-brand-400">Hub</span>
          </span>
        </div>

        {/* Center copy */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/50 font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            Join WeeroHub today
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Start managing
            <br />
            <span className="text-brand-400">your products.</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Create a free account and get instant access
            to the full product management dashboard.
          </p>

          {/* Feature checklist */}
          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-brand-500/20 border border-brand-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiCheck size={10} className="text-brand-400" />
                </div>
                <span className="text-white/50 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-white/20 text-xs">© 2026 WeeroHub. All rights reserved.</p>
      </div>

      {/* ══════════════════════════════════════════════════
          RIGHT PANEL — Register Form
      ══════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-black overflow-y-auto">
        <div className="w-full max-w-sm animate-slide-up py-8">

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
              Create your account
            </h2>
            <p className="text-slate-500 dark:text-[#666] mt-1.5 text-sm">
              Free forever. No credit card required.
            </p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

            <InputField
              icon={FiUser} label="Full Name" name="name"
              type="text" placeholder="Kabir Hossain"
              autoComplete="name" value={form.name}
              onChange={handleChange} error={errors.name}
            />

            <InputField
              icon={FiMail} label="Email address" name="email"
              type="email" placeholder="you@example.com"
              autoComplete="email" value={form.email}
              onChange={handleChange} error={errors.email}
            />

            {/* Password with strength indicator */}
            <div>
              <InputField
                icon={FiLock} label="Password" name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                autoComplete="new-password" value={form.password}
                onChange={handleChange} error={errors.password}
                rightEl={{ show: showPass, toggle: () => setShowPass((p) => !p) }}
              />
              {/* Strength bar — shows as user types */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300
                          ${i <= strength ? strengthColor : 'bg-slate-200 dark:bg-[#222]'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-[#555]">
                    Strength:{' '}
                    <span className="font-semibold text-slate-600 dark:text-[#888]">
                      {strengthLabel}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <InputField
              icon={FiLock} label="Confirm Password" name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat your password"
              autoComplete="new-password" value={form.confirmPassword}
              onChange={handleChange} error={errors.confirmPassword}
              rightEl={{ show: showConfirm, toggle: () => setShowConfirm((p) => !p) }}
            />

            {/* Submit button — loading state during API call */}
            <button
              type="submit" disabled={loading}
              className="btn-primary w-full justify-center mt-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
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

          {/* Login link */}
          <p className="text-center text-sm text-slate-500 dark:text-[#666]">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
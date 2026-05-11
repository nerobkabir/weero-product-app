import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
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
    const result = await register(form.name.trim(), form.email.trim(), form.password);
    if (result.success) {
      toast.success('Account created successfully! 🎉');
      navigate('/products');
    } else {
      toast.error(result.message || 'Registration failed');
    }
  };

  const getStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
  const strengthColor = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-400', 'bg-emerald-500'][strength];

  const InputField = ({ icon: Icon, label, name, type, placeholder, autoComplete, rightEl }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full pl-10 pr-${rightEl ? '11' : '4'} py-3 rounded-xl border text-sm bg-slate-50 dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all
            ${errors[name]
              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-slate-200 dark:border-[#2a2a2a] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
            }`}
        />
        {rightEl && (
          <button
            type="button"
            onClick={rightEl.toggle}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {rightEl.show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </button>
        )}
      </div>
      {errors[name] && <p className="mt-1.5 text-xs text-red-500">⚠ {errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-[#0a0a0a]">

      {/* Left Panel */}
      <div className="flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
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
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
              Create Account
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Sign Up
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Free forever. No credit card needed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <InputField
              icon={FiUser}
              label="Your Name"
              name="name"
              type="text"
              placeholder="Kabir Hossain"
              autoComplete="name"
            />

            <InputField
              icon={FiMail}
              label="Your E-mail"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />

            <div>
              <InputField
                icon={FiLock}
                label="Password"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                rightEl={{ show: showPass, toggle: () => setShowPass((p) => !p) }}
              />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-slate-200 dark:bg-[#2a2a2a]'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Strength: <span className="font-medium">{strengthLabel}</span>
                  </p>
                </div>
              )}
            </div>

            <InputField
              icon={FiLock}
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat your password"
              autoComplete="new-password"
              rightEl={{ show: showConfirm, toggle: () => setShowConfirm((p) => !p) }}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-sm transition-all shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
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
            <Link to="/login" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">
              Log in
            </Link>
          </p>

        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex bg-slate-50 dark:bg-[#111] border-l border-slate-100 dark:border-[#1e1e1e] items-center justify-center p-12 relative overflow-hidden order-1 lg:order-2">

        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-violet-600/5 rounded-full blur-3xl" />

        <div className="relative w-full max-w-sm">

          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-[#2a2a2a] shadow-xl p-6 mb-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
              What you get
            </p>
            <div className="space-y-3">
              {[
                'Full CRUD product management',
                'JWT-secured private routes',
                'Real-time search & price filter',
                'Server-side pagination',
                'Dark & light mode',
                'Responsive on all devices',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiCheck size={11} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-5 text-white">
            <p className="font-bold text-base mb-1">WeeroHub — 100% Free</p>
            <p className="text-violet-200 text-xs leading-relaxed">
              Built with React, Node.js, Express, and MongoDB Atlas.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['CRUD API', 'JWT Auth', 'Docker', 'Deployed'].map((tag) => (
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

export default RegisterPage;
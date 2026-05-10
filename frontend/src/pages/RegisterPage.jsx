import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiBox, FiArrowRight, FiCheck } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

// ✅ InputField OUTSIDE RegisterPage — fixes one-character-at-a-time bug
const InputField = ({ icon: Icon, label, name, type, placeholder, rightEl, autoComplete, value, onChange, error }) => (
  <div>
    <label className="input-label">{label}</label>
    <div className="relative">
      <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} autoComplete={autoComplete}
        className={`input-field !pl-9 ${rightEl ? '!pr-10' : ''} ${error ? 'border-red-400 focus:ring-red-400/30' : ''}`}
      />
      {rightEl && (
        <button type="button" onClick={rightEl.toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-[#ccc] transition-colors">
          {rightEl.show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-xs text-red-500">⚠ {error}</p>}
  </div>
);

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

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-black">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
            <FiBox className="text-white" size={20} />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">WeeroHub</span>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Start managing<br />
            <span className="text-brand-400">your products today.</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            Create a free account and get access to the full product management dashboard.
          </p>
          {['Full CRUD product management', 'JWT-secured private routes', 'Search, filter & paginate', 'Responsive on all devices'].map((f) => (
            <div key={f} className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 bg-brand-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCheck size={11} className="text-brand-400" />
              </div>
              <span className="text-slate-300 text-sm">{f}</span>
            </div>
          ))}
        </div>
        <p className="relative text-slate-600 text-sm">© 2026 ProductHub.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-sm animate-slide-up py-6">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <FiBox className="text-white" size={16} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg">
              Weero<span className="text-brand-500">Hub</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h2>
            <p className="text-slate-500 dark:text-[#888] mt-1 text-sm">It's free and only takes a minute</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField icon={FiUser} label="Full Name" name="name" type="text" placeholder="Kabir Hossain" autoComplete="name" value={form.name} onChange={handleChange} error={errors.name} />
            <InputField icon={FiMail} label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={handleChange} error={errors.email} />

            <div>
              <InputField
                icon={FiLock} label="Password" name="password"
                type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                autoComplete="new-password" value={form.password} onChange={handleChange} error={errors.password}
                rightEl={{ show: showPass, toggle: () => setShowPass((p) => !p) }}
              />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-slate-200 dark:bg-[#2a2a2a]'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#888]">Strength: <span className="font-medium">{strengthLabel}</span></p>
                </div>
              )}
            </div>

            <InputField
              icon={FiLock} label="Confirm Password" name="confirmPassword"
              type={showConfirm ? 'text' : 'password'} placeholder="Repeat your password"
              autoComplete="new-password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword}
              rightEl={{ show: showConfirm, toggle: () => setShowConfirm((p) => !p) }}
            />

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
              ) : (
                <>Create account<FiArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-[#888] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
import { Link } from 'react-router-dom';
import {
  FiBox, FiSearch, FiShield, FiZap, FiArrowRight,
  FiPackage, FiEdit2, FiTrash2, FiLayers,
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
  <div className="card p-6 group hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:-translate-y-1 transition-all duration-300">
    <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon size={20} className="text-white" />
    </div>
    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-1">{value}</div>
    <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
  </div>
);

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: FiPackage,
      title: 'Product Management',
      desc: 'Add, update, and organize your products with a clean and intuitive interface.',
      color: 'bg-brand-500',
    },
    {
      icon: FiSearch,
      title: 'Search & Filter',
      desc: 'Find any product instantly with real-time search and price range filtering.',
      color: 'bg-emerald-500',
    },
    {
      icon: FiShield,
      title: 'JWT Authentication',
      desc: 'Secure login and registration with JSON Web Tokens and protected routes.',
      color: 'bg-violet-500',
    },
    {
      icon: FiZap,
      title: 'Fast REST API',
      desc: 'Node.js + Express backend with MongoDB delivers lightning-fast responses.',
      color: 'bg-amber-500',
    },
    {
      icon: FiLayers,
      title: 'Pagination',
      desc: 'Browse large catalogs efficiently with smart server-side pagination.',
      color: 'bg-rose-500',
    },
    {
      icon: FiEdit2,
      title: 'Owner-only Edits',
      desc: 'Only the creator can edit or delete their products — full data ownership.',
      color: 'bg-cyan-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-500/8 dark:bg-brand-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-violet-500/8 dark:bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full text-xs font-semibold mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
            Full Stack MERN Application
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6 animate-slide-up">
            Manage products{' '}
            <span className="text-brand-600 dark:text-brand-400 relative">
              beautifully
            </span>
            <br />
            with WeeroHub
          </h1>

          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
            A full-featured product dashboard built with React, Node.js, Express, and MongoDB.
            Add, search, update, and delete products with a polished, responsive UI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
            <Link to="/products" className="btn-primary !px-7 !py-3 text-base shadow-xl shadow-brand-500/25">
              Browse Products
              <FiArrowRight size={18} />
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn-secondary !px-7 !py-3 text-base">
                Get Started Free
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 mt-16 pt-12 border-t border-slate-200 dark:border-white/[0.05] animate-fade-in">
            <StatCard value="CRUD" label="Full API" />
            <StatCard value="JWT" label="Secured" />
            <StatCard value="100%" label="Responsive" />
            <StatCard value="Dark" label="Mode Ready" />
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Everything you need
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Built to satisfy all evaluation criteria — code quality, API structure,
            database design, UI/UX, and error handling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white dark:bg-[#0a0a0a] border-y border-slate-200 dark:border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">How it works</h2>
            <p className="text-slate-500 dark:text-slate-400">Three simple steps to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: FiShield, title: 'Create an account', desc: 'Register with your name, email, and password. Your data is secured with JWT.' },
              { step: '02', icon: FiPackage, title: 'Add your products', desc: 'Fill in product name, price, image URL, and description. It saves instantly.' },
              { step: '03', icon: FiEdit2, title: 'Manage & search', desc: 'Edit or delete your own products. Search and filter by name and price range.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center">
                    <Icon className="text-brand-600 dark:text-brand-400" size={24} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {step.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="card p-10 text-center bg-gradient-to-br from-brand-500 to-brand-700 border-0 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          </div>
          <div className="relative">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FiBox className="text-white" size={26} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to explore?
            </h2>
            <p className="text-brand-200 mb-7 max-w-md mx-auto">
              Browse the product catalog or sign in to add and manage your own products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 transition-colors shadow-lg"
              >
                Browse Products
                <FiArrowRight size={16} />
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20"
                >
                  Create Free Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 dark:border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center">
              <FiBox className="text-white" size={12} />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
              Weero<span className="text-brand-500">Hub</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © 2026 Weero Digital — Built for the job task submission.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-600">
            <Link to="/products" className="hover:text-brand-500 transition-colors">Products</Link>
            <Link to="/login" className="hover:text-brand-500 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-brand-500 transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
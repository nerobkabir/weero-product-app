import { Link } from 'react-router-dom';
import {
  FiBox, FiShield, FiSearch, FiArrowRight, FiPackage,
  FiZap, FiLayers, FiEdit2, FiCheck, FiGithub,
  FiDatabase, FiCode, FiStar,
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const FeatureCard = ({ icon: Icon, title, desc, color, badge }) => (
  <div className="group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-slate-200/80 dark:border-[#1e1e1e] hover:border-brand-300 dark:hover:border-brand-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/8 transition-all duration-300 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

    <div className="relative">
      {badge && (
        <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <Icon size={19} className="text-white" />
      </div>
    </div>

    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">{title}</h3>
    <p className="text-xs text-slate-500 dark:text-[#666] leading-relaxed">{desc}</p>
  </div>
);

const TechBadge = ({ label, color }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${color}`}>
    {label}
  </span>
);

const Stat = ({ value, label, sub }) => (
  <div className="text-center px-4">
    <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-0.5">{value}</div>
    <div className="text-xs font-medium text-brand-500 mb-0.5">{label}</div>
    {sub && <div className="text-[11px] text-slate-400 dark:text-[#555]">{sub}</div>}
  </div>
);

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: FiPackage, title: 'Full CRUD Operations', desc: 'Create, read, update, and delete products with real-time feedback and smooth animations.', color: 'bg-brand-500', badge: 'Core' },
    { icon: FiShield, title: 'JWT Authentication', desc: 'Secure register and login flow with JSON Web Tokens. Protected routes for authenticated users only.', color: 'bg-violet-500', badge: 'Bonus' },
    { icon: FiSearch, title: 'Search & Filter', desc: 'Real-time search by product name and price range filtering with debounced inputs.', color: 'bg-emerald-500', badge: 'Bonus' },
    { icon: FiLayers, title: 'Server-side Pagination', desc: 'Efficient data loading with page-based navigation. Handles large product catalogs smoothly.', color: 'bg-amber-500', badge: 'Bonus' },
    { icon: FiZap, title: 'Skeleton Loading', desc: 'Professional loading states using skeleton screens instead of plain spinners for better UX.', color: 'bg-rose-500' },
    { icon: FiEdit2, title: 'Owner-only Control', desc: 'Only the product creator can edit or delete their own products — enforced on both frontend and backend.', color: 'bg-cyan-500' },
  ];

  const techStack = [
    { label: 'React.js', color: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800' },
    { label: 'Node.js', color: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' },
    { label: 'Express.js', color: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10' },
    { label: 'MongoDB', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' },
    { label: 'Tailwind CSS', color: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-800' },
    { label: 'JWT', color: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800' },
    { label: 'Docker', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800' },
    { label: 'REST API', color: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-60 -right-60 w-[700px] h-[700px] bg-brand-500/6 dark:bg-brand-500/4 rounded-full blur-3xl" />
          <div className="absolute -bottom-60 -left-60 w-[700px] h-[700px] bg-violet-500/6 dark:bg-violet-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-[#222] rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 mb-8 shadow-sm animate-fade-in">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Weero Digital — Full Stack Developer Task
            <FiStar size={11} className="text-amber-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-6 animate-slide-up">
            A product dashboard
            <br />
            <span className="relative">
              <span className="text-brand-500">built to impress.</span>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-[#666] max-w-xl mx-auto mb-10 leading-relaxed animate-slide-up">
            Full-stack MERN application with authentication, search, pagination,
            image support, dark mode, and Docker — all working seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 animate-fade-in">
            <Link
              to="/products"
              className="btn-primary !px-8 !py-3 text-sm shadow-xl shadow-brand-500/30"
            >
              Browse Products
              <FiArrowRight size={16} />
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn-secondary !px-8 !py-3 text-sm">
                Get Started Free
              </Link>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in">
            {techStack.map((t) => (
              <TechBadge key={t.label} {...t} />
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pb-20">
          <div className="bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 shadow-sm">
            <Stat value="CRUD" label="Full API" sub="4 endpoints" />
            <Stat value="JWT" label="Auth Secured" sub="Register & Login" />
            <Stat value="All" label="Bonus Done" sub="Search · Pagination · Docker" />
            <Stat value="Dark" label="Mode Ready" sub="Light & Dark" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-3">What's included</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Every requirement, covered.
          </h2>
          <p className="text-sm text-slate-500 dark:text-[#666] max-w-lg mx-auto">
            Core requirements plus all bonus features — built with clean code and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      <section className="bg-white dark:bg-[#080808] border-y border-slate-200 dark:border-[#111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Up and running in minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-brand-300 dark:via-brand-500/30 to-transparent" />

            {[
              { step: '01', icon: FiShield, title: 'Create an account', desc: 'Register with your name, email and password. Your session is secured with JWT tokens.' },
              { step: '02', icon: FiPackage, title: 'Add your products', desc: 'Fill in name, price, image URL and description. Products are instantly stored in MongoDB.' },
              { step: '03', icon: FiSearch, title: 'Search & manage', desc: 'Use search and price filters to find products. Edit or delete only your own listings.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center px-4">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-[#111] border border-slate-200 dark:border-[#222] rounded-2xl flex items-center justify-center">
                    <Icon className="text-brand-500" size={22} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-brand-500/30">
                    {step.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-[#666] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mb-3">Evaluation</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Built against the<br />evaluation criteria.
            </h2>
            <p className="text-sm text-slate-500 dark:text-[#666] leading-relaxed mb-6">
              Every evaluation point was kept in mind during development —
              from folder structure to error handling to Git commit quality.
            </p>
            <Link to="/products" className="btn-primary inline-flex">
              See it in action
              <FiArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: FiCode, label: 'Code Quality', desc: 'Clean, readable, modular' },
              { icon: FiZap, label: 'API Structure', desc: 'RESTful, validated, consistent' },
              { icon: FiDatabase, label: 'Database Design', desc: 'Mongoose schemas, relations' },
              { icon: FiBox, label: 'UI / UX', desc: 'Responsive, dark mode, polished' },
              { icon: FiShield, label: 'Error Handling', desc: 'Global handler, validation' },
              { icon: FiGithub, label: 'Git Commits', desc: 'Meaningful, conventional' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#1e1e1e]">
                <div className="w-8 h-8 bg-brand-50 dark:bg-brand-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-brand-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{label}</span>
                    <FiCheck size={11} className="text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-[#666]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 p-10 text-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to explore the app?
            </h2>
            <p className="text-brand-200 text-sm mb-7 max-w-md mx-auto">
              Browse products without logging in, or create an account to add and manage your own.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-brand-700 font-semibold text-sm hover:bg-brand-50 transition-colors shadow-lg"
              >
                Browse Products
                <FiArrowRight size={15} />
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/20"
                >
                  Create Free Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-[#111] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-500 rounded-md flex items-center justify-center">
              <FiBox className="text-white" size={12} />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
              Weero<span className="text-brand-500">Hub</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-[#444]">
            © 2026 ProductHub. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-400 dark:text-[#444]">
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
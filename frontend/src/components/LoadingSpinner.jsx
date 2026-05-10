const LoadingSpinner = ({ fullScreen = false, size = 'md', text = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizes[size]} rounded-full border-brand-200 border-t-brand-500 animate-spin dark:border-slate-700 dark:border-t-brand-400`}
      />
      {text && (
        <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
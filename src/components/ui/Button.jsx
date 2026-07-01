const variants = {
  primary: 'bg-violet-500 text-white hover:scale-[1.02] shadow-[0_0_0_1px_rgba(124,58,237,0.4),0_8px_20px_rgba(124,58,237,0.3)]',
  secondary: 'border border-white/[0.1] text-mist-100 hover:bg-white/[0.05]',
  ghost: 'text-mist-500 hover:text-mist-100 hover:bg-white/[0.04]',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
}

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

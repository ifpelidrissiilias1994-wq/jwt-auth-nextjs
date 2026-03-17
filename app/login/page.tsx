import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #0d9488 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            🍅 Tomates App
          </h1>
          <p className="text-emerald-300 text-sm">
            Sistema de autenticación con JWT
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}

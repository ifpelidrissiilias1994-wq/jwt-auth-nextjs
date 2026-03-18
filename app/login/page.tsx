import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #171219 0%, #1a2d35 50%, #225560 100%)',
      }}
    >
      {/* Radial glow overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #F0386B 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, #225560 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-white mb-2 tracking-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            <span style={{ color: '#FAF33E' }}>✦</span> Vault App
          </h1>
          <p className="text-sm" style={{ color: '#FF5376', fontFamily: 'var(--font-outfit)' }}>
            Sistema de autenticación con JWT
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}

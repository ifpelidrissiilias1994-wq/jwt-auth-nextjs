import { RegisterForm } from '@/components/register-form'

export default function RegisterPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #171219 0%, #1a2d35 50%, #225560 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 75% 25%, #FAF33E 0%, transparent 50%),
              radial-gradient(circle at 25% 75%, #225560 0%, transparent 50%)
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
            <span style={{ color: '#FAF33E' }}>&#10022;</span> Vault App
          </h1>
          <p className="text-sm" style={{ color: '#FF5376', fontFamily: 'var(--font-outfit)' }}>
            Crea tu cuenta nueva
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}

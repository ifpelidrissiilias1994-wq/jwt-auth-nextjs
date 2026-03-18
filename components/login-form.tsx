'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, LogIn, Loader2, AlertCircle } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión')
        return
      }

      localStorage.setItem('auth-token', data.token)
      localStorage.setItem('auth-user', JSON.stringify(data.user))
      router.push('/dashboard')
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      className="w-full shadow-2xl border-0"
      style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)' }}
    >
      <CardHeader className="space-y-2 pb-6">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-2 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #F0386B, #FF5376)' }}
        >
          <LogIn className="w-7 h-7 text-white" />
        </div>
        <CardTitle
          className="text-2xl font-bold text-center"
          style={{ color: '#171219', fontFamily: 'var(--font-outfit)' }}
        >
          Bienvenida
        </CardTitle>
        <CardDescription
          className="text-center text-sm"
          style={{ color: '#888', fontFamily: 'var(--font-outfit)' }}
        >
          Accede a tu panel privado
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium" style={{ color: '#171219' }}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="MariaCamila@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-11 border-gray-200 focus-visible:ring-0 focus-visible:border-[#F0386B] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium" style={{ color: '#171219' }}>
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-11 pr-10 border-gray-200 focus-visible:ring-0 focus-visible:border-[#F0386B] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#aaa' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div
              className="flex items-center gap-2 p-3 rounded-lg text-sm"
              style={{ background: '#fff0f3', border: '1px solid #FF5376', color: '#F0386B' }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 font-semibold shadow-md text-white transition-all duration-200 border-0"
            style={{ background: 'linear-gradient(135deg, #F0386B, #FF5376)' }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar sesión
              </>
            )}
          </Button>

          <div className="relative flex items-center my-2">
            <div className="flex-1 border-t" style={{ borderColor: '#e5e5e5' }} />
            <span className="px-3 text-xs" style={{ color: '#aaa' }}>o</span>
            <div className="flex-1 border-t" style={{ borderColor: '#e5e5e5' }} />
          </div>

          <a href="/register" className="block">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 font-semibold border-2 transition-all duration-200"
              style={{ borderColor: '#225560', color: '#225560' }}
            >
              Crear cuenta nueva
            </Button>
          </a>
        </form>

        <div
          className="mt-6 p-3 rounded-lg border"
          style={{ background: '#fffbe6', borderColor: '#FAF33E' }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: '#171219' }}>
            Credenciales de prueba:
          </p>
          <p className="text-xs" style={{ color: '#555' }}>📧 MariaCamila@gmail.com</p>
          <p className="text-xs" style={{ color: '#555' }}>🔑 1234</p>
        </div>
      </CardContent>
    </Card>
  )
}

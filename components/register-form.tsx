'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
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
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al registrarse')
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
          style={{ background: 'linear-gradient(135deg, #225560, #1a3d47)' }}
        >
          <UserPlus className="w-7 h-7 text-white" />
        </div>
        <CardTitle
          className="text-2xl font-bold text-center"
          style={{ color: '#171219', fontFamily: 'var(--font-outfit)' }}
        >
          Crear cuenta
        </CardTitle>
        <CardDescription
          className="text-center text-sm"
          style={{ color: '#888', fontFamily: 'var(--font-outfit)' }}
        >
          Regístrate para acceder al panel
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium" style={{ color: '#171219' }}>
              Nombre completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 border-gray-200 focus-visible:ring-0 focus-visible:border-[#225560] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium" style={{ color: '#171219' }}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-11 border-gray-200 focus-visible:ring-0 focus-visible:border-[#225560] transition-colors"
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
                placeholder="Min. 4 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={4}
                autoComplete="new-password"
                className="h-11 pr-10 border-gray-200 focus-visible:ring-0 focus-visible:border-[#225560] transition-colors"
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
            style={{ background: 'linear-gradient(135deg, #225560, #1a3d47)' }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registrando...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Crear cuenta
              </>
            )}
          </Button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-xs" style={{ color: '#888' }}>
            ¿Ya tienes cuenta?{' '}
            <a
              href="/login"
              className="font-semibold underline transition-colors"
              style={{ color: '#F0386B' }}
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

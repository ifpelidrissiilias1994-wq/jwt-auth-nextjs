'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'

export function Navbar() {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/logout', { method: 'POST' })
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
    router.push('/login')
  }

  return (
    <nav
      className="sticky top-0 z-10 border-b"
      style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderColor: '#eee' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #F0386B, #FF5376)' }}
          >
            <span className="text-white text-sm font-bold">V</span>
          </div>
          <span className="font-bold" style={{ color: '#171219' }}>Vault App</span>
          <Badge
            className="text-xs border"
            style={{ background: '#fffbe6', color: '#171219', borderColor: '#FAF33E' }}
          >
            Zona Privada
          </Badge>
        </div>
        <Button
          onClick={handleLogout}
          disabled={loggingOut}
          variant="outline"
          size="sm"
          className="border transition-colors"
          style={{ borderColor: '#FF5376', color: '#F0386B' }}
        >
          {loggingOut ? (
            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4 mr-1.5" />
          )}
          Cerrar sesión
        </Button>
      </div>
    </nav>
  )
}

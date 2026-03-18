'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, Shield, AlertTriangle } from 'lucide-react'
import { decodeTokenInfo } from '@/lib/auth'

interface TokenStatusProps {
  token: string
}

export function TokenStatus({ token }: TokenStatusProps) {
  const [remainingMs, setRemainingMs] = useState<number>(0)
  const [totalMs, setTotalMs] = useState<number>(0)
  const [issuedAt, setIssuedAt] = useState<number>(0)
  const [expiresAt, setExpiresAt] = useState<number>(0)

  useEffect(() => {
    const info = decodeTokenInfo(token)
    if (!info) return

    setTotalMs(info.totalMs)
    setIssuedAt(info.issuedAt)
    setExpiresAt(info.expiresAt)
    setRemainingMs(info.remainingMs)

    const interval = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, info.expiresAt - now)
      setRemainingMs(remaining)

      if (remaining <= 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [token])

  const expired = remainingMs <= 0
  const percentage = totalMs > 0 ? (remainingMs / totalMs) * 100 : 0
  const isWarning = percentage < 25 && !expired

  function formatTime(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  function formatDate(ms: number) {
    return new Date(ms).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const barColor = expired
    ? '#555'
    : isWarning
      ? '#FAF33E'
      : '#F0386B'

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between" style={{ color: '#171219' }}>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: expired ? '#555' : 'linear-gradient(135deg, #F0386B, #FF5376)' }}
            >
              <Clock className="w-4 h-4 text-white" />
            </div>
            Estado del Token JWT
          </div>
          <Badge
            className="text-xs border font-semibold"
            style={
              expired
                ? { background: '#f5f5f5', color: '#555', borderColor: '#ccc' }
                : isWarning
                  ? { background: '#fffbe6', color: '#171219', borderColor: '#FAF33E' }
                  : { background: '#f0fff4', color: '#225560', borderColor: '#225560' }
            }
          >
            {expired ? 'Expirado' : isWarning ? 'Por expirar' : 'Activo'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4 space-y-4">
        {/* Countdown */}
        <div className="text-center py-3">
          <p className="text-xs font-medium mb-1" style={{ color: '#888' }}>
            {expired ? 'TOKEN EXPIRADO' : 'TIEMPO RESTANTE'}
          </p>
          <p
            className="text-4xl font-bold font-mono tracking-tight"
            style={{ color: expired ? '#555' : isWarning ? '#F0386B' : '#171219' }}
          >
            {formatTime(remainingMs)}
          </p>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs mb-1" style={{ color: '#888' }}>
            <span>0%</span>
            <span>{Math.round(percentage)}%</span>
            <span>100%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: '#f0f0f0' }}>
            <div
              className="h-2 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%`, background: barColor }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg" style={{ background: '#f8f9fa' }}>
            <p className="text-xs" style={{ color: '#888' }}>Emitido a las</p>
            <p className="text-sm font-semibold" style={{ color: '#171219' }}>
              {issuedAt ? formatDate(issuedAt) : '--:--:--'}
            </p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#f8f9fa' }}>
            <p className="text-xs" style={{ color: '#888' }}>Expira a las</p>
            <p className="text-sm font-semibold" style={{ color: '#171219' }}>
              {expiresAt ? formatDate(expiresAt) : '--:--:--'}
            </p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#f8f9fa' }}>
            <p className="text-xs" style={{ color: '#888' }}>Algoritmo</p>
            <p className="text-sm font-semibold" style={{ color: '#171219' }}>HS256</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#f8f9fa' }}>
            <p className="text-xs" style={{ color: '#888' }}>Duración total</p>
            <p className="text-sm font-semibold" style={{ color: '#171219' }}>1 hora</p>
          </div>
        </div>

        {/* Warning note */}
        {isWarning && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg border text-xs"
            style={{ background: '#fffbe6', borderColor: '#FAF33E', color: '#555' }}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#F0386B' }} />
            <span>
              El token está a punto de expirar. Cuando expire, serás redirigido al login automáticamente.
            </span>
          </div>
        )}

        {expired && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg border text-xs"
            style={{ background: '#fff0f3', borderColor: '#FF5376', color: '#F0386B' }}
          >
            <Shield className="w-4 h-4 flex-shrink-0" />
            <span>
              El token ha expirado. Aunque aún estés en esta página, cualquier petición al servidor será rechazada. Inicia sesión de nuevo.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

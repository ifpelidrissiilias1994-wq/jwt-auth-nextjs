'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  LogOut, User, Shield, Code2, Tag, BookOpen, Loader2,
  Terminal, Layout, Link, Image, List, Table2, FileText,
  Layers, Box, Type, Minus
} from 'lucide-react'
import type { JWTPayload } from '@/lib/auth'

interface DashboardClientProps {
  user: JWTPayload
}

const HTML_TAGS = [
  { tag: 'div', desc: 'Contenedor en bloque', icon: <Box className="w-3.5 h-3.5" /> },
  { tag: 'span', desc: 'Contenedor en línea', icon: <Minus className="w-3.5 h-3.5" /> },
  { tag: 'p', desc: 'Párrafo de texto', icon: <FileText className="w-3.5 h-3.5" /> },
  { tag: 'a', desc: 'Hipervínculo', icon: <Link className="w-3.5 h-3.5" /> },
  { tag: 'h1-h6', desc: 'Encabezados', icon: <Type className="w-3.5 h-3.5" /> },
  { tag: 'img', desc: 'Imagen', icon: <Image className="w-3.5 h-3.5" /> },
  { tag: 'ul / ol', desc: 'Listas', icon: <List className="w-3.5 h-3.5" /> },
  { tag: 'li', desc: 'Elemento de lista', icon: <List className="w-3.5 h-3.5" /> },
  { tag: 'form', desc: 'Formulario', icon: <Layout className="w-3.5 h-3.5" /> },
  { tag: 'input', desc: 'Campo de entrada', icon: <Terminal className="w-3.5 h-3.5" /> },
  { tag: 'button', desc: 'Botón interactivo', icon: <Box className="w-3.5 h-3.5" /> },
  { tag: 'table', desc: 'Tabla de datos', icon: <Table2 className="w-3.5 h-3.5" /> },
  { tag: 'nav', desc: 'Navegación', icon: <Layers className="w-3.5 h-3.5" /> },
  { tag: 'section', desc: 'Sección de contenido', icon: <Layout className="w-3.5 h-3.5" /> },
  { tag: 'head', desc: 'Metadatos del documento', icon: <Code2 className="w-3.5 h-3.5" /> },
]

const COURSE_FUNCTIONS = [
  { name: 'useState()', desc: 'Gestión de estado local en componentes React', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { name: 'useEffect()', desc: 'Efectos secundarios y ciclo de vida', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { name: 'useRouter()', desc: 'Navegación programática en Next.js', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { name: 'fetch()', desc: 'Peticiones HTTP a APIs', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { name: 'signToken()', desc: 'Generación de tokens JWT con jose', color: 'bg-teal-50 border-teal-200 text-teal-700' },
  { name: 'verifyToken()', desc: 'Verificación y decodificación de JWT', color: 'bg-red-50 border-red-200 text-red-700' },
  { name: 'middleware()', desc: 'Protección de rutas en Next.js', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
  { name: 'cookies()', desc: 'Gestión de cookies en el servidor', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
]

export function DashboardClient({ user }: DashboardClientProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">T</span>
            </div>
            <span className="font-bold text-gray-800">Tomates App</span>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
              Zona Privada
            </Badge>
          </div>
          <Button
            onClick={handleLogout}
            disabled={loggingOut}
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
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

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome card */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">
                  ¡Bienvenido, {user.name}! 👋
                </h1>
                <p className="text-emerald-100 text-sm mb-3">
                  Has iniciado sesión correctamente con autenticación JWT
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    📧 {user.email}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    🔐 Token JWT activo
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* HTML Tags Card */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <Tag className="w-4 h-4 text-white" />
                </div>
                15 Etiquetas HTML más usadas
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 gap-2">
                {HTML_TAGS.map(({ tag, desc, icon }) => (
                  <div
                    key={tag}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100"
                  >
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center flex-shrink-0">
                      <span className="text-white" style={{ fontSize: '10px' }}>{icon}</span>
                    </div>
                    <code className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 min-w-[70px]">
                      &lt;{tag}&gt;
                    </code>
                    <span className="text-xs text-gray-500 truncate">{desc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Functions Card */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                Funciones del curso
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-3">
              {COURSE_FUNCTIONS.map(({ name, desc, color }) => (
                <div
                  key={name}
                  className={`p-3 rounded-lg border ${color}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-mono text-sm font-bold">{name}</code>
                  </div>
                  <p className="text-xs opacity-80">{desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* JWT Info Card */}
        <Card className="border-0 shadow-md bg-slate-900 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-100">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span>Información sobre JWT</span>
              <BookOpen className="w-4 h-4 text-emerald-400 ml-1" />
            </CardTitle>
          </CardHeader>
          <Separator className="bg-slate-700" />
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="text-emerald-400 text-sm font-semibold mb-2">🔑 ¿Qué es un JWT?</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  JSON Web Token es un estándar para transmitir información de forma segura entre partes como un objeto JSON firmado digitalmente.
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="text-teal-400 text-sm font-semibold mb-2">⚡ Sin estado</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  HTTP es sin estado. JWT permite que el servidor identifique al usuario en cada petición sin guardar sesiones en base de datos.
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="text-orange-400 text-sm font-semibold mb-2">⚠️ Desventaja clave</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  El logout solo elimina el token del cliente. El token sigue siendo válido en el servidor hasta que expire. No hay invalidación inmediata.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

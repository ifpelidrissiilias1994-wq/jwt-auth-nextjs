'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { User, Shield, Code2, Tag, BookOpen, Terminal, Layout, Link, Image, List, Table2, FileText, Layers, Box, Type, Minus } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { TokenStatus } from '@/components/token-status'
import type { JWTPayload } from '@/lib/auth'

interface DashboardClientProps {
  user: JWTPayload
  token: string
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
  { name: 'useState()', desc: 'Gestión de estado local en componentes React', accent: false },
  { name: 'useEffect()', desc: 'Efectos secundarios y ciclo de vida', accent: false },
  { name: 'useRouter()', desc: 'Navegación programática en Next.js', accent: false },
  { name: 'fetch()', desc: 'Peticiones HTTP a APIs', accent: false },
  { name: 'signToken()', desc: 'Generación de tokens JWT con jose', accent: true },
  { name: 'verifyToken()', desc: 'Verificación y decodificación de JWT', accent: true },
  { name: 'proxy()', desc: 'Protección de rutas en Next.js', accent: false },
  { name: 'cookies()', desc: 'Gestión de cookies en el servidor', accent: false },
]

export function DashboardClient({ user, token }: DashboardClientProps) {
  return (
    <div className="min-h-screen" style={{ background: '#f8f9fa', fontFamily: 'var(--font-outfit)' }}>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome card */}
        <Card
          className="border-0 shadow-lg text-white overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #171219 0%, #225560 100%)' }}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">
                  ¡Bienvenida, {user.name}! 👋
                </h1>
                <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Has iniciado sesión correctamente con autenticación JWT
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className="text-xs border"
                    style={{ background: 'rgba(255,255,255,0.15)', color: '#FAF33E', borderColor: 'rgba(250,243,62,0.4)' }}
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role}
                  </Badge>
                  <Badge
                    className="text-xs border"
                    style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.25)' }}
                  >
                    📧 {user.email}
                  </Badge>
                  <Badge
                    className="text-xs border"
                    style={{ background: 'rgba(240,56,107,0.3)', color: '#FF5376', borderColor: 'rgba(255,83,118,0.4)' }}
                  >
                    🔐 Token JWT activo
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Status */}
        <TokenStatus token={token} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* HTML Tags Card */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2" style={{ color: '#171219' }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #F0386B, #FF5376)' }}
                >
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
                    className="flex items-center gap-3 p-2.5 rounded-lg transition-colors"
                    style={{ background: '#f8f9fa' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fff0f3')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#f8f9fa')}
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-white"
                      style={{ background: '#171219' }}
                    >
                      {icon}
                    </div>
                    <code
                      className="text-xs font-mono font-bold px-1.5 py-0.5 rounded border min-w-[70px]"
                      style={{ color: '#F0386B', background: '#fff0f3', borderColor: '#FF5376' }}
                    >
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
              <CardTitle className="flex items-center gap-2" style={{ color: '#171219' }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #225560, #1a3d47)' }}
                >
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                Funciones del curso
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-3">
              {COURSE_FUNCTIONS.map(({ name, desc, accent }) => (
                <div
                  key={name}
                  className="p-3 rounded-lg border"
                  style={
                    accent
                      ? { background: '#fff0f3', borderColor: '#FF5376', color: '#F0386B' }
                      : { background: '#f0f9fa', borderColor: '#225560', color: '#225560' }
                  }
                >
                  <code className="font-mono text-sm font-bold">{name}</code>
                  <p className="text-xs mt-0.5 opacity-75">{desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* JWT Info Card */}
        <Card className="border-0 shadow-md text-white" style={{ background: '#171219' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2" style={{ color: '#FAF33E' }}>
              <Shield className="w-5 h-5" />
              Información sobre JWT
              <BookOpen className="w-4 h-4 ml-1" />
            </CardTitle>
          </CardHeader>
          <Separator style={{ background: '#2a2030' }} />
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  emoji: '🔑',
                  title: '¿Qué es un JWT?',
                  text: 'JSON Web Token es un estándar para transmitir información de forma segura entre partes como un objeto JSON firmado digitalmente.',
                  accent: '#FAF33E',
                },
                {
                  emoji: '⚡',
                  title: 'Sin estado',
                  text: 'HTTP es sin estado. JWT permite que el servidor identifique al usuario en cada petición sin guardar sesiones en base de datos.',
                  accent: '#225560',
                },
                {
                  emoji: '⚠️',
                  title: 'Desventaja clave',
                  text: 'El logout solo elimina el token del cliente. El token sigue siendo válido en el servidor hasta que expire. No hay invalidación inmediata.',
                  accent: '#FF5376',
                },
              ].map(({ emoji, title, text, accent }) => (
                <div
                  key={title}
                  className="rounded-lg p-4 border"
                  style={{ background: '#1e1523', borderColor: '#2a2030' }}
                >
                  <div className="text-sm font-semibold mb-2" style={{ color: accent }}>
                    {emoji} {title}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#888' }}>{text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

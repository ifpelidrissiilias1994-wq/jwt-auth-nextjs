import { NextRequest, NextResponse } from 'next/server'
import { signToken, registerUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      )
    }

    if (password.length < 4) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 4 caracteres' },
        { status: 400 }
      )
    }

    const result = registerUser({ email, password, name })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 409 }
      )
    }

    const token = await signToken({ email, name, role: 'Usuario' })

    const response = NextResponse.json({
      token,
      user: { email, name, role: 'Usuario' },
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { signToken, VALID_USERS } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = VALID_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }

    const token = await signToken({
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const response = NextResponse.json({
      token,
      user: { email: user.email, name: user.name, role: user.role },
    })

    // Also set httpOnly cookie for middleware protection
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
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

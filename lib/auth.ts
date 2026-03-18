import { SignJWT, jwtVerify, decodeJwt } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'jwt-secret-tomates-2024-super-seguro'
)

export interface JWTPayload {
  email: string
  name: string
  role: string
}

export interface TokenInfo {
  issuedAt: number
  expiresAt: number
  remainingMs: number
  totalMs: number
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export function decodeTokenInfo(token: string): TokenInfo | null {
  try {
    const payload = decodeJwt(token)
    const iat = (payload.iat || 0) * 1000
    const exp = (payload.exp || 0) * 1000
    const now = Date.now()
    return {
      issuedAt: iat,
      expiresAt: exp,
      remainingMs: Math.max(0, exp - now),
      totalMs: exp - iat,
    }
  } catch {
    return null
  }
}

export const VALID_USERS = [
  {
    email: 'MariaCamila@gmail.com',
    password: '1234',
    name: 'Maria Camila',
    role: 'Administradora',
  },
]

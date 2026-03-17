import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardClient } from '@/components/dashboard-client'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) redirect('/login')

  const user = await verifyToken(token)
  if (!user) redirect('/login')

  return <DashboardClient user={user} />
}

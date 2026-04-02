import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Obtenemos la cookie de autenticación
  const token = request.cookies.get('auth_token')
  
  // Si intenta entrar a /admin y no tiene token, lo mandamos al login
  if (request.nextUrl.pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si intenta entrar al login y YA tiene token, lo mandamos al admin
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
 
  return NextResponse.next()
}
 
// Configuración: A qué rutas afecta
export const config = {
  matcher: ['/admin/:path*', '/login'],
}
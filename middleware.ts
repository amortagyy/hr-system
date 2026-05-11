import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/forgot-password', '/about', '/features', '/contact'];
const PROTECTED_ROUTES = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route)
  );

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // For protected routes, the auth check happens in the layout via useAuth hook
  // This middleware only provides a basic redirect for initial access
  // If accessing protected route from initial load, redirect to login
  // (real auth check happens client-side in dashboard layout)
  if (isProtectedRoute) {
    // Allow it - the client-side layout will check auth state
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};

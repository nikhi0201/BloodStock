import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/donor/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isDonorDashboard = nextUrl.pathname.startsWith('/donor') && !nextUrl.pathname.includes('/login') && !nextUrl.pathname.includes('/signup')
            const isHospitalDashboard = nextUrl.pathname.startsWith('/hospital') && !nextUrl.pathname.includes('/login') && !nextUrl.pathname.includes('/signup')
            const isDashboard = nextUrl.pathname.startsWith('/dashboard')

            // Allow API routes to pass through
            if (nextUrl.pathname.startsWith('/api')) {
                return true
            }

            // Protect dashboard routes
            if (isDashboard || isDonorDashboard || isHospitalDashboard) {
                if (isLoggedIn) return true
                return false
            }

            // If logged in and trying to access auth pages, redirect to dashboard
            if (isLoggedIn) {
                const isOnAuth = nextUrl.pathname.includes('/login') || nextUrl.pathname.includes('/signup')
                if (isOnAuth) {
                    const role = (auth?.user as any)?.role
                    if (role === 'hospital') {
                        return Response.redirect(new URL('/dashboard', nextUrl))
                    }
                    return Response.redirect(new URL('/dashboard', nextUrl))
                }
            }

            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role as string
                token.id = user.id as string
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string
                session.user.id = token.id as string
            }
            return session
        },
    },
    providers: [],
} satisfies NextAuthConfig

import {createServerClient} from '@supabase/ssr'
import {NextResponse, type NextRequest} from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value, options}) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({name, value, options}) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        },
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {data: {user}} = await supabase.auth.getUser()
    const {data: {session}} = await supabase.auth.getSession()

    const validProviderSession = !!(session?.provider_token && session.provider_refresh_token);

    const isWelcomePage = request.nextUrl.pathname.startsWith('/welcome');
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
    const isProtectedRoute = !isWelcomePage && !isAuthPage;

    if (isProtectedRoute && (!user || !validProviderSession)) {
        const url = request.nextUrl.clone()
        url.pathname = '/welcome';
        if (user && !validProviderSession) {
            url.searchParams.set('message', 'Spotify session is invalid. Please sign in again.')
            await supabase.auth.signOut();
        }
        return NextResponse.redirect(url)
    }

    if (user && isWelcomePage) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
}
import { NextRequest , NextResponse } from "next/server";

export default function middleware(req : NextRequest){
    const token = req.cookies.get('token')?.value
    const path = req.nextUrl.pathname
    if(token && path === '/login'){
        return NextResponse.redirect(new URL('/',req.url))
    }
    else if(token && path.includes('/Dashboard')) return NextResponse.next()
    else if(!token && path === '/') return NextResponse.next()
    else if(!token && path.includes('/Dashboard')) return NextResponse.redirect(new URL('/login',req.url))
    
}
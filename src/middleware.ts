import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose'


export async function middleware(req: NextRequest) {
    try {
         const url = req.nextUrl.pathname.toLowerCase();
         if (url === "/api/expense" && req.method === "GET") {
      return NextResponse.next();
    }
        if (url === "/api/policy/validatepolicy") {
            return NextResponse.next();
        }
        const Token = req.headers.get('Authorization')?.replace(/^Bearer\s+/, '');
        const secretKey = process.env.SECRET_KEY;
        if (!Token) {
            return new Response(JSON.stringify({ error: true, message: 'No Token Provided' }), { status: 401 })
        }
        if (!secretKey) {
            return new Response(JSON.stringify({ error: true, message: 'No Token Provided' }), { status: 500 })
        }
        const userpayload = (await jwtVerify(Token, new TextEncoder().encode(secretKey))).payload;
        const UserDetails = new Headers(req.headers);
        UserDetails.set('UserPayload', JSON.stringify(userpayload));
        UserDetails.get("UserPayload")
        return NextResponse.next({
            request: { headers: UserDetails }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }))
    }

}

export const config = {
    matcher: ["/api/users/:path*", "/api/policy/:path*", "/api/approve/:path*","/api/expense"],
};

// import  {auth}  from "./server/auth";

// export default auth((req) => {
//     const isAuthenticated = !!req.auth?.user;

//     if(!isAuthenticated) {
//         const newURL = new URL("/login", req.nextUrl.origin);
//         return Response.redirect(newURL);
//     }
// });

// export const config = {
//     matcher: ["/"]
// }


import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

  const token = request.cookies.get("authjs.session-token")?.value; // adjust key as needed

  if (!token) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/"]
}


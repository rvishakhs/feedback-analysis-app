export const runtime = "nodejs";

import  {auth}  from "./server/auth";

export default auth((req) => {
    const isAuthenticated = !!req.auth;

    if(!isAuthenticated) {
        const newURL = new URL("/login", req.nextUrl.origin);
        return Response.redirect(newURL);
    }

});

export const config = {
    matcher: ["/"]
}
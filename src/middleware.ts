import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { Environments } from './config/environments';

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: Environments.auth.next.secret,
  });

  if (!session) {
    request.nextUrl.pathname = '/';

    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/api/private/:path*'],
};

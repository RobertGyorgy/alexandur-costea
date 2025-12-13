import { NextResponse } from 'next/server';

export function middleware(request) {
  // Skip middleware in development mode
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }
  
  const userAgent = request.headers.get('user-agent') || '';
  
  // Lista de user agents pentru HTTrack și alte scraper-e (doar în producție)
  const blockedAgents = [
    'httrack',
    'wget',
    'python-requests',
    'go-http-client',
    'java/',
    'bot',
    'spider',
    'crawler',
    'scraper',
    'lwp-trivial',
    'mechanize',
    'python-urllib',
    'libwww-perl',
    'lwp-request',
    'linkchecker',
    'validator',
    'checklink',
    'webfetch',
    'download',
    'getleft',
    'teleport',
    'webcopier',
    'webripper',
    'websucker',
    'webwhacker',
    'winhttrack',
    'ia_archiver',
    'archive.org_bot'
  ];
  
  const isBlocked = blockedAgents.some(agent => 
    userAgent.toLowerCase().includes(agent.toLowerCase())
  );
  
  if (isBlocked) {
    return new NextResponse('Access Denied - Scraping not allowed', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Blocked-Reason': 'Automated scraping detected',
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

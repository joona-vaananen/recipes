// TODO: Debug the following error:
// Failure in name='port listening check': container listening on expected port (3000) with unexpected IPv4 interface: expected=0.0.0.0 actual=172.17.0.4

export const GET = () => {
  return new Response(null, { status: 204 });
};

export const dynamic = 'force-dynamic';

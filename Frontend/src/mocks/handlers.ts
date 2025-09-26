import { http, HttpResponse } from 'msw';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const handlers = [
  // Staff / Facility Login
  // http.post(`${API}/auth/login/`, async ({ request }) => {
  //   const body = await request.json() as { email: string; password: string };

  //   if (body.email === 'staff@klara.test' && body.password === 'Password123!') {
  //     return HttpResponse.json(
  //       { token: 'mock-token-staff', user: { id: 2, email: 'staff@klara.test', role: 'staff' } },
  //       { status: 200 }
  //     );
  //   }
  //   return HttpResponse.json({ detail: 'Invalid credentials' }, { status: 401 });
  // }),

http.post(`${API}/auth/login/`, async ({ request }) => {
  const body = await request.json() as { email: string; password: string };

  if (body.email === 'staff@klara.test' && body.password === 'Password123!') {
    return HttpResponse.json(
      { token: 'mock-token-staff', user: { id: 2, email: 'staff@klara.test', role: 'staff' } },
      { status: 200 }
    );
  }
  return HttpResponse.json({ detail: 'Invalid credentials' }, { status: 401 });
}),


  // Developer Login (with MFA)
  http.post(`${API}/auth/developer-login/`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string } & { mfa?: string };

    if (body.email === 'dev@klara.test' && body.password === 'DevPass123!' && body.mfa === '111111') {
      return HttpResponse.json(
        { token: 'mock-token-dev', user: { id: 10, email: 'dev@klara.test', role: 'developer' } },
        { status: 200 }
      );
    }
    return HttpResponse.json({ detail: 'Invalid developer credentials or MFA' }, { status: 401 });
  }),

  // Admin Login (with MFA)
  http.post(`${API}/auth/admin-login/`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string } & { mfa?: string };

    if (body.email === 'admin@klara.test' && body.password === 'AdminPass123!' && body.mfa === '654321') {
      return HttpResponse.json(
        { token: 'mock-token-admin', user: { id: 1, email: 'admin@klara.test', role: 'admin' } },
        { status: 200 }
      );
    }
    return HttpResponse.json({ detail: 'Invalid admin credentials or MFA' }, { status: 401 });
  }),

  
  http.post(`${API}/auth/send-otp/`, async () => {
    return HttpResponse.json({ user_id: 50, message: 'OTP sent to phone' }, { status: 200 });
  }),

  // Patient - Verify OTP
http.post(`${API}/auth/verify-otp/`, async ({ request }) => {
  const body = await request.json() as { user_id: number; code: string };

  if (body.user_id === 50 && body.code === '123456') {
    return HttpResponse.json(
      {
        token: 'mock-token-patient',
        user: { id: 50, phone: '03001234567', role: 'patient' }
      },
      { status: 200 }
    );
  }

  return HttpResponse.json({ detail: 'Invalid OTP' }, { status: 401 });
}),


];

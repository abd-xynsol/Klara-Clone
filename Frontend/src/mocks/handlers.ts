import { http, HttpResponse } from 'msw';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const handlers = [
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

  http.post(`${API}/auth/developer-login/`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string } & { mfa?: string };

    if (body!.email === 'dev@klara.test' && body!.password === 'DevPass123!' && body!.mfa) {
      return HttpResponse.json(
        { token: 'mock-token-dev', user: { id: 10, email: 'dev@klara.test', role: 'developer' } },
        { status: 200 }
      );
    }
    return HttpResponse.json({ detail: 'Invalid developer credentials or MFA' }, { status: 401 });
  }),

  http.post(`${API}/auth/send-otp/`, async () => {
    // The request body is not used, so you don't need to destructure it.
    return HttpResponse.json({ user_id: 50, message: 'OTP sent' }, { status: 200 });
  }),

  http.post(`${API}/auth/verify-otp/`, async ({ request }) => {
    const body = await request.json() as { email: string; code: string };

    if (body!.code === '123456') {
      return HttpResponse.json(
        { token: 'mock-token-patient', user: { id: 50, email: 'patient@klara.test', role: 'patient' } },
        { status: 200 }
      );
    }
    return HttpResponse.json({ detail: 'Invalid OTP' }, { status: 401 });
  }),
];

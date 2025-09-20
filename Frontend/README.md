1. npm install
2. npm run dev
3. open http://localhost:5173


Test accounts (mocked via MSW):
- admin@klara.test / Password123! -> /dashboard/admin
- staff@klara.test / Password123! -> /dashboard/staff
- dev@klara.test / DevPass123! / mfa(any) -> /dashboard/developer
- patient flow: send-otp -> verify with 123456 to login as patient


Notes:
- Zustand is used for auth state and lockout counter.
- Lockout after 5 failed attempts.
- Axios interceptor redirects to facility login on 401.
- MFA setup component uses react-qr-code and is present as an example.
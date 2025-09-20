// import { create } from 'zustand'


// type UserRole = 'admin' | 'provider' | 'staff' | 'patient' | 'developer' | null


// type AuthState = {
// token: string | null
// user: { id: number; email: string; role: UserRole } | null
// failedAttempts: number
// lockoutUntil: number | null
// setAuth: (token: string, user: AuthState['user']) => void
// clearAuth: () => void
// incrementFailed: () => void
// resetFailed: () => void
// }


// const useAuth = create<AuthState>((set, get) => ({
// token: null,
// user: null,
// failedAttempts: 0,
// lockoutUntil: null,
// setAuth: (token, user) => {
// localStorage.setItem('klara_token', token)
// localStorage.setItem('klara_user', JSON.stringify(user))
// set({ token, user, failedAttempts: 0, lockoutUntil: null })
// },
// clearAuth: () => {
// localStorage.removeItem('klara_token')
// localStorage.removeItem('klara_user')
// set({ token: null, user: null })
// },
// incrementFailed: () => {
// const fa = get().failedAttempts + 1
// const updates: any = { failedAttempts: fa }
// if (fa >= 5) {
// const until = Date.now() + 60_000 // lockout 60s
// updates.lockoutUntil = until
// }
// set(updates)
// },
// resetFailed: () => set({ failedAttempts: 0, lockoutUntil: null })
// }))


// // helper functions for axios import
// export const getToken = () => localStorage.getItem('klara_token')
// export const setToken = (t: string) => localStorage.setItem('klara_token', t)
// export const clearAuth = () => localStorage.removeItem('klara_token')


// export default useAuth;
// export type { AuthState };

import { create } from 'zustand'

type UserRole = 'admin' | 'provider' | 'staff' | 'patient' | 'developer' | null

type AuthState = {
  token: string | null
  user: { id: number; email: string; role: UserRole } | null
  failedAttempts: number
  lockoutUntil: number | null
  setAuth: (token: string, user: AuthState['user']) => void
  clearAuth: () => void
  incrementFailed: () => void
  resetFailed: () => void
}

// hydrate initial values from localStorage (safe)
const initialToken = typeof window !== 'undefined' ? localStorage.getItem('klara_token') : null
let initialUser: AuthState['user'] = null
if (initialToken) {
  try {
    initialUser = JSON.parse(localStorage.getItem('klara_user') || 'null')
  } catch {
    initialUser = null
  }
}

const useAuth = create<AuthState>((set, get) => ({
  token: initialToken,
  user: initialUser,
  failedAttempts: 0,
  lockoutUntil: null,
  setAuth: (token, user) => {
    localStorage.setItem('klara_token', token)
    localStorage.setItem('klara_user', JSON.stringify(user))
    set({ token, user, failedAttempts: 0, lockoutUntil: null })
  },
  clearAuth: () => {
    localStorage.removeItem('klara_token')
    localStorage.removeItem('klara_user')
    set({ token: null, user: null })
  },
  incrementFailed: () => {
    const fa = get().failedAttempts + 1
    const updates: any = { failedAttempts: fa }
    if (fa >= 5) {
      const until = Date.now() + 60_000 // lockout 60s
      updates.lockoutUntil = until
    }
    set(updates)
  },
  resetFailed: () => set({ failedAttempts: 0, lockoutUntil: null })
}))

// helper functions for axios import (kept in sync)
export const getToken = () => localStorage.getItem('klara_token')
export const setToken = (t: string) => localStorage.setItem('klara_token', t)
// clear stored auth + update Zustand store (used by axios on 401)
export const clearStoredAuth = () => {
  localStorage.removeItem('klara_token')
  localStorage.removeItem('klara_user')
  // update Zustand state synchronously
  useAuth.setState({ token: null, user: null })
}

export default useAuth
export type { AuthState }

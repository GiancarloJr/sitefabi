import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environments';


interface LoginResponse {
  token: string;
  user: { id: number; email: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  private _token$ = new BehaviorSubject<string | null>(this.getStoredToken());
  token$ = this._token$.asObservable();

  login(email: string, senha: string, remember = false) {
    return this.http.post<LoginResponse>(`${this.base}/auth/login`, { email, senha })
      .pipe(tap(res => this.setToken(res.token, remember)));
  }

  logout() {
    this.clearToken();
  }

  isAuthenticated(): boolean {
    const t = this._token$.value;
    if (!t) return false;
    const exp = this.getTokenExp(t);
    return exp ? Date.now() < exp * 1000 : true;
  }

  /** Preferimos sessionStorage (fecha ao encerrar o navegador).
   * Se 'remember' = true, usa localStorage. */
  private setToken(token: string, remember: boolean) {
    this._token$.next(token);
    if (remember) {
      localStorage.setItem('auth_token', token);
      sessionStorage.removeItem('auth_token');
    } else {
      sessionStorage.setItem('auth_token', token);
      localStorage.removeItem('auth_token');
    }
  }

  private clearToken() {
    this._token$.next(null);
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return this._token$.value;
  }

  private getStoredToken(): string | null {
    return sessionStorage.getItem('auth_token') || localStorage.getItem('auth_token');
  }

  /** Decodifica o payload do JWT para ler 'exp' (sem validar assinatura no front) */
  private getTokenExp(token: string): number | null {
    try {
      const [, payload] = token.split('.');
      const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return typeof json?.exp === 'number' ? json.exp : null;
    } catch {
      return null;
    }
  }
}

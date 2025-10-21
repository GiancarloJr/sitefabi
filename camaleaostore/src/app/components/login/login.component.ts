import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = false;
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4)]],
    remember: [false]
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    const { email, senha, remember } = this.form.value as { email: string; senha: string; remember: boolean };

    this.auth.login(email, senha, remember).subscribe({
      next: () => {
        const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/admin';
        this.router.navigateByUrl(redirect);
      },
      error: (err) => {
        this.error = err?.error?.error || 'Falha ao entrar';
        this.loading = false;
      }
    });
  }
}
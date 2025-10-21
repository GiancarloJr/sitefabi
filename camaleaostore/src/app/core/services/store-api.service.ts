import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Category } from 'src/app/models/category';

export interface ProductCard {
  titulo: string;
  preco?: number;
  descricao?: string;
  tamanhos?: string[];
  imagemBase64?: string;
  imagemUrl?: string;
  valorFormatado?: string;
  href?: string;
}

@Injectable({ providedIn: 'root' })
export class StoreApiService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  private readonly baseUrl = this.base;

  private categorias$?: Observable<Category[]>;

  getProdutos(): Observable<ProductCard[]> {
    return this.http.get<ProductCard[]>(`${this.baseUrl}/produtos`);
  }

  getCategorias(): Observable<Category[]> {
    if (!this.categorias$) {
      this.categorias$ = this.http
        .get<Category[]>(`${this.baseUrl}/categorias`)
        .pipe(shareReplay(1));
    }
    return this.categorias$;
  }
}
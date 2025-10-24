import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Category } from 'src/app/models/category';

export interface ProductCard {
  id: number,
  titulo: string;
  preco?: number;
  descricao?: string;
  tamanhos?: string[];
  imagemBase64?: string;
  imagemUrl?: string;
  valorFormatado?: string;
  href?: string;
}

export interface CreateProductDto {
  titulo: string;
  preco: number | null;
  descricao: string | null;
  tamanhos: string[] | null;
  imagem_base64: string | null;
  valor_formatado?: string | null; // opcional
  href: string | null;
  categoria_id: number | null;
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

  createProduto(body: CreateProductDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/produtos`, body);
  }

  getCategorias(): Observable<Category[]> {
    if (!this.categorias$) {
      this.categorias$ = this.http
        .get<Category[]>(`${this.baseUrl}/categorias`)
        .pipe(shareReplay(1));
    }
    return this.categorias$;
  }

  getProdutosByCategoriaId(categoriaId: number) {
    return this.http.get<{ categoria: any; produtos: ProductCard[] }>(
      `${this.baseUrl}/categorias/${categoriaId}/produtos`
    );
  }


  toggleProdutoAtivo(id: number, ativo: boolean) {
    return this.http.patch(`${this.baseUrl}/produtos/${id}/ativo`, { ativo });
  }

  updateProduto(id: number, body: CreateProductDto) {
    return this.http.patch(`${this.baseUrl}/produtos/${id}`, body);
  }

  deleteProduto(id: number) {
    return this.http.delete(`${this.baseUrl}/produtos/${id}`);
  }
}
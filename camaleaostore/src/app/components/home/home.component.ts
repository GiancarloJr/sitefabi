import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { ProductCard } from '../../models/product-card';
import { BehaviorSubject, map, Observable, startWith, switchMap } from 'rxjs';
import { StoreApiService } from 'src/app/core/services/store-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MenuComponent, ProductGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    ngOnInit(): void {
    this.api.getCategorias().subscribe(categorias => {
      const blusas = categorias.find(c => c.nome.toLowerCase().includes('blusa'));
      if (blusas) this.categoriaId$.next(blusas.id);
    });
  }

  private api = inject(StoreApiService);

  private categoriaId$ = new BehaviorSubject<number | null>(null);

  produtos$: Observable<ProductCard[]> = this.categoriaId$.pipe(
    startWith(null),
    switchMap(id => {
      if (id == null) {
        return this.api.getProdutos();
      } else {
        return this.api.getProdutosByCategoriaId(id).pipe(
          map(resp => resp.produtos)
        );
      }
    })
  );

  onCategorySelected(id: number) {
    this.categoriaId$.next(id);
  }
}

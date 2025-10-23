import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { StoreApiService } from '../../core/services/store-api.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';


import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductCard } from 'src/app/models/product-card';
import { Category } from 'src/app/models/category';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProductDialogComponent } from './dialog/add-product-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

type FiltersForm = {
  titulo: FormControl<string>;
  precoMin: FormControl<number | null>;
  precoMax: FormControl<number | null>;
  tamanho: FormControl<string>;
  categoriaId: FormControl<number | null>;
};

type FilterModel = {
  titulo: string;
  precoMin: number | null;
  precoMax: number | null;
  tamanho: string;
  categoriaId: number | null;
};

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, CurrencyPipe, NgOptimizedImage,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatSlideToggleModule, MatInputModule, MatIconModule, MatButtonModule, MatChipsModule, MatTooltipModule, MatSelectModule, MatOptionModule, MatDialogModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private api = inject(StoreApiService);
  private dialog = inject(MatDialog);

  openAddProduct(): void {
    const ref = this.dialog.open(AddProductDialogComponent, {
      panelClass: 'add-product-dialog',
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      autoFocus: false,
      disableClose: true,
      data: { categorias: this.categorias },
    });

    ref.afterClosed().subscribe((created: boolean) => {
      if (created) this.fetchProdutos();
    });
  }


  displayedColumns: string[] = ['imagem', 'titulo', 'preco', 'descricao', 'tamanhos', 'categoria', 'ativo', 'acoes'];
  dataSource = new MatTableDataSource<ProductCard>([]);

  filters: FormGroup<FiltersForm> = this.fb.group<FiltersForm>({
    titulo: this.fb.nonNullable.control(''),
    precoMin: this.fb.control<number | null>(null),
    precoMax: this.fb.control<number | null>(null),
    tamanho: this.fb.nonNullable.control(''),
    categoriaId: this.fb.control<number | null>(null)
  });

  categorias: Category[] = [];
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    // Configura o filtro customizado da MatTable
    this.dataSource.filterPredicate = (data, filterJson) => {
      const f: FilterModel = JSON.parse(filterJson);

      // TÍTULO
      if (f.titulo?.trim()) {
        const ok = (data.titulo ?? '').toLowerCase().includes(f.titulo.trim().toLowerCase());
        if (!ok) return false;
      }

      // PREÇO (min/max)
      if (typeof f.precoMin === 'number' && data.preco != null && data.preco < f.precoMin) return false;
      if (typeof f.precoMax === 'number' && data.preco != null && data.preco > f.precoMax) return false;

      // TAMANHO (contém em tamanhos[])
      if (f.tamanho?.trim()) {
        const alvo = f.tamanho.trim().toLowerCase();
        const ok = (data.tamanhos ?? []).some(t => (t ?? '').toLowerCase().includes(alvo));
        if (!ok) return false;
      }

      if (f.categoriaId != null) {
        const id = Number(f.categoriaId);
        const dataId = data.categoria_id != null ? Number(data.categoria_id) : null;
        if (dataId !== id) return false;
      }

      return true;
    };

    // Reaplica o filtro sempre que o form mudar
    this.filters.valueChanges.subscribe(() => this.applyFormFilter());

    // carregar 1x
    this.loadCategorias();
    this.fetchProdutos();
  }

  private loadCategorias(): void {
    this.api.getCategorias().subscribe({
      next: (cats) => this.categorias = cats ?? [],
      error: (e) => console.error('Erro ao buscar categorias', e)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private fetchProdutos(): void {
    this.loading = true;
    this.api.getProdutos().subscribe({
      next: (produtos) => {
        this.dataSource.data = produtos ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos', err);
        this.loading = false;
      }
    });
  }

  applyFormFilter(): void {
    const payload: FilterModel = this.filters.getRawValue();
    this.dataSource.filter = JSON.stringify(payload);
    this.dataSource.paginator?.firstPage();
  }



  clearFilters(): void {
    this.filters.reset({ titulo: '', precoMin: null, precoMax: null, tamanho: '', categoriaId: null });
  }

  togglingId: number | null = null;

  onToggleAtivo(row: ProductCard, checked: boolean): void {
    if (row.id == null) return;

    // otimista
    const old = row.ativo ?? false;
    row.ativo = checked;
    this.togglingId = row.id;

    this.api.toggleProdutoAtivo(row.id, checked).subscribe({
      next: () => {
        this.togglingId = null;
      },
      error: (e) => {
        console.error('Falha ao alternar ativo', e);
        // reverte
        row.ativo = old;
        this.togglingId = null;
      }
    });
  }

  edit(row: ProductCard): void {
console.log("aqui");
console.log(row);

    const ref = this.dialog.open(AddProductDialogComponent, {
      panelClass: 'add-product-dialog',
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      autoFocus: false,
      disableClose: true,
      data: { categorias: this.categorias as Category[], produto: row as ProductCard } 
    });

    ref.afterClosed().subscribe((updated: boolean) => {
      if (updated) this.fetchProdutos();
    });
  }

  remove(row: ProductCard): void {
    if (!row.id) return;
    const ok = window.confirm(`Excluir o produto "${row.titulo}"?`);
    if (!ok) return;

    this.loading = true;
    this.api.deleteProduto(row.id).subscribe({
      next: () => this.fetchProdutos(),
      error: (err) => {
        console.error('Erro ao excluir', err);
        this.loading = false;
      }
    });
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}

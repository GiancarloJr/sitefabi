import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreApiService } from 'src/app/core/services/store-api.service';

interface Category { id: number; nome: string; slug?: string; }

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output() categorySelected = new EventEmitter<number>(); // emite o ID
  categorias: Category[] = [];
  private api = inject(StoreApiService);

  ngOnInit(): void {
    this.api.getCategorias().subscribe(cs => this.categorias = cs);
  }

  select(id: number) { this.categorySelected.emit(id); }
}

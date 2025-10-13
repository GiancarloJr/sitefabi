import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard, ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {

  @Input() products: ProductCard[] = [];

  trackByTitle = (_: number, p: ProductCard) => p.titulo;

}

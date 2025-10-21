import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from 'src/app/models/product-card';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: ProductCard;


}


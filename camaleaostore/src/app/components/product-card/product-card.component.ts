import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductCard {
  titulo: string;            // nome do produto
  preco?: number;            // valor numérico em R$
  descricao?: string;        // descrição curta
  tamanhos?: string[];       // ex.: ['P', 'M', 'G', 'GG']
  imagemUrl: string;         // caminho da imagem (assets/...)
  valorFormatado?: string;   // ex.: "R$ 89,90" (opcional)
  href?: string;             // link para página de detalhes
}

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

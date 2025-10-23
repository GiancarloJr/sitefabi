import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { ProductCard } from '../../models/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MenuComponent, ProductGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  produtos: ProductCard[] = [
    {
      id: 6,
      titulo: 'Camiseta Vintage Camaleão',
      preco: 89.90,
      descricao: 'Malha premium, modelagem confortável.',
      tamanhos: ['P', 'M', 'G', 'GG'],
      imagemUrl: 'assets/vitrine/roupa1.jpeg',
      valorFormatado: 'R$ 89,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Calça Jeans Slim',
      preco: 159.90,
      descricao: 'Jeans stretch, lavagem média.',
      tamanhos: ['36', '38', '40', '42', '44'],
      imagemUrl: 'assets/vitrine/roupa2.jpeg',
      valorFormatado: 'R$ 159,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Vestido Midi Floral',
      preco: 199.90,
      descricao: 'Viscose leve, modelagem midi.',
      tamanhos: ['P', 'M', 'G'],
      imagemUrl: 'assets/vitrine/roupa4.jpeg',
      valorFormatado: 'R$ 199,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Roupa Íntima Confort',
      preco: 49.90,
      descricao: 'Microfibra macia, várias cores.',
      tamanhos: ['P', 'M', 'G'],
      imagemUrl: 'assets/vitrine/roupa4.jpeg',
      valorFormatado: 'R$ 49,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Acessório — Cinto Couro',
      preco: 79.90,
      descricao: 'Couro legítimo, fivela metálica.',
      tamanhos: ['Único'],
      imagemUrl: 'assets/vitrine/roupa5.jpeg',
      valorFormatado: 'R$ 79,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Camiseta Vintage Camaleão',
      preco: 89.90,
      descricao: 'Malha premium, modelagem confortável.',
      tamanhos: ['P', 'M', 'G', 'GG'],
      imagemUrl: 'assets/vitrine/roupa1.jpeg',
      valorFormatado: 'R$ 89,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Calça Jeans Slim',
      preco: 159.90,
      descricao: 'Jeans stretch, lavagem média.',
      tamanhos: ['36', '38', '40', '42', '44'],
      imagemUrl: 'assets/vitrine/roupa2.jpeg',
      valorFormatado: 'R$ 159,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Vestido Midi Floral',
      preco: 199.90,
      descricao: 'Viscose leve, modelagem midi.',
      tamanhos: ['P', 'M', 'G'],
      imagemUrl: 'assets/vitrine/roupa4.jpeg',
      valorFormatado: 'R$ 199,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Roupa Íntima Confort',
      preco: 49.90,
      descricao: 'Microfibra macia, várias cores.',
      tamanhos: ['P', 'M', 'G'],
      imagemUrl: 'assets/vitrine/roupa4.jpeg',
      valorFormatado: 'R$ 49,90',
      href: '#'
    },
    {
      id: 6,
      titulo: 'Acessório — Cinto Couro',
      preco: 79.90,
      descricao: 'Couro legítimo, fivela metálica.',
      tamanhos: ['Único'],
      imagemUrl: 'assets/vitrine/roupa5.jpeg',
      valorFormatado: 'R$ 79,90',
      href: '#'
    },
    {
      id: 5,
      titulo: 'Camiseta Vintage Camaleão',
      preco: 89.90,
      descricao: 'Malha premium, modelagem confortável.',
      tamanhos: ['P', 'M', 'G', 'GG'],
      imagemUrl: 'assets/vitrine/roupa1.jpeg',
      valorFormatado: 'R$ 89,90',
      href: '#'
    },
    {
      id: 4,
      titulo: 'Calça Jeans Slim',
      preco: 159.90,
      descricao: 'Jeans stretch, lavagem média.',
      tamanhos: ['36', '38', '40', '42', '44'],
      imagemUrl: 'assets/vitrine/roupa2.jpeg',
      valorFormatado: 'R$ 159,90',
      href: '#'
    },
    {
      id: 3,
      titulo: 'Vestido Midi Floral',
      preco: 199.90,
      descricao: 'Viscose leve, modelagem midi.',
      tamanhos: ['P', 'M', 'G'],
      imagemUrl: 'assets/vitrine/roupa4.jpeg',
      valorFormatado: 'R$ 199,90',
      href: '#'
    },
    {
      id: 2,
      titulo: 'Roupa Íntima Confort',
      preco: 49.90,
      descricao: 'Microfibra macia, várias cores.',
      tamanhos: ['P', 'M', 'G'],
      imagemUrl: 'assets/vitrine/roupa4.jpeg',
      valorFormatado: 'R$ 49,90',
      href: '#'
    },
    {
      id: 1,
      titulo: 'Acessório — Cinto Couro',
      preco: 79.90,
      descricao: 'Couro legítimo, fivela metálica.',
      tamanhos: ['Único'],
      imagemUrl: 'assets/vitrine/roupa5.jpeg',
      valorFormatado: 'R$ 79,90',
      href: '#'
    }
  ];

}

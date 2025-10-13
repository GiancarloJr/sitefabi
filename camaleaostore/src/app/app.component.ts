import { Component } from '@angular/core';
import { ProductCard } from './components/product-card/product-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'camaleaostore';

produtos: ProductCard[] = [
  {
    titulo: 'Camiseta Vintage Camaleão',
    preco: 89.90,
    descricao: 'Malha premium, modelagem confortável.',
    tamanhos: ['P', 'M', 'G', 'GG'],
    imagemUrl: 'assets/vitrine/roupa1.jpeg',
    valorFormatado: 'R$ 89,90',
    href: '#'
  },
  {
    titulo: 'Calça Jeans Slim',
    preco: 159.90,
    descricao: 'Jeans stretch, lavagem média.',
    tamanhos: ['36', '38', '40', '42', '44'],
    imagemUrl: 'assets/vitrine/roupa2.jpeg',
    valorFormatado: 'R$ 159,90',
    href: '#'
  },
  {
    titulo: 'Vestido Midi Floral',
    preco: 199.90,
    descricao: 'Viscose leve, modelagem midi.',
    tamanhos: ['P', 'M', 'G'],
    imagemUrl: 'assets/vitrine/roupa4.jpeg',
    valorFormatado: 'R$ 199,90',
    href: '#'
  },
  {
    titulo: 'Roupa Íntima Confort',
    preco: 49.90,
    descricao: 'Microfibra macia, várias cores.',
    tamanhos: ['P', 'M', 'G'],
    imagemUrl: 'assets/vitrine/roupa4.jpeg',
    valorFormatado: 'R$ 49,90',
    href: '#'
  },
  {
    titulo: 'Acessório — Cinto Couro',
    preco: 79.90,
    descricao: 'Couro legítimo, fivela metálica.',
    tamanhos: ['Único'],
    imagemUrl: 'assets/vitrine/roupa5.jpeg',
    valorFormatado: 'R$ 79,90',
    href: '#'
  },
    {
    titulo: 'Camiseta Vintage Camaleão',
    preco: 89.90,
    descricao: 'Malha premium, modelagem confortável.',
    tamanhos: ['P', 'M', 'G', 'GG'],
    imagemUrl: 'assets/vitrine/roupa1.jpeg',
    valorFormatado: 'R$ 89,90',
    href: '#'
  },
  {
    titulo: 'Calça Jeans Slim',
    preco: 159.90,
    descricao: 'Jeans stretch, lavagem média.',
    tamanhos: ['36', '38', '40', '42', '44'],
    imagemUrl: 'assets/vitrine/roupa2.jpeg',
    valorFormatado: 'R$ 159,90',
    href: '#'
  },
  {
    titulo: 'Vestido Midi Floral',
    preco: 199.90,
    descricao: 'Viscose leve, modelagem midi.',
    tamanhos: ['P', 'M', 'G'],
    imagemUrl: 'assets/vitrine/roupa4.jpeg',
    valorFormatado: 'R$ 199,90',
    href: '#'
  },
  {
    titulo: 'Roupa Íntima Confort',
    preco: 49.90,
    descricao: 'Microfibra macia, várias cores.',
    tamanhos: ['P', 'M', 'G'],
    imagemUrl: 'assets/vitrine/roupa4.jpeg',
    valorFormatado: 'R$ 49,90',
    href: '#'
  },
  {
    titulo: 'Acessório — Cinto Couro',
    preco: 79.90,
    descricao: 'Couro legítimo, fivela metálica.',
    tamanhos: ['Único'],
    imagemUrl: 'assets/vitrine/roupa5.jpeg',
    valorFormatado: 'R$ 79,90',
    href: '#'
  },
    {
    titulo: 'Camiseta Vintage Camaleão',
    preco: 89.90,
    descricao: 'Malha premium, modelagem confortável.',
    tamanhos: ['P', 'M', 'G', 'GG'],
    imagemUrl: 'assets/vitrine/roupa1.jpeg',
    valorFormatado: 'R$ 89,90',
    href: '#'
  },
  {
    titulo: 'Calça Jeans Slim',
    preco: 159.90,
    descricao: 'Jeans stretch, lavagem média.',
    tamanhos: ['36', '38', '40', '42', '44'],
    imagemUrl: 'assets/vitrine/roupa2.jpeg',
    valorFormatado: 'R$ 159,90',
    href: '#'
  },
  {
    titulo: 'Vestido Midi Floral',
    preco: 199.90,
    descricao: 'Viscose leve, modelagem midi.',
    tamanhos: ['P', 'M', 'G'],
    imagemUrl: 'assets/vitrine/roupa4.jpeg',
    valorFormatado: 'R$ 199,90',
    href: '#'
  },
  {
    titulo: 'Roupa Íntima Confort',
    preco: 49.90,
    descricao: 'Microfibra macia, várias cores.',
    tamanhos: ['P', 'M', 'G'],
    imagemUrl: 'assets/vitrine/roupa4.jpeg',
    valorFormatado: 'R$ 49,90',
    href: '#'
  },
  {
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

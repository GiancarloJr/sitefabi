import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  path?: string;   // opcional se for usar routerLink
  href?: string;   // opcional se for usar <a href>
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  categories: MenuItem[] = [
    { label: 'Blusas', path: '/categoria/roupa-intima', href: '#' },
    { label: 'Calças | Shorts', path: '/categoria/camisetas', href: '#' },
    { label: 'Conjuntos', path: '/categoria/calcas', href: '#' },
    { label: 'Vestidos', path: '/categoria/vestidos', href: '#' },
    { label: 'Moda plus Size', path: '/categoria/acessorios', href: '#' },
    { label: 'Pijamas', path: '/categoria/acessorios', href: '#' },
    { label: 'Moda Praia', path: '/categoria/acessorios', href: '#' },
    { label: 'Acessórios', path: '/categoria/acessorios', href: '#' },
    { label: 'Perfumes Brand', path: '/categoria/acessorios', href: '#' },
    { label: 'Promoçoes', path: '/categoria/acessorios', href: '#' },
  ];

}

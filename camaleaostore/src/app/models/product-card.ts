export interface ProductCard {
  titulo: string;
  preco?: number;
  descricao?: string;
  tamanhos?: string[];
  imagemBase64?: string;
  imagemUrl?: string;
  valorFormatado?: string;
  href?: string;
  categoria_id?: number;
  categoria_nome?: string;
}

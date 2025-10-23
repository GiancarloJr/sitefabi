export interface ProductCard {
  id: number;
  titulo: string;
  preco?: number;
  descricao?: string;
  tamanhos?: string[];
  imagem_base64?: string;
  imagemUrl?: string;
  valorFormatado?: string;
  href?: string;
  categoria_id?: number;
  categoria_nome?: string;
  ativo?: boolean;
}
import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { CreateProductDto, StoreApiService } from 'src/app/core/services/store-api.service';
import { Category } from 'src/app/models/category';
import { ProductCard } from 'src/app/models/product-card';

type AddForm = {
  titulo: FormControl<string>;
  preco: FormControl<number | null>;
  descricao: FormControl<string>;
  tamanhosText: FormControl<string>;
  categoria_id: FormControl<number | null>;
  href: FormControl<string>;
  imagem_base64: FormControl<string | null>;
};

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatChipsModule
  ],
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  private api = inject(StoreApiService);
  private fb = inject(FormBuilder);

  saving = false;
  isEdit = false;
  private productId: number | null = null;

  form: FormGroup<AddForm> = this.fb.group<AddForm>({
    titulo: this.fb.nonNullable.control('', { validators: [Validators.required] }),
    preco: this.fb.control<number | null>(null),
    descricao: this.fb.nonNullable.control(''),
    tamanhosText: this.fb.nonNullable.control(''),
    categoria_id: this.fb.control<number | null>(null),
    href: this.fb.nonNullable.control(''),
    imagem_base64: this.fb.control<string | null>(null),
  });

  constructor(
    private ref: MatDialogRef<AddProductDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA)
    public data: { categorias: Category[]; produto: ProductCard }
  ) {}

  ngOnInit(): void {
    const p = this.data?.produto as ProductCard;
    this.isEdit = !!p;
    this.productId = p?.id ?? null;

    console.log("inicializa"+ p.descricao)

    if (p) {
      this.form.patchValue({
        titulo: p.titulo ?? '',
        preco: p.preco ?? null,
        descricao: p.descricao ?? '',
        tamanhosText: (p.tamanhos ?? []).join(', '),
        categoria_id: p.categoria_id ?? null,
        href: p.href ?? '',
        imagem_base64: p.imagem_base64 ?? null,
      });
    }
  }

  removeImage() {
    this.form.patchValue({ imagem_base64: null });
  }

  onFile(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({ imagem_base64: String(reader.result || '') });
      input.value = '';
    };
    reader.readAsDataURL(file);
  }

  save(): void {
    if (this.form.invalid || this.saving) return;

    const v = this.form.getRawValue();
    const tamanhos = (v.tamanhosText || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const body: CreateProductDto = {
      titulo: v.titulo,
      preco: v.preco ?? null,
      descricao: v.descricao || null,
      tamanhos: tamanhos.length ? tamanhos : null,
      imagem_base64: v.imagem_base64 ?? null,
      valor_formatado: null,
      href: v.href || null,
      categoria_id: v.categoria_id ?? null,
    };

    this.saving = true;

    const req$ = (this.isEdit && this.productId)
      ? this.api.updateProduto(this.productId, body) 
      : this.api.createProduto(body);              

    req$.subscribe({
      next: () => { this.saving = false; this.ref.close(true); },
      error: (err) => { console.error(this.isEdit ? 'Erro ao atualizar produto' : 'Erro ao criar produto', err); this.saving = false; }
    });
  }

  close(): void {
    this.ref.close(false);
  }
}

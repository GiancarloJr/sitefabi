import { Component, Inject, inject } from '@angular/core';
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

type AddForm = {
    titulo: FormControl<string>;
    preco: FormControl<number | null>;
    descricao: FormControl<string>;
    tamanhosText: FormControl<string>;
    categoriaId: FormControl<number | null>;
    href: FormControl<string>;
    imagemBase64: FormControl<string | null>;
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
export class AddProductDialogComponent {

    private api = inject(StoreApiService);
    private fb = inject(FormBuilder);

    saving = false;

    form: FormGroup<AddForm> = this.fb.group<AddForm>({
        titulo: this.fb.nonNullable.control('', { validators: [Validators.required] }),
        preco: this.fb.control<number | null>(null),
        descricao: this.fb.nonNullable.control(''),
        tamanhosText: this.fb.nonNullable.control(''),
        categoriaId: this.fb.control<number | null>(null),
        href: this.fb.nonNullable.control(''),
        imagemBase64: this.fb.control<string | null>(null),
    });



    constructor(
        private ref: MatDialogRef<AddProductDialogComponent, boolean>,
        @Inject(MAT_DIALOG_DATA) public data: { categorias: Category[] }
    ) { }

    removeImage() {
        this.form.patchValue({ imagemBase64: null });
    }

    onFile(ev: Event): void {
        const input = ev.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            this.form.patchValue({ imagemBase64: String(reader.result || '') });
            input.value = "";
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
            imagem_base64: v.imagemBase64 ?? null,
            valor_formatado: null, // opcional no seu backend
            href: v.href || null,
            categoria_id: v.categoriaId ?? null,
        };

        this.saving = true;
        this.api.createProduto(body).subscribe({
            next: () => { this.saving = false; this.ref.close(true); },
            error: (err) => { console.error('Erro ao criar produto', err); this.saving = false; }
        });
    }

    close(): void {
        this.ref.close(false);
    }
}

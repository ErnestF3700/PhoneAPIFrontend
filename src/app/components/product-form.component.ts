import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CreateProductModel } from '../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule],
  template: `
    <h2 class="form-title">{{ isEdit ? 'Edytuj' : 'Utwórz' }} produkt</h2>
    <form (ngSubmit)="submit()" class="form-container">
      <label>
        <span class="label-text">Nazwa:</span>
        <input [(ngModel)]="model.name" name="name" required />
      </label>
      <label>
        <span class="label-text">Cena:</span>
        <input type="number" [(ngModel)]="model.price" name="price" required />
      </label>
      <label>
        <span class="label-text">Status:</span>
        <input [(ngModel)]="model.status" type="number" name="status"  required />
      </label>
      <div class="buttons">
        <button type="submit" class="submit-btn">{{ isEdit ? 'Zapisz' : 'Utwórz' }}</button>
        <button type="button" class="cancel-btn" (click)="cancel()">Anuluj</button>
      </div>
    </form>
  `,
  styles: [
    `
      .form-title {
        font-size: 2rem;
        color: purple;
        text-align: left;
        margin-bottom: 1rem;
      }
      .form-container {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        color: purple;
      }
      .form-container label {
        display: flex;
        align-items: center;
      }
      .label-text {
        width: 80px;
        text-align: left;
        font-weight: 500;
      }
      .form-container input {
        flex: 1;
        padding: 0.4rem;
        border: 1px solid purple;
        border-radius: 3px;
      }
      .buttons {
        margin-top: 1rem;
      }
      .submit-btn,
      .cancel-btn {
        margin-right: 0.5rem;
        padding: 0.4rem 0.8rem;
        border: 1px solid purple;
        background: transparent;
        color: purple;
        border-radius: 3px;
        cursor: pointer;
      }
      .submit-btn:hover,
      .cancel-btn:hover {
        background-color: purple;
        color: white;
      }
    `
  ]
})
export class ProductFormComponent implements OnInit {
  model: CreateProductModel = { name: '', price: 0, status: 0 };
  isEdit = false;

  constructor(
    private svc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.svc.getProduct(id).subscribe(p => {
        this.model = { name: p.name, price: p.price, status: p.status };
      });
    }
  }

  submit() {
    if (this.isEdit) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.svc.updateProduct(id, this.model).subscribe(() => this.router.navigate(['/products']));
    } else {
      this.svc.createProduct(this.model).subscribe(() => this.router.navigate(['/products']));
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
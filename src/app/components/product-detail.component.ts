import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink],
  template: `
    <h2 class="detail-title">Szczegóły telefonu</h2>
    <div *ngIf="product" class="detail-container">
      <p><strong>ID:</strong> {{ product.id }}</p>
      <p><strong>Nazwa telefonu :</strong> {{ product.name }}</p>
      <p><strong>Cena telefonu:</strong> {{ product.price }}</p>
      <p><strong>Status telefonu:</strong> {{ product.status }}</p>
      <button class="back-btn" routerLink="/products">Powrót</button>
    </div>
  `,
  styles: [
    `
      .detail-title {
        font-size: 2rem;
        color: purple;
        text-align: left;
        margin-bottom: 1rem;
      }
      .detail-container p {
        text-align: left;
        color: purple;
        margin: 0.3rem 0;
      }
      .back-btn {
        margin-top: 1rem;
        padding: 0.4rem 0.8rem;
        border: 1px solid purple;
        background: transparent;
        color: purple;
        border-radius: 3px;
        cursor: pointer;
      }
      .back-btn:hover {
        background-color: purple;
        color: white;
      }
    `
  ]
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(
    private svc: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.svc.getProduct(id).subscribe(p => (this.product = p));
  }
}
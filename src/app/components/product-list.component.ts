import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  template: `
    <h2 class="title">Produkty</h2>
    <a class="add-link" routerLink="/create">+ Dodaj nowy</a>
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nazwa</th>
          <th>Cena</th>
          <th>Status</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of products">
          <td>{{ p.id }}</td>
          <td><a [routerLink]="['/products', p.id]">{{ p.name }}</a></td>
          <td>{{ p.price }}</td>
          <td>{{ p.status }}</td>
          <td class="actions">
            <a class="action-link" [routerLink]="['/edit', p.id]">Edytuj</a>
            <button class="action-btn" (click)="delete(p.id)">Usuń</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      .title {
        font-size: 2.5rem;
        color: purple;
        text-align: left;
        margin-bottom: 0.5rem;
      }
      .add-link {
        display: inline-block;
        margin-bottom: 1rem;
        color: purple;
        text-decoration: none;
        font-weight: 500;
      }
      .add-link:hover {
        text-decoration: underline;
      }
      .product-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
      }
      .product-table th,
      .product-table td {
        border: 1px solid purple;
        padding: 0.5rem 0.75rem;
        color: purple;
      }
      .product-table th {
        background-color: #f3e5f5;
        font-weight: 600;
      }
      .product-table tr:nth-child(even) {
        background-color: #faf0ff;
      }
      .actions {
        white-space: nowrap;
      }
      .action-link,
      .action-btn {
        margin-right: 0.5rem;
        padding: 0.2rem 0.5rem;
        border: 1px solid purple;
        border-radius: 3px;
        background: transparent;
        color: purple;
        font-size: 0.9rem;
        cursor: pointer;
        text-decoration: none;
      }
      .action-link:hover,
      .action-btn:hover {
        background-color: purple;
        color: white;
      }
    `
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private svc: ProductService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getProducts().subscribe(list => (this.products = list));
  }

  delete(id: number) {
    this.svc.deleteProduct(id).subscribe(() => this.load());
  }
}
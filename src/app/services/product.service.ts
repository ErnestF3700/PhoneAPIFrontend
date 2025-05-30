import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, CreateProductModel } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://localhost:7158/Products';
  private headers = new HttpHeaders({ Accept: 'text/plain' });

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.headers });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  createProduct(product: CreateProductModel): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.headers });
  }

  updateProduct(id: number, product: CreateProductModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product, { headers: this.headers });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}

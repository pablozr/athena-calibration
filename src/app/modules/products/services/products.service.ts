import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IProduct, IProductResponse, IProductSingleResponse } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  http = inject(HttpClient);
  messageService = inject(MessageService);

  private apiUrl = 'http://localhost:8000/api/v1/products';

  getProductsByName(name: string) : Promise<IProductResponse | false> {
    return new Promise((resolve, _) => {
      this.http.get<IProductResponse>(`${this.apiUrl}/name?name=${name}`).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Produtos retornados com sucesso' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao buscar produtos' });
          resolve(false);
        }
      });
    });
  }

  updateProduct(product: IProduct) : Promise<IProductSingleResponse | false> {
    return new Promise((resolve, _) => {
      this.http.put<IProductSingleResponse>(`${this.apiUrl}/${product.id}`, product).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Produto atualizado com sucesso' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao atualizar produto' });
          resolve(false);
        }
      });
    });
  }

  deleteProduct(productId: number) : Promise<IProductSingleResponse | false> {
    return new Promise((resolve, _) => {
      this.http.delete<IProductSingleResponse>(`${this.apiUrl}/${productId}`).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Produto deletado com sucesso' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao deletar produto' });
          resolve(false);
        }
      });
    });
  }

  addProduct(product: IProduct) : Promise<IProductSingleResponse | false> {
    return new Promise((resolve, _) => {
      this.http.post<IProductSingleResponse>(this.apiUrl, product).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Produto adicionado com sucesso' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao adicionar produto' });
          resolve(false);
        }
      });
    });
  }

  getProducts() : Promise<IProductResponse | false> {
    return new Promise((resolve, _) => {
      this.http.get<IProductResponse>(this.apiUrl).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Produtos retornados com sucesso' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao buscar produtos' });
          resolve(false);
        }
      });
    });
  }
  getProductsByCategory(category: string) : Promise<IProductResponse | false> {
    return new Promise((resolve, _) => {
      this.http.get<IProductResponse>(`${this.apiUrl}?category=${category}`).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Produtos retornados com sucesso' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao buscar produtos' });
          resolve(false);
        }
      });
    });
  }

  getProductsByPriceRange(minPrice: number, maxPrice: number) : Promise<IProductResponse | false> {
    return new Promise((resolve, _) => {
      this.http.get<IProductResponse>(`${this.apiUrl}/price-range?min_price=${minPrice}&max_price=${maxPrice}`).subscribe({ 
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Produtos retornados com sucesso' });
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao buscar produtos' });
          resolve(false);
        }
      });
    });
  }
}

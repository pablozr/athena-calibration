import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../../../global/components/header/header';
import { Loading } from '../../../global/components/loading/loading';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { IProduct } from '../../interfaces/IProduct';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-dashboard',
  imports: [Header, Loading, CardModule, TableModule, ButtonModule, DialogModule, InputTextModule, FormsModule, CurrencyPipe, SliderModule, CommonModule, SelectModule, IconFieldModule, InputIconModule, DialogModule, InputNumberModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  productsService = inject(ProductsService);

  isLoading: boolean = false;
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;
  products: IProduct[] = [];
  private nameSearch$ = new Subject<string>();
  private priceRangeSearch$ = new Subject<number[]>();
  searchInput: string = '';
  priceRange: number[] = [0, 1000];
  categories: string[] = ['Eletronicos', 'Livros', 'Roupas', 'Casa', 'Esportes'];
  selectedCategory: string = '';
  newProduct: IProduct = { name: '', category: '', price: 0, description: '' , in_stock: true};
  updatedProduct: IProduct = { name: '', category: '', price: 0, description: '' , in_stock: true};

  ngOnInit() {
    this.nameSearch$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.filterByName();
    })
    this.priceRangeSearch$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.filterByPrice();
    });
    this.getProducts();
    this.isLoading = false;
  }

  onSearchInputChange() {
    this.nameSearch$.next(this.searchInput);
  }

  showAddProductDialog() {
    this.displayAddDialog = true;
  }

  showEditProductDialog(product: IProduct) {
    this.updatedProduct = { ...product };
    this.displayEditDialog = true;
  }

  onSearchPriceRangeChange() {
    this.priceRangeSearch$.next(this.priceRange);
  }

  async deleteProduct(productId: number) {
    this.isLoading = true;

    const response = await this.productsService.deleteProduct(productId);

    if(response && response.data) {
      this.products = this.products.filter(prod => prod.id !== productId);
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }
  }

  async updateProduct() {
    this.isLoading = true;

    const response = await this.productsService.updateProduct(this.updatedProduct);

    if(response && response.data) {
      this.products = this.products.map(prod => prod.id === response.data.id ? response.data : prod);
      this.isLoading = false;
      this.displayEditDialog = false;
      this.updatedProduct = { name: '', category: '', price: 0, description: '' , in_stock: true};
    } else {
      this.isLoading = false;
    }
  }

  async addProduct() {
    this.isLoading = true;

    const response = await this.productsService.addProduct(this.newProduct);

    if(response && response.data) {
      this.products = [response.data, ...this.products];
      this.isLoading = false;
      this.displayAddDialog = false;
      this.newProduct = { name: '', category: '', price: 0, description: '' , in_stock: true};
    } else {
      this.isLoading = false;
    }
  }

  async filterByCategory() {
    this.isLoading = true;

    const response = await this.productsService.getProductsByCategory(this.selectedCategory);

    if(response && response.data) {
      this.products = response.data;
      this.isLoading = false;
    } else {
      this.isLoading = false;
      this.products = [];
    }
  }

  async filterByPrice() {
    this.isLoading = true;
    const [minPrice, maxPrice] = this.priceRange;

    const response = await this.productsService.getProductsByPriceRange(minPrice, maxPrice);

    if(response && response.data) {
      this.products = response.data;
      this.isLoading = false;
    } else {
      this.isLoading = false;
      this.products = [];
    }
  }

  async filterByName() {
    this.isLoading = true;
  
    const response = await this.productsService.getProductsByName(this.searchInput);

    if(response && response.data) {
      this.products = response.data;
      this.isLoading = false;
    } else {
      this.isLoading = false;
      this.products = [];
    }
  }

  async getProducts() {
    this.isLoading = true;

    const response = await this.productsService.getProducts();

    if(response && response.data) {
      this.products = response.data;
      this.isLoading = false;
    } else {
      this.isLoading = false;
      this.products = [];
    }
  }
}

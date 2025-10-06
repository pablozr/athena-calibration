import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TransactionService } from '../../services/transactions.service';
import { ITransactions } from '../../interfaces/ITransactions';
import { DatePickerModule } from 'primeng/datepicker';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { Header } from '../../../global/components/header/header';
import { Loading } from '../../../global/components/loading/loading';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CardModule, ButtonModule, DatePickerModule, FormsModule, TableModule, CommonModule, Header, DialogModule, InputTextModule, InputNumberModule, Loading, SelectModule, TagModule,  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionComponent {
  transactionService: TransactionService = inject(TransactionService);
 
  mesAnoSelecionado: Date = new Date();
  displayAddModal: boolean = false;
  displayEditModal: boolean = false;
  searchInput: string = '';
  updatedTransaction: Partial<ITransactions> = {};
  newTransaction: Partial<ITransactions> = {};
  transactions: ITransactions[] = [];
  categories: any[] = [];
  balance: number = 0;
  isLoading = true;
  searchSubject = new Subject<string>();
  searchSubscription: Subscription = new Subscription();
  transactionTypes = [
    { label: 'Receita', value: 'income'},
    { label: 'Despesa', value: 'expense'}
  ]

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.loadTransactions();
    })
    this.loadTransactions()
    this.getCategories()

    this.isLoading = false;
  }

  onSearchChange(): void{
    this.searchSubject.next(this.searchInput);
  }

  openEditModal(transaction:ITransactions){
    this.updatedTransaction = { ...transaction };
    this.displayEditModal = true;
  }

  async updateTransaction(){

    this.isLoading = true;

    if (!this.updatedTransaction || typeof this.updatedTransaction.id !== 'number') {
      this.isLoading = false;
    }

    const response = await this.transactionService.updateTransaction(this.updatedTransaction as ITransactions)

    if(response && response.data){
        const index = this.transactions.findIndex(t => t.id === response.data.id);
        if(index !== -1){
          this.transactions[index] = response.data;
          this.displayEditModal = false;
          this.updatedTransaction = {};
          this.loadBalance()
          this.isLoading = false;
        }
      }
  }

  async loadBalance(){

    this.isLoading = true;

    const response = await this.transactionService.getBalance(this.mesAnoSelecionado);

    if(response && typeof(response) === 'object'){
      this.balance = Number(response.data ?? 0)
      this.isLoading = false;
    } else{
      this.balance = 0;
    }
  }

  async deleteTransaction(transaction:ITransactions){

    this.isLoading = true;
    const response = await this.transactionService.deleteTransaction(transaction);

    if (response){
      this.transactions = this.transactions.filter((data: ITransactions) => data.id != transaction.id);
      this.loadBalance();
      this.isLoading = false;
    }
  }

  async loadTransactions(){

    this.isLoading = true;
    const response = await this.transactionService.getTransactions(this.mesAnoSelecionado, this.searchInput);

     if(response && typeof(response) === 'object'){
        this.transactions = response.data
        this.loadBalance()
        this.isLoading = false;
      }else{
        this.loadBalance()
        this.transactions = []
      }
  }

  async getCategories(){

    const response = await this.transactionService.getCategories();

    if(response && typeof(response) === 'object'){
      this.categories = response.data
    }  
  }

  async addTransaction(){

    if (!this.newTransaction || typeof this.newTransaction.id !== 'number') {
      this.isLoading = false;
    }

    const response = await this.transactionService.addTransaction(this.newTransaction as ITransactions);

    if(response && typeof(response) === 'object'){
        this.transactions = [response.data,...this.transactions]
        this.displayAddModal = false
        this.newTransaction ={}
        this.loadBalance()
      }
  }

  showAddModalDialog() {
    this.displayAddModal = true;
  }

  getTypeLabel(value: string): string {
    const foundType = this.transactionTypes.find(type => type.value === value);
    return foundType ? foundType.label : value;
  }

}

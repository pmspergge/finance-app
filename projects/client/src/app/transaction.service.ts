import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Transaction {
  description: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsSubject: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);
  
  get transactions$(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  addTransaction(transaction: Transaction): void {
    const transactions = this.transactionsSubject.value;
    this.transactionsSubject.next([...transactions, transaction]);
  }
}

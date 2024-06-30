import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TransactionService } from '../transaction.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value);
      this.transactionForm.reset();
    }
  }
}

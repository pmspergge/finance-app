import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, colorSets, Color, ScaleType } from '@swimlane/ngx-charts';
import { TransactionService } from '../transaction.service';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  data: ChartData[] = [];
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Category';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';
  colorScheme: Color = colorSets.find(s => s.name === 'vivid') || {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(transactions => {
      const summary = transactions.reduce((acc, transaction) => {
        const existingCategory = acc.find(item => item.name === transaction.description);
        if (existingCategory) {
          existingCategory.value += transaction.amount;
        } else {
          acc.push({ name: transaction.description, value: transaction.amount });
        }
        return acc;
      }, [] as ChartData[]);
      this.data = summary;
    });
  }

  onSelect(event: any) {
    console.log(event);
  }
}

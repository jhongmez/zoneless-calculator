import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorComponent } from '@/calculator/components/calculator/calculator-component';

@Component({
  selector: 'app-calculator-view',
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorView {}

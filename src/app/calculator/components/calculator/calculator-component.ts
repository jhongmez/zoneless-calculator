import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {

	handleClick(key: string) {
		console.log({key});
	}

}

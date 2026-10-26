import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
	'(document: keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

	private calculatorService = inject(CalculatorService);
	calculatorButtons = viewChildren(CalculatorButton);

	resultText = computed( () => this.calculatorService.resultText() )
	subResultText = computed( () => this.calculatorService.subResultText() )
	lastOperator = computed( () => this.calculatorService.lastOperator() )

	handleClick(key: string) {
		console.log({key});
	}

	handleKeyboardEvent( event: KeyboardEvent ) {

		const keyEquivalents: Record<string, string> = {
			Escape: 'C',
			Clear: 'C',
			Delete: 'C',
			Backspace: 'C',
			Enter: '=',
			'*': 'x',
			'/': '%',
		};

		const key = event.key;
		const keyValue = keyEquivalents[key] ?? key;

		this.handleClick(keyValue);

		this.calculatorButtons().forEach( (button) => {
			button.keyboardPressedStyle(keyValue);
		})
	}

}

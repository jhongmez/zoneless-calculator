import { ChangeDetectionStrategy, Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';

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

	calculatorButtons = viewChildren(CalculatorButton);

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

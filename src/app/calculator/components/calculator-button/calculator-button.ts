import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  styleUrl: './calculator-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
	class: 'w-1/4 border-r border-b border-indigo-400'
  }
})
export class CalculatorButton {
	isCommand = input( false, {
		transform: ( value: boolean | string ) => typeof value === 'string' ? value === '' : value,
	});

	@HostBinding('class.is-command') get commandStyle() {
		return this.isCommand();
	}
}

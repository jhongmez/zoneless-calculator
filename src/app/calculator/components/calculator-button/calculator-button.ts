import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, viewChild } from '@angular/core';

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

	onClick = output<string>();
	contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

	isCommand = input( false, {
		transform: ( value: boolean | string ) => typeof value === 'string' ? value === '' : value,
	});

	isDoubleSize = input( false, {
		transform: ( value: boolean | string ) => typeof value === 'string' ? value === '' : value,
	});

	// @HostBinding('class.is-command') get commandStyle() {
	// 	return this.isCommand();
	// }

	@HostBinding('class.w-2/4') get commandStyle() {
		return this.isDoubleSize();
	}

	handleClick() {
		if ( !this.contentValue()?.nativeElement ) return;
		const value =  this.contentValue()!.nativeElement.innerText;
		this.onClick.emit( value.trim() );
	}
}

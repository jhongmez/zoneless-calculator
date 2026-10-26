import { Injectable, signal } from '@angular/core';

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['+','-','*','/'];
const especialOperators = [
	'%',
	'+/-',
	'.',
	'=',
	'C',
	'Backspace'
]

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {

	resultText 		= signal('0');
	subResultText 	= signal('0');
	lastOperator 	= signal('+');

	constructorNumber( value: string ): void {
		if ( ![...numbers, ...operators, ...especialOperators ].includes(value) ) {
			console.log(`Invalid input, ${value}`);
		}

		if ( value === '=' ) {
			this.calculateResult();
			return
		}

		// Clean results
		if ( value === 'C' ) {
			this.resultText.set('0');
			this.subResultText.set('0');
			this.lastOperator.set('+');
			return;
		}

		// TODO: Review negative numbers
		if ( value === 'Backspace' ) {
			if ( this.resultText() === '0' ) return;
			if ( this.resultText().includes('-') && this.resultText().length === 2) {
				this.resultText.set('0');
				return;
			}
			if ( this.resultText().length === 1 ) {
				this.resultText.set('0')
				return;
			}

			this.resultText.update( (currentValue) => currentValue.slice(0, -1) );
			return;
		}

		// Apply operator
		if ( operators.includes(value) ) {
			this.calculateResult();

			this.lastOperator.set(value);
			this.subResultText.set( this.resultText() );
			this.resultText.set('0');
			return;
		}

		// Limit characters
		if ( this.resultText.length >= 8 ) {
			console.log(`Max length reached`);
			return;
		}

		if ( value === '.' && !this.resultText().includes('.') ) {
			if ( this.resultText() === '0' || this.resultText() === '' ) {
				this.resultText.set('0.');
				return;
			}
			this.resultText.update( text => text + '.');
			return;
		}

		// Handle initial cero
		if ( value === '0' && (this.resultText() == '0' || this.resultText() === '-0') ) return;

		// Symbol change
		if( value === '+/-' ) {
			if ( this.resultText().includes('-') ) {
				this.resultText.update( text => text.slice(1) );
				return;
			}

			this.resultText.update( text => '-' + text );
			return;
		}

		if ( numbers.includes(value) ) {
			if ( this.resultText() === '0' ) {
				this.resultText.set(value);
				return;
			}

			if (this.resultText() === '-0') {
				this.resultText.set('-' + value);
				return;
			}

			this.resultText.update((text) => text + value);
			return;
		}


	}

	calculateResult() {
		const number1 = parseFloat( this.subResultText() );
		const number2 = parseFloat( this.resultText() );

		let result = 0;
		switch ( this.lastOperator() ) {
			case '+':
				result = number1 + number2;
				break;
			case '-':
				result = number1 - number2;
				break;
			case '*':
				result = number1 * number2;
				break;
			case '/':
				result = number1 / number2;
				break;
			default:
				break;
		}

		this.resultText.set(result.toString());
		this.subResultText.set('0');
		this.lastOperator.set('+');
	}

}

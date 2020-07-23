import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const EMAIL_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CustomControlComponent),
	multi: true
}

@Component({
	selector: 'app-custom-control',
	providers: [EMAIL_CONTROL_ACCESSOR],
	templateUrl: './custom-control.component.html',
	styleUrls: ['./custom-control.component.scss']
})
export class CustomControlComponent implements ControlValueAccessor {

	public isDisabled = false;
	public value: number;

	private onTouch: Function;
	private onModelChange: Function;

	registerOnTouched(fn) {
		this.onTouch = fn;
	};
	registerOnChange(fn) {
		this.onModelChange = fn;
	};

	writeValue(value) {
		this.value = value;
	};

	setDisabledState(isDisabled: boolean) {
		this.isDisabled = isDisabled;
	}

	public add(): void {
		this.value++;
		this.onModelChange(this.value);
		// tell the formControl that our component has been interacted with
		this.onTouch();
	}
	
	public minus(): void {
		this.value--;
		this.onModelChange(this.value);
		// tell the formControl that our component has been interacted with
		this.onTouch();
	}

}

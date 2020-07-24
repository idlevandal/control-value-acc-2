import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// extend the ng value accessor (with custom provider)
// provide == gain access to existing value accessor
// useExisting == pass our component
// forwardRef == hoist/ wait for omponent to become available
// multi: true == means we are extending NG_VALUE_ACCESSOR with our component
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

	// bind to functions that angular reactive forms are exposing and assign to internal function
	registerOnTouched(fn) {
		// notify formControl that it has been interacted with
		this.onTouch = fn;
	};
	registerOnChange(fn) {
		// used to update the form model when values propagate from the view to the model.
		this.onModelChange = fn;
	};

	// receive the value from formControl that is bound to CustomControlComponent
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

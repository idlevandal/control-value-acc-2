import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public buttonText: string = 'disable age';

	constructor(private fb: FormBuilder) {}
  
	public myForm = this.fb.group({
		name: '',
		email: '',
		age: [0, Validators.min(0)],
	})

	public disableEmail(): void {
		if (this.buttonText === 'disable age') {
			this.buttonText = 'enable age';
			this.myForm.get('age').disable();
		} else {
			this.buttonText = 'disable age'
			this.myForm.get('age').enable();
		}
	}
}

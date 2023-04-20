import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-validation-button',
  templateUrl: './validation-button.component.html',
  styleUrls: ['./validation-button.component.css']
})
export class ValidationButtonComponent {

  @Input()
  label!: string;
  @Input()
  disabled?: boolean;
  constructor() {}

}

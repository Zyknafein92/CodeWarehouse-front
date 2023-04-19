import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.css']
})
export class AccountButtonComponent {
  @Input()
  label!: string;
  @Input()
  color?: string
  @Input()
  textColor?: string;
}

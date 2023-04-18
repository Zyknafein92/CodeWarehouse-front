import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-little-button',
  templateUrl: './little-button.component.html',
  styleUrls: ['./little-button.component.css']
})
export class LittleButtonComponent {
  @Input()
  label!: string;
  @Input()
  radius?: string;
  @Input()
  color?: string
  @Input()
  textColor?: string;
}

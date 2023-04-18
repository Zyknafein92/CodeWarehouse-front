import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit{

  forms!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.forms = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
        password2: ['', Validators.required]
      }
    )
  }
}

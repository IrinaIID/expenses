import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent implements OnInit{

  
  userFormCreateAccount!: FormGroup;
  isValid: boolean = false;

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {

    this.userFormCreateAccount = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
    
  }
  
  validateForm() {
    if (this.userFormCreateAccount.valid) {
      this.isValid = true
    } else {
      this.isValid = false
    }
  }

  submitForm() {
    console.log(this.userFormCreateAccount.value)
  }


}

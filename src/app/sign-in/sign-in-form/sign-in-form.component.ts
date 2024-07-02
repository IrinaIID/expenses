import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  userFormSignIn!: FormGroup;
  isValid = false;

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.userFormSignIn = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  validateForm() {
    if (this.userFormSignIn.valid) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  submitForm() {
    console.log(this.userFormSignIn.value);
  }
}

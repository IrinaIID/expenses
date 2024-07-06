import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
})
export class CreateAccountFormComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  userForm!: FormGroup;
  isValid = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  validateForm() {
    if (this.userForm.valid) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  submitForm() {
    if (this.isValid) {
      const rawForm = this.userForm.getRawValue();
      this.authService
        .register(rawForm.name, rawForm.email, rawForm.password)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            this.errorMessage = err.code;
          }
        }
    )
    }
  }
}

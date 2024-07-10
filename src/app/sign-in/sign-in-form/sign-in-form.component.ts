import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  userFormSignIn!: FormGroup;
  isValid = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.userFormSignIn = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  validateForm(): void {
    if (this.userFormSignIn.valid) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  submitForm(): void {
    if (this.isValid) {
      const rawForm = this.userFormSignIn.getRawValue();
      this.authService.login(rawForm.email, rawForm.password).subscribe({
        next: () => {
          this.router.navigateByUrl('balance');
        },
        error: (err) => {
          this.errorMessage = err.code.toString().slice(5).replaceAll('-', ' ');
        },
      });
    }
  }
}

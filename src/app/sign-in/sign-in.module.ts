import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';

@NgModule({
  declarations: [SignInComponent, SignInFormComponent, CreateAccountFormComponent],
  imports: [CommonModule, SignInRoutingModule, ReactiveFormsModule],
  exports: [SignInComponent],
})
export class SignInModule {}

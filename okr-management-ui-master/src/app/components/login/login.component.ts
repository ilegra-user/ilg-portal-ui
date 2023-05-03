import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  error = '';
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }
  email = new UntypedFormControl('', [Validators.required, Validators.email]);

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    localStorage.setItem('username', this.f.username.value);

    this.loading = true;
    this.authenticationService
      .login(
        this.f.username.value,
        this.f.password.value,
        this.f.rememberMe.value
      )
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          if (!this.authenticationService.currentUserValue.token) {
            this.error = 'Ops! Usuário ou senha inválidos.';
          } else {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
          }
        },
        error: () => {
          this.loading = false;
        },
      });
  }
}

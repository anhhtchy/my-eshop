import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    public authenService: AuthenService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm?.invalid) {
      return;
    }

    this.loading = true;
    this.authenService.login(
      this.loginForm?.controls['username'].value,
      this.loginForm?.controls['password'].value,
    ).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (error: any) => {
        this.error = error.error.message;
        this.loading = false;
      }
    })
  }

}

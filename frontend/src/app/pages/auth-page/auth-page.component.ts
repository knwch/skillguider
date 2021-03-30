import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Signin } from '../../auth/auth.action';
import { MessageService } from 'primeng/api';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthState } from '../../auth/auth.state';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  providers: [MessageService],
})
export class AuthPageComponent implements OnInit {
  @Select(AuthState.isAuthenticated)
  isAuthenticated: any;

  authForm!: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isAuthenticated.subscribe((data: any) => {
      if (data) {
        this.router.navigate(['/admin']);
      }
    });

    this.authForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async onSubmit(form: any): Promise<void> {
    form.controls.username.markAsDirty();
    form.controls.password.markAsDirty();

    if (form.valid) {
      await this.store
        .dispatch(new Signin(form.value))
        .pipe(
          map((res) => {
            this.router.navigate(['/admin']);
          }),
          catchError(async (error) =>
            this.messageService.add({
              severity: 'error',
              summary: `${error.status}`,
              detail: `${error.error.message}`,
            })
          )
        )
        .toPromise();
    }
  }
}

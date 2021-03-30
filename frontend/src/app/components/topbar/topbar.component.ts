import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { AuthState } from '../../auth/auth.state';
import { Signout } from '../../auth/auth.action';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Select(AuthState.isAuthenticated)
  isAuthenticated: any;

  items: MenuItem[] = [];

  constructor(private store: Store, private router: Router) {}

  async ngOnInit(): Promise<any> {
    this.items = [
      {
        label: 'Home',
        routerLink: '/',
      },
    ];
  }

  signout(): void {
    this.store.dispatch(new Signout()).subscribe(() => {
      this.router.navigate(['/auth']);
    });
  }
}

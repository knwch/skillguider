import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
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

  href: any;

  constructor(
    private store: Store,
    private router: Router,
    private location: Location
  ) {}

  async ngOnInit(): Promise<any> {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.href = event.url;
      }
    });

    this.items = [
      {
        label: 'Home',
        routerLink: '/',
      },
    ];
  }

  startAppRoute(): void {
    this.router.navigate(['/category']);
  }

  goBack(): void {
    this.location.back();
  }

  signout(): void {
    this.store.dispatch(new Signout()).subscribe(() => {
      this.router.navigate(['/auth']);
    });
  }
}

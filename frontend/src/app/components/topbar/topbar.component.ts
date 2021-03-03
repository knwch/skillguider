import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass'],
})
export class TopbarComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): any {
    this.items = [
      {
        label: 'Dashboard',
        routerLink: '/dashboard',
      },
      // {
      //   icon: 'pi pi-fw pi-user',
      //   items: [
      //     {
      //       label: 'Profile',
      //       icon: 'my-margin-left pi pi-fw pi-user',
      //     },
      //     {
      //       label: 'Logout',
      //       styleClass: 'p-ml-6',
      //       icon: 'my-margin-left pi pi-fw pi-sign-out',
      //     },
      //   ],
      // },
    ];
  }
}

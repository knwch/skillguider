import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  items!: any[];

  activeItem!: any;

  constructor(private store: Store) {}

  async ngOnInit(): Promise<void> {
    this.items = [
      {
        key: 'category',
        label: 'Category',
        command: (event: any) => {
          this.onChangeTab(event.item);
        },
      },
      {
        key: 'job',
        label: 'Job',
        command: (event: any) => {
          this.onChangeTab(event.item);
        },
      },
      {
        key: 'skill',
        label: 'Skill',
        command: (event: any) => {
          this.onChangeTab(event.item);
        },
      },
    ];

    this.activeItem = this.items[0];
  }

  async onChangeTab(item: any): Promise<void> {
    this.activeItem = item;
  }
}

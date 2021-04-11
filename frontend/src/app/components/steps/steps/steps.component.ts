import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  items: any;

  activeIndex = 0;

  href: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.href = event.url;

        if (event.url.includes('/category')) {
          this.activeIndex = 0;
        }

        if (event.url.includes('/myskill?job=')) {
          this.activeIndex = 1;
        }

        if (event.url.includes('/result?job=')) {
          this.activeIndex = 2;
        }

        if (event.url.includes('/learn?skill=')) {
          this.activeIndex = 3;
        }
      }
    });

    this.items = [
      {
        label: 'เลือกอาชีพ',
      },
      {
        label: 'สำรวจตัวเอง',
      },
      {
        label: 'สกิลที่ควรพัฒนา',
      },
      {
        label: 'แหล่งเรียนรู้',
      },
    ];
  }
}

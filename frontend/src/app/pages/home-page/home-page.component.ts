import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var particlesJS: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', () => {
      console.log('callback - particles.js config loaded');
    });
  }

  startAppRoute(): void {
    this.router.navigate(['/category']);
  }
}

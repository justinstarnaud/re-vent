import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() floating: boolean;
  @Input() active: string;
  constructor(private router: Router) {
    this.floating = false;
    this.active = '';
  }

  ngOnInit(): void {}

  navigateTo(queryParams: string) {
    this.router.navigate(['/products'], {
      queryParams: {
        category: queryParams,
      },
    });
  }
}

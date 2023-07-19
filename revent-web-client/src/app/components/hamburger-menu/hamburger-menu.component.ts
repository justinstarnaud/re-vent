import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {

  opened: boolean;
  constructor() { 
    this.opened = false;
  }

  ngOnInit(): void {
    this.opened = false;
  }

  toggleOpen() {
    this.opened = !this.opened;
  }

}

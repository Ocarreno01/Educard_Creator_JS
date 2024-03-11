import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.css"],
})
export class MenuBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}

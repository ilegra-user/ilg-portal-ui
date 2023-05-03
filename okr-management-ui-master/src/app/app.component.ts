import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUser: User;

  get username() {
    return localStorage.getItem('username');
  }

  get displayName() {
    return this.username?.replace(/\./g, ' ');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    const header = document.querySelector('mat-toolbar') as HTMLElement;
    const aside = document.getElementById('aside-menu') as HTMLElement;
    if (window.pageYOffset > header.clientHeight - 64) {
      header?.classList.add('fixed');
      aside?.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
      aside.classList.remove('fixed');
    }
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  logout() {
    localStorage.removeItem('username');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

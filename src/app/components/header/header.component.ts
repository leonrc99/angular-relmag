import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;
  userInfo: any;
  userName: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getLoggedUser();
  }

  initializeDropdown(): void {
    const dropdownButton = document.querySelector('#dropdownNavbarLink');
    const dropdownMenu = document.querySelector('#dropdownNavbar');
  
    if (dropdownButton && dropdownMenu) {
      dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
      });
    } else {
      console.error('Dropdown elements not found');
    }
  }

  reloadComponent() {
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  getLoggedUser(): boolean {
    this.userInfo = this.authService.decodeToken();

    if (this.userInfo !== null) {
      this.userName = this.userInfo.name;
      return (this.isUserLogged = true);
    } else {
      return (this.isUserLogged = false);
    }
  }

  goToPage(path: string) {
    this.router.navigate([path]).then(() => {
      this.getLoggedUser();
    });
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    location.reload();
  }
}

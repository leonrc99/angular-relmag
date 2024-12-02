import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  isUserLogged: boolean = false
  userInfo: any
  userName: any

  constructor(private authService: AuthService, private router: Router){
    this.getLoggedUser();
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
    this.router.navigate([path]);
  }

  public logout(): void {
    this.authService.logout();    
    this.router.navigate(['/']);
    location.reload();
  }
}

import { Component } from '@angular/core';
import { AuthService } from './core/application/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'angular_expert';
  constructor(private authService: AuthService, private router: Router) {}

  
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}

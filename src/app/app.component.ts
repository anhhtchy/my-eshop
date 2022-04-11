import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthStateService } from './services/auth-state.service';
import { AuthenService } from './services/authen.service';
import { ItemsStateService } from './services/items-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User|null = null;
  
  constructor(
    public itemsState: ItemsStateService,
    public authenService: AuthenService,
    private router: Router,
    public authState: AuthStateService
  ) {
    this.authState.user$.subscribe(x => this.user = x);
  }

  logout(e: Event) {
    e.preventDefault();
    const currentUser = this.authState.user;
    this.authenService.logout(currentUser?.refreshToken || '');
    this.router.navigate(['/login']);
  }

}

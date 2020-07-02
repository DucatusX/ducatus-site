import { Injectable } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { Observable } from 'rxjs';
import { Resolve, Router } from '@angular/router';

@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  private continue(observer) {
    observer.next();
    observer.complete();
  }

  resolve() {
    return new Observable((observer) => {
      const subscription = this.userService.getCurrentUser(true, true).subscribe((user) => {
        !user.is_ghost ? this.continue(observer) : this.router.navigate(['/admin/login']);
        subscription.unsubscribe();
      });
      return {
        unsubscribe() { }
      };
    });
  }
}

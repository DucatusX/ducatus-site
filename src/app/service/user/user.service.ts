import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { URLS } from './user.service.api';
import {
  AuthUserInterface,
  UserInterface,
} from './user.interface';
import { DEFAULT_USER } from './user.constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userObserves;
  private userModel: UserInterface;
  private updateProgress: boolean;

  constructor(private httpService: HttpService) {
    this.userObserves = [];
  }

  private callSubscribers() {
    this.userObserves.forEach((userObserve) => {
      userObserve.next(this.userModel);
      this.userModel.isLogout = undefined;
    });
  }

  public updateUser(afterLogout?: boolean) {
    if (this.updateProgress) {
      return;
    }
    this.updateProgress = true;
    return this.getProfile()
      .then(
        (result) => {
          this.userModel = result;
          this.updateProgress = false;
        },
        (error) => {
          this.userModel = DEFAULT_USER;
          this.userModel.isLogout = afterLogout;
          this.updateProgress = false;
        }
      )
      .finally(() => {
        this.callSubscribers();
      });
  }

  public getCurrentUser(
    withRequest?: boolean,
    checkNow?: boolean
  ): Observable<any> {
    return new Observable((observer) => {
      this.userObserves.push(observer);

      if (withRequest) {
        this.updateUser();
      }

      if (checkNow && !this.updateProgress) {
        setTimeout(() => {
          observer.next(this.userModel);
        });
      }

      const th = this;

      return {
        unsubscribe() {
          th.userObserves = th.userObserves.filter((subscriber) => {
            return subscriber !== observer;
          });
        },
      };
    });
  }

  private getProfile(): Promise<any> {
    return this.httpService.get(URLS.PROFILE, null, URLS.HOSTS.AUTH_PATH).toPromise();
  }

  public authenticate(
    data: AuthUserInterface
  ): Promise<any> {
    data.username = data.username ? data.username.toLowerCase() : data.username;
    return new Promise((resolve, reject) => {
      this.httpService
        .post(URLS.LOGIN, data, URLS.HOSTS.AUTH_PATH)
        .toPromise()
        .then((response) => {
          this.updateUser();
          resolve(response);
        }, reject);
    });
  }

  public logout() {
    return this.httpService
      .get(URLS.LOGOUT, {}, URLS.HOSTS.AUTH_PATH)
      .toPromise()
      .then(() => {
        this.userModel = DEFAULT_USER;
        this.updateUser(true);
      });
  }
}

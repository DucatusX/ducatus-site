import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { AuthUserInterface, UserInterface } from './user.interface';
import { DEFAULT_USER } from './user.constant';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userObserves;
  private userModel: UserInterface;
  private updateProgress: boolean;


  constructor(private httpService: HttpService, private http: HttpClient) {
    this.userObserves = [];
  }

  private callSubscribers(): void {
    this.userObserves.forEach((userObserve) => {
      userObserve.next(this.userModel);
      this.userModel.isLogout = undefined;
    });
  }

  public updateUser( afterLogout?: boolean): any {
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

  public getCurrentUser(withRequest?: boolean, checkNow?: boolean): Observable<any> {
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
        unsubscribe(): any {
          th.userObserves = th.userObserves.filter((subscriber) => {
            return subscriber !== observer;
          });
        },
      };
    });
  }

  private getProfile(): Promise<any> {
    return this.http.get( environment.api + 'rest-auth/user/'
    , { headers: {Authorization: `Token ${localStorage.getItem('token')}`}})
    .toPromise();
  }

  public authenticate(data: AuthUserInterface): Promise<any> {
    data.username = data.username ? data.username.toLowerCase() : data.username;
    return new Promise((resolve, reject) => {
      this.http
        .post( environment.api + 'rest-auth/login/', data)
        .toPromise()
        .then((response: any) => {
          localStorage.setItem('token', response.key);
          this.updateUser();
          resolve(response);
        }, reject);
    });
  }

  public logout(): any {
    return this.http
      .post( environment.api + 'rest-auth/logout/',
      { headers: {Authorization: `Token ${localStorage.getItem('token')}`}})
      .toPromise()
      .then(() => {
        localStorage.removeItem('token');
        this.userModel = DEFAULT_USER;
        this.updateUser(true);
      });
  }
}

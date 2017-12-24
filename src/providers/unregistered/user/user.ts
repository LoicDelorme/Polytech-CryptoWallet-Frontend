import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../model/user';
import { Token } from '../../../model/token';
import { Response } from '../../../model/response';

@Injectable()
export class UnregisteredUserProvider {

  public static readonly subscribePath: string = "cryptowallet/unregistered/user/subscribe";
  public static readonly authenticatePath: string = "cryptowallet/unregistered/user/authenticate";

  constructor(private http: HttpClient) {
  }

  public subscribe(user: User): Observable<Response<User>> {
    return this.http.post<Response<User>>(UnregisteredUserProvider.subscribePath, user);
  }

  public authenticate(email: string, password: string): Observable<Response<Token>> {
    return this.http.post<Response<Token>>(UnregisteredUserProvider.authenticatePath, { "email" : email, "password" : password});
  }
}
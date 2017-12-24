import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../model/user';
import { Token } from '../../model/token';
import { Response } from '../../model/response';

@Injectable()
export class UserProvider {

  public static readonly subscribePath: string = "cryptowallet/unregistered/user/subscribe";
  public static readonly authenticatePath: string = "cryptowallet/unregistered/user/authenticate";
  public static readonly getPath: string = "cryptowallet/registered/TOKEN/user/USER_ID";
  public static readonly updatePath: string = "cryptowallet/registered/TOKEN/user/USER_ID";
  public static readonly deletePath: string = "cryptowallet/registered/TOKEN/user/USER_ID";

  constructor(private http: HttpClient) {
  }

  public subscribe(user: User): Observable<Response<User>> {
    return this.http.post<Response<User>>(UserProvider.subscribePath, user);
  }

  public authenticate(email: string, password: string): Observable<Response<Token>> {
    return this.http.post<Response<Token>>(UserProvider.authenticatePath, { "email" : email, "password" : password});
  }

  public get(token: string, userId: number): Observable<Response<User>> {
    return this.http.get<Response<User>>(UserProvider.getPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public update(token: string, user: User): Observable<Response<User>> {
    return this.http.put<Response<User>>(UserProvider.getPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()), user);
  }

  public delete(token: string, user: User): Observable<Response<User>> {
    return this.http.delete<Response<User>>(UserProvider.getPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }
}
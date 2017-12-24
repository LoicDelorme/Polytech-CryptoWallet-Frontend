import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../../model/user';
import { Response } from '../../../model/response';

@Injectable()
export class AdministratorUserProvider {

  public static readonly allUsersPath: string = "cryptowallet/administrator/TOKEN/user";
  public static readonly getUserPath: string = "cryptowallet/administrator/TOKEN/user/USER_ID";
  public static readonly insertUserPath: string = "cryptowallet/administrator/TOKEN/user";
  public static readonly updateUserPath: string = "cryptowallet/administrator/TOKEN/user/USER_ID";
  public static readonly deleteUserPath: string = "cryptowallet/administrator/TOKEN/user/USER_ID";

  constructor(private http: HttpClient) {
  }

  public allUsers(token: string): Observable<Response<Array<User>>> {
    return this.http.get<Response<Array<User>>>(AdministratorUserProvider.allUsersPath.replace("TOKEN", token));
  }

  public getUser(token: string, userId: number): Observable<Response<User>> {
    return this.http.get<Response<User>>(AdministratorUserProvider.getUserPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public insertUser(token: string, user: User): Observable<Response<User>> {
    return this.http.post<Response<User>>(AdministratorUserProvider.insertUserPath.replace("TOKEN", token), user);
  }

  public updateUser(token: string, user: User): Observable<Response<User>> {
    return this.http.put<Response<User>>(AdministratorUserProvider.updateUserPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()), user);
  }

  public deleteUser(token: string, user: User): Observable<Response<User>> {
    return this.http.delete<Response<User>>(AdministratorUserProvider.deleteUserPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }
}
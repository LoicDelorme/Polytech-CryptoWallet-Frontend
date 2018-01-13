import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../entities/user';
import { UserForm } from '../../forms/userform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorUserProvider {

  private readonly allUsersPath: string = "cryptowallet/administrator/TOKEN/user";
  private readonly getUserPath: string = "cryptowallet/administrator/TOKEN/user/ID";
  private readonly insertUserPath: string = "cryptowallet/administrator/TOKEN/user";
  private readonly updateUserPath: string = "cryptowallet/administrator/TOKEN/user/ID";
  private readonly deleteUserPath: string = "cryptowallet/administrator/TOKEN/user/ID";

  constructor(private http: HttpClient) {}

  public allUsers(token: string): Observable<Response<Array<User>>> {
    return this.http.get<Response<Array<User>>>(this.allUsersPath.replace("TOKEN", token));
  }

  public getUser(token: string, userId: number): Observable<Response<User>> {
    return this.http.get<Response<User>>(this.getUserPath.replace("TOKEN", token).replace("ID", userId.toString()));
  }

  public insertUser(token: string, userForm: UserForm): Observable<Response<User>> {
    return this.http.post<Response<User>>(this.insertUserPath.replace("TOKEN", token), userForm);
  }

  public updateUser(token: string, userForm: UserForm): Observable<Response<User>> {
    return this.http.put<Response<User>>(this.updateUserPath.replace("TOKEN", token).replace("ID", userForm.id.toString()), userForm);
  }

  public deleteUser(token: string, user: User): Observable<Response<User>> {
    return this.http.delete<Response<User>>(this.deleteUserPath.replace("TOKEN", token).replace("ID", user.id.toString()));
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../entities/user';
import { UserForm } from '../../forms/userform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorUserProvider {

  private readonly allUsersPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/user";
  private readonly getUserPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/user/ID";
  private readonly insertUserPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/user";
  private readonly updateUserPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/user/ID";
  private readonly deleteUserPath: string = "http://51.15.205.40/api/cryptowallet/administrator/TOKEN/user/ID";

  constructor(private http: HttpClient) {}

  public allUsers(token: string): Observable<CryptoWalletResponse<Array<User>>> {
    return this.http.get<CryptoWalletResponse<Array<User>>>(this.allUsersPath.replace("TOKEN", token));
  }

  public getUser(token: string, userId: number): Observable<CryptoWalletResponse<User>> {
    return this.http.get<CryptoWalletResponse<User>>(this.getUserPath.replace("TOKEN", token).replace("ID", userId.toString()));
  }

  public insertUser(token: string, userForm: UserForm): Observable<CryptoWalletResponse<User>> {
    return this.http.post<CryptoWalletResponse<User>>(this.insertUserPath.replace("TOKEN", token), userForm);
  }

  public updateUser(token: string, userForm: UserForm): Observable<CryptoWalletResponse<User>> {
    return this.http.put<CryptoWalletResponse<User>>(this.updateUserPath.replace("TOKEN", token).replace("ID", userForm.id.toString()), userForm);
  }

  public deleteUser(token: string, user: User): Observable<CryptoWalletResponse<User>> {
    return this.http.delete<CryptoWalletResponse<User>>(this.deleteUserPath.replace("TOKEN", token).replace("ID", user.id.toString()));
  }
}
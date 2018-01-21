import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../entities/user';
import { Token } from '../../entities/token';
import { UserForm } from '../../forms/userform';
import { AuthenticationForm } from '../../forms/authenticationform';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class UnregisteredUserProvider {

  private readonly subscribePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/unregistered/user/subscribe";
  private readonly authenticatePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/unregistered/user/authenticate";

  constructor(private http: HttpClient) {}

  public subscribe(userForm: UserForm): Observable<CryptoWalletResponse<User>> {
    return this.http.post<CryptoWalletResponse<User>>(this.subscribePath, userForm);
  }

  public authenticate(authenticationForm: AuthenticationForm): Observable<CryptoWalletResponse<Token>> {
    return this.http.post<CryptoWalletResponse<Token>>(this.authenticatePath, authenticationForm);
  }
}
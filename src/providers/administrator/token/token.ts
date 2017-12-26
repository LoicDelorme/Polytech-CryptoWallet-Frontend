import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Token } from '../../../model/token';
import { Response } from '../../../model/response';

@Injectable()
export class AdministratorTokenProvider {

  public static readonly allTokensPath: string = "cryptowallet/administrator/TOKEN/token";
  public static readonly getTokenPath: string = "cryptowallet/administrator/TOKEN/token/TOKEN_ID";
  public static readonly deleteTokenPath: string = "cryptowallet/administrator/TOKEN/token/TOKEN_ID";

  constructor(private http: HttpClient) {
  }

  public allTokens(token: string, userId: number): Observable<Response<Array<Token>>> {
    return this.http.get<Response<Array<Token>>>(AdministratorTokenProvider.allTokensPath.replace("TOKEN", token));
  }

  public getToken(token: string, tokenId: number): Observable<Response<Token>> {
    return this.http.get<Response<Token>>(AdministratorTokenProvider.getTokenPath.replace("TOKEN", token).replace("TOKEN_ID", tokenId.toString()));
  }

  public deleteToken(token: string, token_: Token): Observable<Response<Token>> {
    return this.http.delete<Response<Token>>(AdministratorTokenProvider.deleteTokenPath.replace("TOKEN", token).replace("TOKEN_ID", token_.id.toString()));
  }
}
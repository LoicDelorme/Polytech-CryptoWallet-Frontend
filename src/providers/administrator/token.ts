import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Token } from '../../entities/token';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorTokenProvider {

  private readonly allTokensPath: string = "cryptowallet/administrator/TOKEN/token";
  private readonly getTokenPath: string = "cryptowallet/administrator/TOKEN/token/ID";
  private readonly deleteTokenPath: string = "cryptowallet/administrator/TOKEN/token/ID";

  constructor(private http: HttpClient) {}

  public allTokens(token: string, userId: number): Observable<Response<Array<Token>>> {
    return this.http.get<Response<Array<Token>>>(this.allTokensPath.replace("TOKEN", token));
  }

  public getToken(token: string, tokenId: number): Observable<Response<Token>> {
    return this.http.get<Response<Token>>(this.getTokenPath.replace("TOKEN", token).replace("ID", tokenId.toString()));
  }

  public deleteToken(token: string, token_: Token): Observable<Response<Token>> {
    return this.http.delete<Response<Token>>(this.deleteTokenPath.replace("TOKEN", token).replace("ID", token_.id.toString()));
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Token } from '../../model/token';
import { Response } from '../../model/response';

@Injectable()
export class TokenProvider {

  public static readonly allPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/tokens";
  public static readonly getPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/token/TOKEN_ID";
  public static readonly insertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/token";
  public static readonly updatePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/token/TOKEN_ID";
  public static readonly deletePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/token/TOKEN_ID";

  constructor(private http: HttpClient) {
  }

  public all(token: string, userId: number): Observable<Response<Array<Token>>> {
    return this.http.get<Response<Array<Token>>>(TokenProvider.allPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public get(token: string, userId: number, tokenId: number): Observable<Response<Token>> {
    return this.http.get<Response<Token>>(TokenProvider.getPath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("TOKEN_ID", tokenId.toString()));
  }

  public insert(token: string, userId: number, token_: Token): Observable<Response<Token>> {
    return this.http.post<Response<Token>>(TokenProvider.insertPath.replace("TOKEN", token).replace("USER_ID", userId.toString()), token_);
  }

  public update(token: string, userId: number, token_: Token): Observable<Response<Token>> {
    return this.http.put<Response<Token>>(TokenProvider.updatePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("TOKEN_ID", token_.id.toString()), token);
  }

  public delete(token: string, userId: number, token_: Token): Observable<Response<Token>> {
    return this.http.delete<Response<Token>>(TokenProvider.deletePath.replace("TOKEN", token).replace("USER_ID", userId.toString()).replace("TOKEN_ID", token_.id.toString()));
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Favorite } from '../../model/favorite';
import { Response } from '../../model/response';

@Injectable()
export class FavoriteProvider {

  public static readonly allPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/favorites";
  public static readonly insertPath: string = "cryptowallet/registered/TOKEN/user/USER_ID/favorite/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly deletePath: string = "cryptowallet/registered/TOKEN/user/USER_ID/favorite/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {
  }

  public all(token: string, userId: number): Observable<Response<Array<Favorite>>> {
    return this.http.get<Response<Array<Favorite>>>(FavoriteProvider.allPath.replace("TOKEN", token).replace("USER_ID", userId.toString()));
  }

  public insert(token: string, userId: number, cryptocurrencyId: number): Observable<Response<Favorite>> {
    return this.http.post<Response<Favorite>>(FavoriteProvider.insertPath.replace("TOKEN", token).replace("CRYPTOCURRENCY_ID", cryptocurrencyId.toString()), null);
  }

  public delete(token: string, userId: number, cryptocurrencyId: number): Observable<Response<Favorite>> {
    return this.http.delete<Response<Favorite>>(FavoriteProvider.insertPath.replace("TOKEN", token).replace("CRYPTOCURRENCY_ID", cryptocurrencyId.toString()));
  }
}
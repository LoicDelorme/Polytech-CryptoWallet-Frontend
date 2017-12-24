import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Favorite } from '../../../model/favorite';
import { User } from '../../../model/user';
import { Cryptocurrency } from '../../../model/cryptocurrency';
import { Response } from '../../../model/response';

@Injectable()
export class AdministratorFavoriteProvider {

  public static readonly allFavoritesPath: string = "cryptowallet/administrator/TOKEN/favorite";
  public static readonly getFavoritePath: string = "cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly getFavoritesByUserPath: string = "cryptowallet/administrator/TOKEN/favorite/user/USER_ID";
  public static readonly getFavoritesByCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/favorite/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly insertFavoritePath: string = "cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  public static readonly deleteFavoritePath: string = "cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {
  }

  public allFavorites(token: string): Observable<Response<Array<Favorite>>> {
    return this.http.get<Response<Array<Favorite>>>(AdministratorFavoriteProvider.allFavoritesPath.replace("TOKEN", token));
  }

  public getFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.get<Response<Favorite>>(AdministratorFavoriteProvider.getFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public getFavoritesByUser(token: string, user: User): Observable<Response<Array<Favorite>>> {
    return this.http.get<Response<Array<Favorite>>>(AdministratorFavoriteProvider.getFavoritesByUserPath.replace("TOKEN", token).replace("USER_ID", user.id.toString()));
  }

  public getFavoritesByCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<Response<Array<Favorite>>> {
    return this.http.get<Response<Array<Favorite>>>(AdministratorFavoriteProvider.getFavoritesByCryptocurrencyPath.replace("TOKEN", token).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public insertFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.post<Response<Favorite>>(AdministratorFavoriteProvider.insertFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), null);
  }

  public deleteFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.delete<Response<Favorite>>(AdministratorFavoriteProvider.deleteFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Favorite } from '../../entities/favorite';
import { FavoriteForm } from '../../forms/favoriteform';
import { User } from '../../entities/user';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorFavoriteProvider {

  private readonly allFavoritesPath: string = "cryptowallet/administrator/TOKEN/favorite";
  private readonly getFavoritePath: string = "cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly getFavoritesByUserPath: string = "cryptowallet/administrator/TOKEN/favorite/user/ID";
  private readonly getFavoritesByCryptocurrencyPath: string = "cryptowallet/administrator/TOKEN/favorite/cryptocurrency/ID";
  private readonly insertFavoritePath: string = "cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly updateFavoritePath: string = "cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly deleteFavoritePath: string = "cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {}

  public allFavorites(token: string): Observable<Response<Array<Favorite>>> {
    return this.http.get<Response<Array<Favorite>>>(this.allFavoritesPath.replace("TOKEN", token));
  }

  public getFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.get<Response<Favorite>>(this.getFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public getFavoritesByUser(token: string, user: User): Observable<Response<Array<Favorite>>> {
    return this.http.get<Response<Array<Favorite>>>(this.getFavoritesByUserPath.replace("TOKEN", token).replace("ID", user.id.toString()));
  }

  public getFavoritesByCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<Response<Array<Favorite>>> {
    return this.http.get<Response<Array<Favorite>>>(this.getFavoritesByCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrency.id.toString()));
  }

  public insertFavorite(token: string, user: User, cryptocurrency: Cryptocurrency, favoriteForm: FavoriteForm): Observable<Response<Favorite>> {
    return this.http.post<Response<Favorite>>(this.insertFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), favoriteForm);
  }

  public updateFavorite(token: string, user: User, cryptocurrency: Cryptocurrency, favoriteForm: FavoriteForm): Observable<Response<Favorite>> {
    return this.http.put<Response<Favorite>>(this.updateFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), favoriteForm);
  }

  public deleteFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<Response<Favorite>> {
    return this.http.delete<Response<Favorite>>(this.deleteFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }
}
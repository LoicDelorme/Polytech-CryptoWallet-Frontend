import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Favorite } from '../../entities/favorite';
import { FavoriteForm } from '../../forms/favoriteform';
import { User } from '../../entities/user';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class AdministratorFavoriteProvider {

  private readonly allFavoritesPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/favorite";
  private readonly getFavoritePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly getFavoritesByUserPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/favorite/user/ID";
  private readonly getFavoritesByCryptocurrencyPath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/favorite/cryptocurrency/ID";
  private readonly insertFavoritePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly updateFavoritePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";
  private readonly deleteFavoritePath: string = "https://cryptowallet.loic-delorme.fr/api/cryptowallet/administrator/TOKEN/favorite/user/USER_ID/cryptocurrency/CRYPTOCURRENCY_ID";

  constructor(private http: HttpClient) {}

  public allFavorites(token: string): Observable<CryptoWalletResponse<Array<Favorite>>> {
    return this.http.get<CryptoWalletResponse<Array<Favorite>>>(this.allFavoritesPath.replace("TOKEN", token));
  }

  public getFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Favorite>> {
    return this.http.get<CryptoWalletResponse<Favorite>>(this.getFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }

  public getFavoritesByUser(token: string, user: User): Observable<CryptoWalletResponse<Array<Favorite>>> {
    return this.http.get<CryptoWalletResponse<Array<Favorite>>>(this.getFavoritesByUserPath.replace("TOKEN", token).replace("ID", user.id.toString()));
  }

  public getFavoritesByCryptocurrency(token: string, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Array<Favorite>>> {
    return this.http.get<CryptoWalletResponse<Array<Favorite>>>(this.getFavoritesByCryptocurrencyPath.replace("TOKEN", token).replace("ID", cryptocurrency.id.toString()));
  }

  public insertFavorite(token: string, user: User, cryptocurrency: Cryptocurrency, favoriteForm: FavoriteForm): Observable<CryptoWalletResponse<Favorite>> {
    return this.http.post<CryptoWalletResponse<Favorite>>(this.insertFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), favoriteForm);
  }

  public updateFavorite(token: string, user: User, cryptocurrency: Cryptocurrency, favoriteForm: FavoriteForm): Observable<CryptoWalletResponse<Favorite>> {
    return this.http.put<CryptoWalletResponse<Favorite>>(this.updateFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()), favoriteForm);
  }

  public deleteFavorite(token: string, user: User, cryptocurrency: Cryptocurrency): Observable<CryptoWalletResponse<Favorite>> {
    return this.http.delete<CryptoWalletResponse<Favorite>>(this.deleteFavoritePath.replace("TOKEN", token).replace("USER_ID", user.id.toString()).replace("CRYPTOCURRENCY_ID", cryptocurrency.id.toString()));
  }
}
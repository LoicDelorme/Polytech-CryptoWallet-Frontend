import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Theme } from '../../entities/theme';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

@Injectable()
export class RegisteredThemeProvider {

  private readonly allThemesPath: string = "cryptowallet/registered/TOKEN/theme";
  private readonly getThemePath: string = "cryptowallet/registered/TOKEN/theme/ID";

  constructor(private http: HttpClient) {}

  public allThemes(token: string): Observable<CryptoWalletResponse<Array<Theme>>> {
    return this.http.get<CryptoWalletResponse<Array<Theme>>>(this.allThemesPath.replace("TOKEN", token));
  }

  public getTheme(token: string, themeId: number): Observable<CryptoWalletResponse<Theme>> {
    return this.http.get<CryptoWalletResponse<Theme>>(this.getThemePath.replace("TOKEN", token).replace("ID", themeId.toString()));
  }
}
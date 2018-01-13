import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Theme } from '../../entities/theme';
import { Response } from '../../responses/response';

@Injectable()
export class RegisteredThemeProvider {

  private readonly allThemesPath: string = "cryptowallet/registered/TOKEN/theme";
  private readonly getThemePath: string = "cryptowallet/registered/TOKEN/theme/ID";

  constructor(private http: HttpClient) {}

  public allThemes(token: string): Observable<Response<Array<Theme>>> {
    return this.http.get<Response<Array<Theme>>>(this.allThemesPath.replace("TOKEN", token));
  }

  public getTheme(token: string, themeId: number): Observable<Response<Theme>> {
    return this.http.get<Response<Theme>>(this.getThemePath.replace("TOKEN", token).replace("ID", themeId.toString()));
  }
}
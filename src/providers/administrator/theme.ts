import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Theme } from '../../entities/theme';
import { ThemeForm } from '../../forms/themeform';
import { Response } from '../../responses/response';

@Injectable()
export class AdministratorThemeProvider {

  private readonly allThemesPath: string = "cryptowallet/administrator/TOKEN/theme";
  private readonly getThemePath: string = "cryptowallet/administrator/TOKEN/theme/ID";
  private readonly insertThemePath: string = "cryptowallet/administrator/TOKEN/theme";
  private readonly updateThemePath: string = "cryptowallet/administrator/TOKEN/theme/ID";
  private readonly deleteThemePath: string = "cryptowallet/administrator/TOKEN/theme/ID";

  constructor(private http: HttpClient) {}

  public allThemes(token: string): Observable<Response<Array<Theme>>> {
    return this.http.get<Response<Array<Theme>>>(this.allThemesPath.replace("TOKEN", token));
  }

  public getTheme(token: string, themeId: number): Observable<Response<Theme>> {
    return this.http.get<Response<Theme>>(this.getThemePath.replace("TOKEN", token).replace("ID", themeId.toString()));
  }

  public insertTheme(token: string, themeForm: ThemeForm): Observable<Response<Theme>> {
    return this.http.post<Response<Theme>>(this.insertThemePath.replace("TOKEN", token), themeForm);
  }

  public updateTheme(token: string, themeForm: ThemeForm): Observable<Response<Theme>> {
    return this.http.put<Response<Theme>>(this.updateThemePath.replace("TOKEN", token).replace("ID", themeForm.id.toString()), themeForm);
  }

  public deleteTheme(token: string, theme: Theme): Observable<Response<Theme>> {
    return this.http.delete<Response<Theme>>(this.deleteThemePath.replace("TOKEN", token).replace("ID", theme.id.toString()));
  }
}
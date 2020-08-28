import { Injectable } from '@angular/core';
import { RecipeInfo } from '../models/recipe-info';
import { of, Observable } from 'rxjs';
import { RecipeAutocomplete } from '../models/recipe-autocomplete';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RecipeService {
  private readonly api: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getRecipeAutoComplete(
    query: string,
    records: number = 10
  ): Observable<RecipeAutocomplete[]> {
    return this.httpClient
      .get<RecipeAutocomplete[]>(
        `${this.api}recipes/autocomplete?query=${query}&number=${records}`
      )
      .pipe(catchError(() => of([])));
  }

  getRecipeInfo(recipeId: number): Observable<RecipeInfo> {
    return this.httpClient
      .get<RecipeInfo>(`${this.api}recipes/${recipeId}/information`)
      .pipe(catchError(() => of({} as RecipeInfo)));
  }
}
